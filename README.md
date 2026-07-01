<div align="center">

# skills

_A personal collection of [Agent Skills](https://agentskills.io) for Claude Code, Cursor, Codex, and 70+ other coding agents_

[![skills.sh](https://skills.sh/b/brianrabil/skills)](https://skills.sh/brianrabil/skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

[Install](#install) • [Skills](#skills) • [Docs site](#docs-site) • [Repository structure](#repository-structure) • [Development](#development)

</div>

Agent Skills are reusable instructions that extend coding agents with domain
expertise they don't have out of the box — an on-demand knowledge pack an
agent loads only when a task actually needs it, instead of bloating every
conversation's context.

## Install

Install every skill from this repo into your project:

```bash
npx skills add brianrabil/skills
```

Install a single skill:

```bash
npx skills add brianrabil/skills --skill orpc
```

## Skills

| Skill                   | What it's for                                                                                                                                                                         |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [`orpc`](./skills/orpc) | Building, consuming, and debugging [oRPC](https://orpc.dev) APIs — procedures, routers, contracts, OpenAPI, framework adapters, and integrations. Mirrors the official docs verbatim. |

Full, browsable docs for each skill live on the [docs site](#docs-site).

### Adding a skill

```bash
npx skills init <name>
```

See the [Agent Skills specification](https://agentskills.io/specification) and
[best practices](https://agentskills.io/skill-creation/best-practices) before
writing one.

> [!NOTE]
> New skills added under `skills/` must also be added to the table above.

## Docs site

The skills in this repo are documented at [`apps/docs`](./apps/docs), a
[Fumadocs](https://fumadocs.dev) site built on Next.js. Run it locally:

```bash
pnpm install
pnpm --filter docs dev
```

Doc pages are hand-authored under `apps/docs/content/docs/` — they aren't
generated from `SKILL.md`, so a meaningfully changed skill needs its doc page
updated too.

## Repository structure

This repo is a [pnpm workspace](https://pnpm.io/workspaces) orchestrated with
[Turborepo](https://turborepo.dev):

| Path          | What it is                                                                                                      |
| ------------- | --------------------------------------------------------------------------------------------------------------- |
| `skills/`     | The published skills — the actual point of this repo.                                                           |
| `apps/docs`   | The Fumadocs site documenting the skills above.                                                                 |
| `packages/ui` | Shared shadcn/ui component library (`@workspace/ui`), consumed by `apps/docs`.                                  |
| `apps/agent`  | An [eve](https://eve.dev) agent that will maintain `skills/` and the docs site — scaffolded, not yet built out. |

## Development

```bash
pnpm install                       # install workspace dependencies
pnpm --filter docs dev             # start the docs site on :3000
pnpm build                         # build apps/docs and apps/agent
pnpm exec turbo run quality        # lint + format check (oxlint + oxfmt)
pnpm exec turbo run quality:fix    # lint --fix, then format
pnpm changeset                     # record a change for the next version bump
pnpm skills:sync                   # restore local dev-tool skills from skills-lock.json
```

> [!WARNING]
> This repo's own `package.json` `"name"` must never be `skills` — if it
> matched, running `npx skills ...` from inside this repo would resolve to
> the local project instead of the registry CLI.

Versioning is driven by [changesets](https://github.com/changesets/changesets)
and the [autoship](https://github.com/vercel-labs/autoship) CLI; merging to
`main` only versions and tags the repo — nothing is published to npm.
