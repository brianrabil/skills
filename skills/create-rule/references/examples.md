# Examples

Read this when drafting the actual AGENTS.md section or SKILL.md. Adapt the
content to the repo; do not copy these examples verbatim unless they match.

## Root AGENTS.md section (always-on)

Use when ignoring the rule would be wrong even for unrelated tasks.

````markdown
# Package manager

This repo uses bun for install, run, and test. Mixed lockfiles break CI and
confuse agents about which command is real.

- Use `bun install`, `bun run`, `bun test`
- Do not add `package-lock.json` or `yarn.lock`
- Do not suggest `npx` when `bunx` works

```bash
# bad
npm install
npm test

# good
bun install
bun test
```
````

````

## Nested AGENTS.md (path-scoped)

Use when the rule is only true inside one app or package.

`apps/web/AGENTS.md`:

```markdown
# Next.js app

This app's Next.js APIs differ from pretrained Next.js. Reading the installed
docs first avoids generating deprecated file conventions.

Before writing code here, read the relevant guide in
`node_modules/next/dist/docs/` (resolve `next` from this directory; in a
monorepo it may not be visible from the repo root). Heed deprecation notices.
````

Do not repeat root standing orders in this file.

## Skill (on-demand playbook)

Use when the guidance is a procedure the agent should load only for matching
tasks.

`.agents/skills/orpc-conventions/SKILL.md`:

````markdown
---
name: orpc-conventions
description: >
  Write oRPC v2 procedures with the os builder (.input/.output/.handler).
  Use when adding or editing API procedures, routers, or handlers, even for
  a one-procedure change, or when the user mentions oRPC, procedures, or
  the API layer.
---

# oRPC conventions

Define procedures with `os` from `@orpc/server`. Pretrained oRPC examples
are often v1 and will not compile.

- Validate with `.input` / `.output` and a Standard Schema library
- Put logic in `.handler`
- Do not restore v1 routing or `os` patterns from memory

```ts
import { os } from "@orpc/server";
import * as z from "zod";

export const findPlanet = os
  .input(z.object({ id: z.number() }))
  .handler(async ({ input }) => ({ id: input.id }));
```
````

```

The description names both the work and the phrases that should trigger it.
The body is the playbook, not a standing order for every chat.
```
