# skills

[![skills.sh](https://skills.sh/b/brianrabil/skills)](https://skills.sh/brianrabil/skills)

My personal collection of [Agent Skills](https://agentskills.io) — reusable
instructions that extend coding agents (Claude Code, Cursor, Codex, and
[70+ others](https://github.com/vercel-labs/skills#supported-agents)) with
domain expertise they don't have out of the box.

## Install

```bash
npx skills add brianrabil/skills
```

Install a single skill:

```bash
npx skills add brianrabil/skills --skill orpc
```

## Skills

| Skill | What it's for |
| --- | --- |
| [`orpc`](./skills/orpc) | Building, consuming, and debugging [oRPC](https://orpc.dev) APIs — procedures, routers, contracts, OpenAPI, framework adapters, and integrations. Mirrors the official docs verbatim. |

## Adding a skill

```bash
npx skills init <name>
```

See the [Agent Skills specification](https://agentskills.io/specification) and
[best practices](https://agentskills.io/skill-creation/best-practices) before
writing one.

## License

MIT
