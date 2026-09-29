# Placement and Cursor mapping

Read this when choosing a path, migrating `.cursor/rules`, or deciding
between a nested AGENTS.md and a skill.

## Why not `.cursor/rules`

Cursor `.mdc` files are loaded by Cursor. AGENTS.md is the open, cross-agent
format ([agents.md](https://agents.md/)) used by Codex, Cursor, Amp, Jules,
Goose, OpenCode, Zed, Copilot, and others. Skills (`SKILL.md`) are the
on-demand equivalent of Cursor's "apply intelligently" / agent-requested
rules: the name and description stay visible, the body loads when the task
matches.

Writing `.cursor/rules` hides the convention from every other agent in the
same repo.

## Path-scoped vs file-type

AGENTS.md has no glob frontmatter. Scope is the directory that contains the
file.

- `apps/web/**` → `apps/web/AGENTS.md`
- `packages/core/**/*.ts` → `packages/core/AGENTS.md`
- `**/*.tsx` across a monorepo → skill (description should mention TSX /
  React / components) unless the convention is truly always-on, in which
  case a short root AGENTS.md section is fine

fx and similar harnesses attach nested AGENTS.md when a tool targets a path
under that directory. That is the glob equivalent for directory-scoped work.

## Skill discovery roots

Project roots, from the workspace up (harness-dependent; fx checks all of
these):

```
skills/
.agents/skills/
.claude/skills/
.codex/skills/
.cursor/skills/
.opencode/skills/
.claw/skills/
```

User/global roots (only when the user asked for a global skill):

```
~/.fx/skills/
~/.agents/skills/
~/.claude/skills/
~/.codex/skills/
```

Prefer an existing project root. Default new project skills to
`.agents/skills/<name>/`.

## Global standing orders

Only when the user wants every repo on this machine:

| Agent       | File                                                          |
| ----------- | ------------------------------------------------------------- |
| fx          | `~/.fx/AGENTS.md`                                             |
| Codex       | `~/.codex/AGENTS.md`                                          |
| Claude Code | `~/.claude/CLAUDE.md` (Claude also reads project `AGENTS.md`) |

Default is project-local. Do not scatter the same rule into every agent home
directory unless asked.

## Generated AGENTS.md

Do not append to a file whose whole contents are generated.

Signals:

- A comment or README that says to regenerate with `lat gen agents.md` (or
  similar)
- `BEGIN:` / `END:` regions (for example Next.js `nextjs-agent-rules`)
- "written and re-added by" / "do not edit"

For marked regions, add new guidance outside the markers. If that would be
lost on regenerate, use a nested AGENTS.md or a skill instead.

## Migrating `.cursor/rules`

For each `.mdc`:

| Frontmatter                                               | Destination                                            |
| --------------------------------------------------------- | ------------------------------------------------------ |
| `alwaysApply: true`                                       | Root `AGENTS.md` section                               |
| `globs` pointing at one directory tree                    | Nested `AGENTS.md` in that tree                        |
| `globs` that are a scattered file type                    | Skill, or a short root section if always-on            |
| `description` without always-apply (intelligent / manual) | Skill; fold the description into the skill description |
| Duplicate of an existing AGENTS.md section                | Skip; do not copy                                      |

Drop Cursor-only frontmatter (`alwaysApply`, `globs`, `.mdc`). Keep the
useful body, tighten it, add a why-sentence and one concrete example if
missing.

Do not delete the old `.mdc` unless the user asked to remove Cursor files.

## CLAUDE.md and other siblings

If the repo already has `CLAUDE.md`, `GEMINI.md`, or `.cursorrules`, still
write AGENTS.md or a skill. Optionally add a one-line pointer from the
sibling ("Follow AGENTS.md") so agents that only read that file still find
the rule. Do not maintain two full copies of the same convention.
