#!/usr/bin/env python3
"""Build a documentation-index skill using agent-browser for downloads."""

from __future__ import annotations

import argparse
import hashlib
import json
import re
import shutil
import subprocess
import sys
import tempfile
from collections import defaultdict
from pathlib import Path, PurePosixPath
from urllib.parse import unquote, urljoin, urlparse, urlunparse
from xml.etree import ElementTree

URL_RE = re.compile(r"https?://[^\s<>()\[\]{}\"']+")
NAME_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")


def browser_read(url: str, *, raw: bool = False) -> str:
    cmd = ["agent-browser", "read", url, "--max-output", "1000000"]
    if raw:
        cmd.append("--raw")
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode:
        message = result.stderr.strip() or result.stdout.strip()
        raise RuntimeError(f"agent-browser read failed for {url}: {message}")
    return result.stdout


def clean_url(value: str) -> str:
    value = value.rstrip(".,;:!?'\"")
    parsed = urlparse(value)
    return urlunparse((parsed.scheme, parsed.netloc, parsed.path, "", parsed.query, ""))


def urls_from_llms(text: str, source_url: str) -> list[str]:
    source_host = urlparse(source_url).netloc
    urls: list[str] = []
    for match in URL_RE.findall(text):
        url = clean_url(match)
        parsed = urlparse(url)
        if parsed.netloc != source_host:
            continue
        if parsed.path.endswith(("/llms.txt", "/llms-full.txt", "/sitemap.xml")):
            continue
        if url not in urls:
            urls.append(url)
    return urls


def urls_from_sitemap(text: str, source_url: str) -> list[str]:
    source_host = urlparse(source_url).netloc
    try:
        root = ElementTree.fromstring(text)
    except ElementTree.ParseError as exc:
        raise RuntimeError(f"invalid sitemap XML at {source_url}: {exc}") from exc
    urls: list[str] = []
    for node in root.iter():
        if node.tag.rsplit("}", 1)[-1] != "loc" or not node.text:
            continue
        url = clean_url(node.text.strip())
        if urlparse(url).netloc == source_host and url not in urls:
            urls.append(url)
    return urls


def discover(source: str) -> tuple[str, str, list[str]]:
    parsed = urlparse(source)
    if not parsed.scheme or not parsed.netloc:
        raise RuntimeError("--source must be an absolute HTTP(S) URL")

    path = parsed.path.rstrip("/")
    if path.endswith("llms.txt"):
        text = browser_read(source, raw=True)
        urls = urls_from_llms(text, source)
        kind = "llms.txt"
    elif path.endswith("sitemap.xml"):
        text = browser_read(source, raw=True)
        urls = urls_from_sitemap(text, source)
        kind = "sitemap.xml"
    else:
        base = source.rstrip("/") + "/"
        llms_url = urljoin(base, "llms.txt")
        try:
            text = browser_read(llms_url, raw=True)
            urls = urls_from_llms(text, llms_url)
            if not urls:
                raise RuntimeError("llms.txt contained no same-origin page URLs")
            source, kind = llms_url, "llms.txt"
        except RuntimeError:
            sitemap_url = urljoin(base, "sitemap.xml")
            text = browser_read(sitemap_url, raw=True)
            urls = urls_from_sitemap(text, sitemap_url)
            source, kind = sitemap_url, "sitemap.xml"

    if not urls:
        raise RuntimeError(f"no same-origin documentation pages found in {source}")
    return source, kind, urls


def safe_part(part: str) -> str:
    part = unquote(part).strip()
    part = re.sub(r"[^A-Za-z0-9._-]+", "-", part).strip("-.")
    return part or "index"


def reference_path(url: str, used: set[str]) -> Path:
    parsed = urlparse(url)
    parts = [safe_part(p) for p in PurePosixPath(parsed.path).parts if p != "/"]
    if not parts:
        parts = ["index"]
    filename = parts[-1]
    if not filename.endswith(".md"):
        filename += ".md"
    parts[-1] = filename
    rel = Path(*parts)
    key = rel.as_posix()
    if key in used:
        digest = hashlib.sha256(url.encode()).hexdigest()[:8]
        rel = rel.with_name(f"{rel.stem}-{digest}{rel.suffix}")
        key = rel.as_posix()
    used.add(key)
    return rel


def page_title(content: str, rel: Path) -> str:
    match = re.search(r'^title:\s*["\']?(.+?)["\']?\s*$', content, re.MULTILINE)
    if match:
        return match.group(1).strip()
    match = re.search(r"^#\s+(.+?)\s*$", content, re.MULTILINE)
    if match:
        return match.group(1).strip()
    return rel.stem.replace("-", " ").replace("_", " ").title()


def group_name(rel: Path) -> str:
    parent = rel.parent.as_posix()
    if parent == ".":
        return "Pages"
    return parent.replace("/", " / ").replace("-", " ").replace("_", " ").title()


