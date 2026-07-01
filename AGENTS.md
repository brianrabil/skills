# AGENTS.md

Guidance for AI coding agents (OpenCode, Codex, Claude Code) working in this
repository. This is the single source of truth — [CLAUDE.md](CLAUDE.md) just
`@AGENTS.md`-imports it (Claude Code has no native AGENTS.md support, so this
import is Anthropic's documented way to avoid maintaining two copies by
hand). Add Claude-specific-only guidance directly to CLAUDE.md below the
import if it's ever needed; everything else belongs here.

## What this repo is

A personal collection of [Agent Skills](https://agentskills.io) — published via [skills.sh](https://skills.sh/brianrabil/skills) and installed into other projects with the `skills` CLI (`vercel-labs/skills`). The skill content itself has no build system and no test suite — `skills/` _is_ its content. The repo root is a **pnpm workspace** (`pnpm-workspace.yaml`, package manager pinned via `packageManager` in `package.json`) orchestrated with **Turborepo** (`turbo.json`): `apps/docs` (a Fumadocs site documenting the published skills), `packages/ui` (its shadcn/ui component library), and `apps/agent` (an eve agent, scaffolded but not yet built out). The root `package.json` itself is `"private": true` and publishes nothing to npm — it only exists to drive changesets-based versioning (see below) and to run Turborepo tasks across the workspace.

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

# Workspace-wide, via Turborepo
pnpm install     # after cloning, or after editing any package.json
pnpm dev         # apps/docs dev server on :3000
pnpm build       # production build of apps/docs and apps/agent

# Or scope to just the docs app directly
pnpm --filter docs dev

# Start the eve agent's interactive TUI dev mode -- see apps/agent below for
# why this isn't a Turborepo task
pnpm agent:dev

# Lint/format the whole repo (oxlint + oxfmt, registered as Turborepo Root Tasks)
pnpm exec turbo run quality      # lint + format check, in parallel
pnpm exec turbo run quality:fix  # lint --fix, then format (fix runs after lint:fix to avoid write races)

# Typecheck the docs app (fumadocs-mdx codegen -> next typegen -> tsc --noEmit)
pnpm --filter docs types:check

# Restore the local dev-tool skills (.agents/skills, .claude/skills) from skills-lock.json
pnpm skills:sync
```

Gotcha: this repo's own `package.json` `"name"` must never be `skills` (currently `brianrabil-skills`) — if it matched, running `npx skills ...` from inside this repo would resolve to the local project instead of the registry CLI and fail with "could not determine executable to run".

## Architecture

**`skills/<name>/` is the published source of truth** — each subdirectory is one Agent Skill, keyed off `SKILL.md`:

```yaml
---
name: orpc
description: <what it's for + when the model should trigger it>
license: MIT
metadata: # optional, skill-specific
  source: <upstream doc URL>
---
```

- `description` does double duty: it's what a coding agent reads to decide whether to invoke the skill, so it must state both _what_ the skill covers and _when_ to reach for it.
- A skill can be **model-invoked** (default — keep `description`, omit `disable-model-invocation`) or **user-invoked only** (`disable-model-invocation: true` — description becomes human-facing, no autonomous trigger).
- Skills may carry supporting directories: `references/` (long-form docs the skill points to), `assets/`, etc. `skills/orpc` is the fullest example — its `references/` mirrors https://orpc.dev/llms-full.txt verbatim, split one file per doc page; treat it as a snapshot and never hand-edit it.
- New skills added under `skills/` must also be added to the table in [README.md](README.md).

**`.agents/skills/` and `.claude/skills/`** are _local, machine-specific installs_ of third-party skills pulled in via `npx skills add <source> --skill <name> --agent <agent> universal` for use while developing in this repo — they are consumed dependencies, not published content, and are unrelated to the `skills/` directory above. `.agents/skills/<name>` holds the canonical copy; the agent-specific dir (e.g. `.claude/skills/<name>`) symlinks into it. Both are gitignored (see `.gitignore`); `skills-lock.json` is tracked and records what's installed, so a fresh clone restores them with `pnpm skills:sync` (registered as the `//#skills:sync` Turborepo Root Task; wraps `skills experimental_install`, not `experimental_sync` — that's a different, unrelated command that reads from `node_modules` instead of the lockfile).

**`apps/docs/` is a Fumadocs (Next.js) site** that documents the skills published under `skills/`. It was scaffolded with `create-fumadocs-app` and is a standard Fumadocs App Router project — content lives in `apps/docs/content/docs/*.mdx`, site chrome/branding in `apps/docs/lib/shared.ts` and `lib/layout.shared.tsx`, config in `next.config.ts`. Doc pages are **hand-authored**, not generated from `SKILL.md` — when a skill under `skills/` changes meaningfully, its corresponding `apps/docs/content/docs/<name>.mdx` needs a manual update too; the two aren't kept in sync automatically. The app also serves LLM feed routes (`app/llms.txt`, `app/llms.mdx`, `app/llms-full.txt`) and per-page markdown (`.md`) via a middleware rewrite in `proxy.ts`; route constants live in `lib/shared.ts`. `fumadocs-mdx` runs as a `postinstall` hook and regenerates `.source/` (gitignored) — if you add/change MDX frontmatter and the source map is stale, run `pnpm --filter docs types:check` to force codegen. `apps/docs/cli.json` configures [`@fumadocs/cli`](https://fumadocs.dev/docs/cli) for pulling in Fumadocs-native UI components/layouts (`npx @fumadocs/cli add <component>`, run from `apps/docs`) — these are separate from and unrelated to our own shadcn setup in `packages/ui`: Fumadocs components use their own `--fd-*`-prefixed theme tokens and land under `apps/docs/components/` (with their own local `apps/docs/components/ui/` primitives and `apps/docs/lib/cn.ts`), not `@workspace/ui`. The `add`/`customize` subcommands prompt interactively (file-overwrite confirms, "install with pnpm?") using raw-keypress `@clack/prompts` input that doesn't respond to piped stdin — resolve conflicts by deleting the conflicting file first so there's nothing to prompt about, then install any new dependencies it reports with a plain `pnpm add` yourself rather than letting it run its own install step.

Site typography is the official [`geist`](https://www.npmjs.com/package/geist) package (`GeistSans`/`GeistMono` from `geist/font/sans` / `geist/font/mono`), applied in `apps/docs/app/layout.tsx` — not `next/font/google`'s bundled `Geist`, which is a different (and lower-fidelity) source of the same typeface. Unlike `next/font/google`'s `Geist({ variable: "--font-sans" })` pattern, the official package's exports are pre-instantiated and always emit `--font-geist-sans`/`--font-geist-mono` as their `.variable` CSS custom property names — you can't rename them at the call site. `packages/ui`'s shared theme (`packages/ui/src/styles/globals.css`) expects an ambient `--font-sans`/`--font-mono` custom property (its own `@theme inline` block just self-references `--font-sans: var(--font-sans)`), so `apps/docs/app/global.css` adds a second `@theme inline` block redirecting `--font-sans`/`--font-mono` to the geist-named variables — that redirect is required, not optional; without it `font-sans`/`font-mono` utilities and any `@apply font-sans` in `packages/ui` silently fall back to Tailwind's default stack.

For brand/logo icons (GitHub, etc. — anything `lucide-react` doesn't carry), use [`@thesvg/react`](https://thesvg.org) (the `thesvg` local skill documents the full icon catalog and CDN URL scheme). Import per-icon for tree-shaking: `import Github from "@thesvg/react/github"`. Only the `default`/`light`/`dark` variants ship a hardcoded brand-color `fill` on the path itself — the `mono` variant's `<path>` has no `fill` of its own and the wrapping `<svg>` defaults to `fill="none"`, so `<Github variant="mono" />` alone renders **invisible**; you must pass `fill="currentColor"` explicitly (confirmed by rendering it in the browser preview, not just reading the source) to get a theme-adaptive monochrome mark.

**`packages/ui` (`@workspace/ui`)** is the workspace's internal [shadcn/ui](https://ui.shadcn.com) component package, consumed by `apps/docs` as `workspace:*`. shadcn components belong **here, not in the app** — both `packages/ui/components.json` and `apps/docs/components.json` steer shadcn `add`/aliases at `@workspace/ui/components`, and the docs app imports them via that path (the `shadcn` local skill documents this layout). It is `private` and never published; bumping its version is unnecessary. Third-party shadcn registries work the same way — `apps/docs/components.json` has an `@ai-elements` registry entry (from ai-sdk.dev) for `npx shadcn add @ai-elements/<name>`. Registry items typed `registry:ui` route through the alias into `packages/ui` correctly, but `registry:component` items (like `snippet`) ship a hardcoded `target` path that lands in `apps/docs/components/` regardless of alias config — move those into `packages/ui/src/components/` by hand afterward if they belong in the shared package (its rewritten imports already use `@workspace/ui/...`, so no import changes are needed). Also: unlike `@fumadocs/cli`, `shadcn add`'s "overwrite existing file?" confirm is a plain stdin-buffered prompt, not raw-keypress — `printf "n\n" | npx shadcn add ...` works fine to decline it non-interactively.

**`apps/agent`** is an [eve](https://eve.dev) agent, scaffolded but not yet built out — `agent/instructions.md` is still the placeholder, and it only has the built-in HTTP channel (`agent/channels/eve.ts`). Its eventual job is maintaining `skills/` and `apps/docs`; that work (real instructions, tools, connections, and — per plan — a GitHub channel with sandbox checkout) is deliberately deferred. `pnpm build` here outputs to `.output/` (Nitro), not `.next/` — `turbo.json`'s `build` task outputs list covers both. Its interactive TUI dev mode (`eve dev`) is named `agent:dev`, **not** `dev` — a plain `dev` script would get swept into `turbo.json`'s shared `dev` task, and turbo flatly refuses to run a stdin-driven task without `--ui=tui`/`interactive: true` set, which is unnecessary ceremony for a task nothing else depends on. Start it with the root `pnpm agent:dev` (plain pnpm, `--filter agent agent:dev`, no turbo involved) instead. `agent/sandbox.ts` installs [agent-browser](https://github.com/vercel-labs/agent-browser) (`@agent-browser/sandbox`) into the agent's sandbox at template-build time via `installAgentBrowser`, based on that repo's own `examples/sandbox/eve` — but using `defaultBackend()` instead of the example's hardcoded `vercel()`, since `installAgentBrowser` only runs generic shell commands and pinning `vercel()` would force hosted sandboxes even in local dev. No tools call it yet. See the `eve` local skill and its bundled docs (`apps/agent/node_modules/eve/docs/`) before extending this agent.

**Lint/format are [oxlint](https://oxc.rs)/[oxfmt](https://oxc.rs), run repo-wide from the root** — not per-package. `apps/docs` has no lint step of its own (eslint was removed). Because oxlint/oxfmt operate on the whole tree at once, `turbo.json` registers them as [Turborepo Root Tasks](https://turborepo.dev/docs/guides/tools/oxc) (`//#lint`, `//#fmt`, etc.) rather than per-package `^lint`-style tasks. `quality`/`quality:fix` exist **only** as `turbo.json` task names (no matching `package.json` script) — giving them a script that calls `turbo run quality` would create a recursive-invocation loop, which is exactly what Turborepo's own error message warns about if you try it.

`pnpm doctor` runs [react-doctor](https://github.com/millionco/react-doctor) (`npx react-doctor@latest` under the hood) — a React code-quality scanner tuned for catching mistakes AI agents tend to make. Only the `react-doctor` skill (from `millionco/react-doctor`'s own skills repo, which also ships several skills for react-doctor's _own_ development — those weren't installed) plus the `react-doctor` devDependency and the `doctor` script were added by hand; the tool's own `install` subcommand was deliberately **not** run because it fans out to ~40 agent-config directories and can wire a git pre-commit hook, neither of which fit this repo's existing single-agent (`.claude`), no-hooks convention. `ci install` (the GitHub Actions PR-review integration, free for public repos) was not set up either — ask before adding it.

## Versioning / releases

Changelog and version bumps for this repo are managed with [changesets](https://github.com/changesets/changesets):

- Every change worth a changelog entry gets a changeset file via `pnpm changeset` before merging to `main`.
- `.github/workflows/release.yml` runs `changesets/action@v1` on push to `main`, which opens/updates a "Version Packages" PR that applies the pending changesets and bumps `package.json`'s version.
- There is deliberately **no publish step** — `package.json` is `"private": true`, so merging the Version Packages PR only versions and tags the repo; nothing is pushed to the npm registry.
- Merge the changeset PR, then merge the resulting "Version Packages" PR when ready to cut a release — both by hand via `gh pr merge` or the GitHub UI, no extra tooling needed for a repo this size.

## Reference

- [Agent Skills specification](https://agentskills.io/specification)
- [Skill authoring best practices](https://agentskills.io/skill-creation/best-practices)
