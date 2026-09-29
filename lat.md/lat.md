# Skills repository

This repository publishes Agent Skills from [skills/](/skills) and documents them in [apps/docs/](/apps/docs).

## Published skills

Each installable skill is a directory containing `SKILL.md`; nested collections require the Skills CLI `--full-depth` option.

Standalone skills live directly under [skills/](/skills). Imported engineering workflows live under [skills/plan/](/skills/plan), while Plan Mode, Writing, and Marketkit use their own collection directories.

## Plan Mode collection

Plan Mode contains 35 standalone `plan-mode-*` skills for inquiry, decisions, artifacts, review, and follow-through.

Each skill has its own trigger and output contract; there is no required sequence or runtime package. [README.md](/README.md) and the [Plan Mode docs](/apps/docs/content/docs/plan-mode/index.mdx) enumerate the collection.

## Writing collection

Writing contains nine `writing-*` skills for fiction and nonfiction workflows.

The `writing` router selects among capture, outline, bible, draft, critique, revise, edit, and verify. Critique is read-only, revision changes meaning deliberately, editing holds meaning fixed, and verification flags unsupported claims.

## Marketkit collection

Marketkit contains seven skills that move from campaign planning to assets, scheduling, and publication checks.

`marketkit-to-campaign` approves channels, cadence, messages, voice, and asset scope before the asset skills run. Shared references define the asset inventory and working platform specifications.

## Workspace

The repository has two Bun workspace apps and no shared workspace packages.

[apps/docs](/apps/docs) is a Fumadocs site, and [apps/agent](/apps/agent) is a local Eve skill-drafting agent. Each app owns its framework-specific Turbo outputs; root scripts only orchestrate shared tasks.

## Local skill drafting agent

[apps/agent](/apps/agent) runs Eve locally with a just-bash sandbox and mounts [skills/](/skills) read-write at `/workspace/skills`.

Other repository paths are not mounted. Eve's built-in tools use the sandbox filesystem, and authored agent code avoids Node host filesystem APIs. Local trace and Agent Runs exporters are disabled.

The agent bundles Anthropic's `skill-creator` and five writing skills. Their Markdown instructions work in Eve; `skill-creator`'s Python evaluation scripts require a native process unavailable inside just-bash.

## Local development skills

Third-party development skills are installed under [.agents/skills/](/.agents/skills), linked into [.claude/skills/](/.claude/skills), and recorded in [skills-lock.json](/skills-lock.json).

These consumed development skills are separate from published content in [skills/](/skills). The lock includes Eve guidance for the local agent plus writing and code-quality references.

## Local code quality

The Bun workspace uses oxlint, oxfmt, and Konsistent for code quality.

The root `quality` script delegates lint, formatting, structural checks, and both app typechecks through Turbo. Oxlint rejects Node host filesystem imports, while [konsistent.json](/konsistent.json) enforces docs UI and route structures. `lat check` validates this index.