def skill_markdown(name: str, description: str, pages: list[dict[str, str]]) -> str:
    groups: dict[str, list[dict[str, str]]] = defaultdict(list)
    for page in pages:
        groups[group_name(Path(page["file"]).relative_to("references"))].append(page)

    lines = [
        "---",
        f"name: {name}",
        f"description: {description}",
        "---",
        "",
        f"# {name} documentation index",
        "",
        "Select the references relevant to the request, read them, and follow the documented behavior.",
    ]
    for group in sorted(groups):
        lines.extend(["", f"## {group}", ""])
        for page in sorted(groups[group], key=lambda item: item["title"].lower()):
            lines.append(f'- [{page["title"]}]({page["file"]})')
    lines.extend([
        "",
        "## Source index",
        "",
        "- [Discovery source](references/source-index.txt)",
        "- [Download manifest](references/manifest.json)",
        "",
    ])
    return "\n".join(lines)


def load_old_generated(target: Path) -> list[str]:
    manifest = target / "references" / "manifest.json"
    if not manifest.is_file():
        return []
    try:
        data = json.loads(manifest.read_text())
    except (OSError, json.JSONDecodeError):
        return []
    return [p for p in data.get("generated_files", []) if isinstance(p, str)]


def remove_old_generated(target: Path, files: list[str]) -> None:
    target_resolved = target.resolve()
    for rel in files:
        path = (target / rel).resolve()
        if path == target_resolved or target_resolved not in path.parents:
            continue
        if path.is_file() or path.is_symlink():
            path.unlink()
    refs = target / "references"
    if refs.exists():
        for directory in sorted((p for p in refs.rglob("*") if p.is_dir()), reverse=True):
            try:
                directory.rmdir()
            except OSError:
                pass


def validate(target: Path) -> tuple[int, list[str]]:
    skill = target / "SKILL.md"
    manifest_path = target / "references" / "manifest.json"
    errors: list[str] = []
    if not skill.is_file():
        errors.append("missing SKILL.md")
        return 0, errors
    if not manifest_path.is_file():
        errors.append("missing references/manifest.json")
        return 0, errors
    try:
        manifest = json.loads(manifest_path.read_text())
    except json.JSONDecodeError as exc:
        errors.append(f"invalid manifest JSON: {exc}")
        return 0, errors
    pages = manifest.get("pages", [])
    for page in pages:
        rel = page.get("file", "")
        if not rel or not (target / rel).is_file():
            errors.append(f"missing reference: {rel}")
    text = skill.read_text()
    for rel in re.findall(r"\]\((references/[^)]+)\)", text):
        if not (target / rel).is_file():
            errors.append(f"broken SKILL.md link: {rel}")
    return len(pages), errors


def build(args: argparse.Namespace) -> None:
    target = Path(args.target).expanduser().resolve()
    if args.check:
        count, errors = validate(target)
        if errors:
            raise RuntimeError("; ".join(errors))
        print(f"PASS: {count} references validated in {target}")
        return

    source, kind, urls = discover(args.source)
    target.parent.mkdir(parents=True, exist_ok=True)
    old_generated = load_old_generated(target)

    with tempfile.TemporaryDirectory(prefix=f".{args.name}-docs-", dir=target.parent) as temp_name:
        temp = Path(temp_name)
        refs = temp / "references"
        refs.mkdir(parents=True)
        used: set[str] = set()
        pages: list[dict[str, str]] = []
        for index, url in enumerate(urls, 1):
            rel = reference_path(url, used)
            output = refs / rel
            output.parent.mkdir(parents=True, exist_ok=True)
            print(f"[{index}/{len(urls)}] {url}", flush=True)
            content = browser_read(url)
            output.write_text(content)
            pages.append({"title": page_title(content, rel), "url": url, "file": f"references/{rel.as_posix()}"})

        source_index = refs / "source-index.txt"
        source_index.write_text(source + "\n")
        generated = [p["file"] for p in pages] + ["references/source-index.txt", "references/manifest.json", "SKILL.md"]
        manifest = {
            "name": args.name,
            "discovery_source": source,
            "discovery_type": kind,
            "page_count": len(pages),
            "pages": pages,
            "generated_files": generated,
        }
        (refs / "manifest.json").write_text(json.dumps(manifest, indent=2) + "\n")
        (temp / "SKILL.md").write_text(skill_markdown(args.name, args.description, pages))

        target.mkdir(parents=True, exist_ok=True)
        remove_old_generated(target, old_generated)
        for path in temp.rglob("*"):
            if not path.is_file():
                continue
            destination = target / path.relative_to(temp)
            destination.parent.mkdir(parents=True, exist_ok=True)
            shutil.copy2(path, destination)

    count, errors = validate(target)
    if errors:
        raise RuntimeError("; ".join(errors))
    print(f"Built {target} from {kind} at {source}: {count} pages")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", required=True, help="Site root, llms.txt, or sitemap.xml URL")
    parser.add_argument("--name", required=True, help="Generated skill name")
    parser.add_argument("--description", required=True, help="Generated skill frontmatter description")
    parser.add_argument("--target", required=True, help="Generated skill directory")
    parser.add_argument("--check", action="store_true", help="Validate an existing generated skill")
    args = parser.parse_args()
    if not NAME_RE.fullmatch(args.name):
        parser.error("--name must use lowercase letters, numbers, and single hyphens")
    return args


if __name__ == "__main__":
    try:
        build(parse_args())
    except (OSError, RuntimeError) as exc:
        print(f"error: {exc}", file=sys.stderr)
        raise SystemExit(1)
