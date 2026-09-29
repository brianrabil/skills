# Local skill drafting agent

This Eve agent creates and revises skills in this repository. It can edit only
the published `skills/` tree; it cannot change the docs site, run Git, publish a
release, or create a commit.

## Start

Use Node.js 24 from the repository root:

```bash
bun install
bun run agent:dev
```

The agent defaults to `zai/glm-5.3-flash` through AI Gateway. Use Eve's model
selector to choose another configured model.

## Sandbox

The agent runs in a just-bash sandbox. `skills/` is mounted read-write at
`/workspace/skills`; the rest of the repository is not mounted. Eve's built-in
shell and file tools operate through that sandbox rather than the host
filesystem.

Check the app with:

```bash
bun run --filter agent typecheck
bun run --filter agent build
```

## Bundled skills

The agent bundles `skill-creator`, `writing-for-agents`, `writing-fragments`,
`writing-shape`, `writing-beats`, and `writing-great-skills`. Their Markdown
instructions are available to Eve. The Python evaluation scripts bundled with
`skill-creator` cannot run inside just-bash.
