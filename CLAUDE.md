# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A personal collection of [Agent Skills](https://agentskills.io) — published via [skills.sh](https://skills.sh/brianrabil/skills) and installed into other projects with the `skills` CLI (`vercel-labs/skills`). The skill content itself has no build system and no test suite — `skills/` *is* its content. The repo root is a **pnpm workspace** (`pnpm-workspace.yaml`, package manager pinned via `packageManager` in `package.json`) orchestrated with **Turborepo** (`turbo.json`), currently containing one app: `apps/docs`, a Fumadocs site that documents the published skills. The root `package.json` itself is `"private": true` and publishes nothing to npm — it only exists to drive changesets-based versioning (see below) and to run Turborepo tasks across the workspace.

## Commands

```bash
# Install every skill from this repo into a target project
npx skills add brianrabil/skills

# Install a single skill
npx skills add brianrabil/skills --skill <name>

# Scaffold a new skill directory (creates <name>/SKILL.md)
npx skills init <name>

# Record a change for the next version bump / changelog entry
pnpm changeset

# Workspace-wide, via Turborepo (currently only touches apps/docs)
pnpm install     # after cloning, or after editing any package.json
pnpm dev         # apps/docs dev server on :3000
pnpm build       # production build of apps/docs
pnpm lint        # eslint for apps/docs

# Or scope to just the docs app directly
pnpm --filter docs dev
```

Gotcha: this repo's own `package.json` `"name"` must never be `skills` (currently `brianrabil-skills`) — if it matched, running `npx skills ...` from inside this repo would resolve to the local project instead of the registry CLI and fail with "could not determine executable to run".

## Architecture

**`skills/<name>/` is the published source of truth** — each subdirectory is one Agent Skill, keyed off `SKILL.md`:

```yaml
---
name: orpc
description: <what it's for + when the model should trigger it>
license: MIT
metadata:            # optional, skill-specific
  source: <upstream doc URL>
---
```

- `description` does double duty: it's what a coding agent reads to decide whether to invoke the skill, so it must state both *what* the skill covers and *when* to reach for it.
- A skill can be **model-invoked** (default — keep `description`, omit `disable-model-invocation`) or **user-invoked only** (`disable-model-invocation: true` — description becomes human-facing, no autonomous trigger).
- Skills may carry supporting directories: `references/` (long-form docs the skill points to), `assets/`, etc. `skills/orpc` is the fullest example — its `references/` mirrors https://orpc.dev/llms-full.txt verbatim, split one file per doc page; treat it as a snapshot and never hand-edit it.
- New skills added under `skills/` must also be added to the table in [README.md](README.md).

**`.agents/skills/` and `.claude/skills/`** are *local, machine-specific installs* of third-party skills pulled in via `npx skills add <source> --skill <name> --agent claude-code universal` for use while developing in this repo — they are consumed dependencies, not published content, and are unrelated to the `skills/` directory above. `.agents/skills/<name>` holds the canonical copy; `.claude/skills/<name>` is a symlink into it. `skills-lock.json` records what's installed. As of this writing these directories are untracked (not yet in `.gitignore`) — check `git status` before assuming either way.

**`apps/docs/` is a Fumadocs (Next.js) site** that documents the skills published under `skills/`. It was scaffolded with `create-fumadocs-app` and is a standard Fumadocs App Router project — content lives in `apps/docs/content/docs/*.mdx`, site chrome/branding in `apps/docs/lib/shared.ts` and `lib/layout.shared.tsx`. Doc pages are **hand-authored**, not generated from `SKILL.md` — when a skill under `skills/` changes meaningfully, its corresponding `apps/docs/content/docs/<name>.mdx` needs a manual update too; the two aren't kept in sync automatically.

## Versioning / releases

Changelog and version bumps for this repo are managed with [changesets](https://github.com/changesets/changesets), driven by the [autoship](https://github.com/vercel-labs/autoship) CLI (installed as a local skill under `.agents/skills/autoship`):

- Every change worth a changelog entry gets a changeset file via `pnpm changeset` before merging to `main`.
- `.github/workflows/release.yml` runs `changesets/action@v1` on push to `main`, which opens/updates a "Version Packages" PR that applies the pending changesets and bumps `package.json`'s version.
- There is deliberately **no publish step** — `package.json` is `"private": true`, so merging the Version Packages PR only versions and tags the repo; nothing is pushed to the npm registry.
- `autoship skills -t <patch|minor|major> [-y]` drives this end-to-end (changeset → PR → merge → version PR → merge) from the CLI; it's already registered in `~/.autoship/config.json` under the name `skills`.

## Reference

- [Agent Skills specification](https://agentskills.io/specification)
- [Skill authoring best practices](https://agentskills.io/skill-creation/best-practices)
