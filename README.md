<div align="center">

# Agent Skills

A practical collection of reusable workflows for coding, planning, writing, and marketing.

[![skills.sh](https://skills.sh/b/brianrabil/skills)](https://skills.sh/brianrabil/skills)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

## Install

Install skills from this repo into your project:

```bash
npx skills add brianrabil/skills
```

Install a single skill:

```bash
npx skills add brianrabil/skills --skill docs-to-skill
```

## Plan Mode

Thirty-five focused skills for thinking through work, producing plans, and
following them through. Each skill stands alone; invoking one does not require
running the others. Install a single skill by its exact name:

```bash
npx skills add brianrabil/skills --full-depth --skill plan-mode-research
```

| Skill                                                         | What it does                                                |
| ------------------------------------------------------------- | ----------------------------------------------------------- |
| [`plan-mode-archaeology`](./skills/plan-mode/archaeology)     | Find what changed, when, and why                            |
| [`plan-mode-audit`](./skills/plan-mode/audit)                 | Judge an artifact against a named standard                  |
| [`plan-mode-bounds`](./skills/plan-mode/bounds)               | Surface hard resource limits before planning                |
| [`plan-mode-brainstorm`](./skills/plan-mode/brainstorm)       | Generate distinct possibilities before selection            |
| [`plan-mode-brief`](./skills/plan-mode/brief)                 | Compress research into a decision-ready page                |
| [`plan-mode-calibrate`](./skills/plan-mode/calibrate)         | State how much you actually know before acting              |
| [`plan-mode-clarify`](./skills/plan-mode/clarify)             | Resolve consequential ambiguity                             |
| [`plan-mode-counsel`](./skills/plan-mode/counsel)             | Help weigh a consequential choice without deciding silently |
| [`plan-mode-debate`](./skills/plan-mode/debate)               | Test competing positions against shared criteria            |
| [`plan-mode-decide`](./skills/plan-mode/decide)               | Close open options and record the commitment                |
| [`plan-mode-deep-research`](./skills/plan-mode/deep-research) | Investigate a complex question across competing evidence    |
| [`plan-mode-docs`](./skills/plan-mode/docs)                   | Document plan-mode work as markdown in `docs/plans/`        |
| [`plan-mode-estimate`](./skills/plan-mode/estimate)           | Size the work and name the unknowns                         |
| [`plan-mode-explore`](./skills/plan-mode/explore)             | Map viable approaches and tradeoffs                         |
| [`plan-mode-handoff`](./skills/plan-mode/handoff)             | Compress session state into a resumable artifact            |
| [`plan-mode-park`](./skills/plan-mode/park)                   | Capture rejected and deferred work so it is not lost        |
| [`plan-mode-plan`](./skills/plan-mode/plan)                   | Set out an actionable sequence and acceptance checks        |
| [`plan-mode-premortem`](./skills/plan-mode/premortem)         | Assume failure and work backward to causes                  |
| [`plan-mode-prioritize`](./skills/plan-mode/prioritize)       | Order work under real capacity                              |
| [`plan-mode-read-docs`](./skills/plan-mode/read-docs)         | Extract the relevant contract from current documentation    |
| [`plan-mode-reframe`](./skills/plan-mode/reframe)             | Challenge a stuck problem framing                           |
| [`plan-mode-research`](./skills/plan-mode/research)           | Answer a bounded question with sources                      |
| [`plan-mode-reroute`](./skills/plan-mode/reroute)             | Revise the route when assumptions or evidence change        |
| [`plan-mode-run`](./skills/plan-mode/run)                     | Execute an accepted plan and record progress                |
| [`plan-mode-spec-lint`](./skills/plan-mode/spec-lint)         | Find what a spec leaves unstated                            |
| [`plan-mode-sunset`](./skills/plan-mode/sunset)               | Kill a goal that is not worth pursuing                      |
| [`plan-mode-teach`](./skills/plan-mode/teach)                 | Build understanding through explanation and checks          |
| [`plan-mode-to-checklist`](./skills/plan-mode/to-checklist)   | Turn an accepted plan into an executable checklist          |
| [`plan-mode-to-epic`](./skills/plan-mode/to-epic)             | Frame a coordinated outcome and its dependencies            |
| [`plan-mode-to-prd`](./skills/plan-mode/to-prd)               | Turn a product idea into a product requirements document    |
| [`plan-mode-to-spec`](./skills/plan-mode/to-spec)             | Define a testable implementation contract                   |
| [`plan-mode-to-tickets`](./skills/plan-mode/to-tickets)       | Split accepted work into executable tickets                 |
| [`plan-mode-trace`](./skills/plan-mode/trace)                 | Follow one value through the system end to end              |
| [`plan-mode-verify`](./skills/plan-mode/verify)               | Check the result against acceptance with evidence           |
| [`plan-mode-visualize`](./skills/plan-mode/visualize)         | Choose a useful visual form for a problem or decision       |

The [Plan Mode guide](./apps/docs/content/docs/plan-mode/index.mdx) explains
the boundaries. The older five-pack proposal and its `write-reword` draft
are not part of this collection.

## Plan

Planning, implementation, and writing workflows based on [Matt Pocock's skills](https://github.com/mattpocock/skills). This is our editable copy; see the [source and license](./skills/plan/SOURCE.md). Start with `plan-ask-matt` when you are unsure which flow fits.

| Skill                                                                               | What it's for                                 |
| ----------------------------------------------------------------------------------- | --------------------------------------------- |
| [`plan-ask-matt`](./skills/plan/ask-matt)                                           | Choose a skill or flow                        |
| [`plan-claude-handoff`](./skills/plan/claude-handoff)                               | Pass work to a fresh background agent         |
| [`plan-code-review`](./skills/plan/code-review)                                     | Review a diff against standards and a spec    |
| [`plan-codebase-design`](./skills/plan/codebase-design)                             | Design deep modules and test seams            |
| [`plan-diagnosing-bugs`](./skills/plan/diagnosing-bugs)                             | Reproduce and diagnose hard bugs              |
| [`plan-domain-modeling`](./skills/plan/domain-modeling)                             | Sharpen domain language and decisions         |
| [`plan-grill-me`](./skills/plan/grill-me)                                           | Interview without writing repo docs           |
| [`plan-grill-with-docs`](./skills/plan/grill-with-docs)                             | Interview while recording terms and decisions |
| [`plan-grilling`](./skills/plan/grilling)                                           | Run the underlying decision interview         |
| [`plan-handoff`](./skills/plan/handoff)                                             | Write a portable session handoff              |
| [`plan-implement`](./skills/plan/implement)                                         | Build a spec or ticket test-first             |
| [`plan-implement-spec`](./skills/plan/implement-spec)                               | Implement a specification                     |
| [`plan-improve-codebase-architecture`](./skills/plan/improve-codebase-architecture) | Find architectural deepening opportunities    |
| [`plan-loop-me`](./skills/plan/loop-me)                                             | Work through workflow specifications          |
| [`plan-migrate-to-shoehorn`](./skills/plan/migrate-to-shoehorn)                     | Replace test assertions with shoehorn         |
| [`plan-pr`](./skills/plan/pr)                                                       | Write a PR body                               |
| [`plan-prototype`](./skills/plan/prototype)                                         | Answer a design question with a prototype     |
| [`plan-research`](./skills/plan/research)                                           | Collect findings from primary sources         |
| [`plan-resolving-merge-conflicts`](./skills/plan/resolving-merge-conflicts)         | Resolve in-progress conflicts by intent       |
| [`plan-retro`](./skills/plan/retro)                                                 | Reflect on a coding session                   |
| [`plan-scaffold-exercises`](./skills/plan/scaffold-exercises)                       | Scaffold course exercises                     |
| [`plan-setup-matt-pocock-skills`](./skills/plan/setup-matt-pocock-skills)           | Configure a repo for the plan workflows       |
| [`plan-setup-pre-commit`](./skills/plan/setup-pre-commit)                           | Set up pre-commit checks                      |
| [`plan-setup-ts-deep-modules`](./skills/plan/setup-ts-deep-modules)                 | Enforce TypeScript module boundaries          |
| [`plan-tdd`](./skills/plan/tdd)                                                     | Develop one behavior at a time, test-first    |
| [`plan-teach`](./skills/plan/teach)                                                 | Learn a concept across sessions               |
| [`plan-to-questionnaire`](./skills/plan/to-questionnaire)                           | Ask someone else for missing decisions        |
| [`plan-to-spec`](./skills/plan/to-spec)                                             | Turn a conversation into a spec               |
| [`plan-to-tickets`](./skills/plan/to-tickets)                                       | Split a spec into unblocked slices            |
| [`plan-triage`](./skills/plan/triage)                                               | Evaluate incoming issues and requests         |
| [`plan-wait-what`](./skills/plan/wait-what)                                         | Re-explain a confusing response               |
| [`plan-wayfinder`](./skills/plan/wayfinder)                                         | Map decisions for a large uncertain effort    |
| [`plan-wizard`](./skills/plan/wizard)                                               | Guide human-only setup steps                  |
| [`plan-writing-beats`](./skills/plan/writing-beats)                                 | Arrange writing into beats                    |
| [`plan-writing-for-agents`](./skills/plan/writing-for-agents)                       | Write docs and skills for agents              |
| [`plan-writing-fragments`](./skills/plan/writing-fragments)                         | Gather raw writing fragments                  |
| [`plan-writing-shape`](./skills/plan/writing-shape)                                 | Shape fragments into prose                    |

## Marketkit

Seven skills turn an approved campaign plan into channel-specific assets, a schedule, and a publishing checklist.

| Skill                                                       | What it does                                    |
| ----------------------------------------------------------- | ----------------------------------------------- |
| [`marketkit-to-campaign`](./skills/marketkit/to-campaign)   | Turn a marketing idea into an approved campaign |
| [`marketkit-to-posts`](./skills/marketkit/to-posts)         | Write channel-native social posts               |
| [`marketkit-to-ads`](./skills/marketkit/to-ads)             | Write placement-aware ad variants               |
| [`marketkit-to-email`](./skills/marketkit/to-email)         | Write campaign email copy                       |
| [`marketkit-to-images`](./skills/marketkit/to-images)       | Produce or specify channel-sized visual assets  |
| [`marketkit-to-schedule`](./skills/marketkit/to-schedule)   | Assign approved assets to dates and channels    |
| [`marketkit-to-checklist`](./skills/marketkit/to-checklist) | Build the final publishing checklist            |

## Writing

Nine skills cover capture, outlining, canon, drafting, critique, revision, line editing, and verification. Start with `writing` when the stage is unclear.

```bash
npx skills add brianrabil/skills --full-depth --skill writing-critique
```

| Skill                                                   | What it does                                           |
| ------------------------------------------------------- | ------------------------------------------------------ |
| [`writing`](./skills/writing/writing)                   | Route the request to the right writing stage           |
| [`writing-capture`](./skills/writing/writing-capture)   | Capture raw material without imposing structure        |
| [`writing-outline`](./skills/writing/writing-outline)   | Settle the spine, story engine, and order before prose |
| [`writing-bible`](./skills/writing/writing-bible)       | Maintain fiction canon and continuity                  |
| [`writing-draft`](./skills/writing/writing-draft)       | Grow prose block by block or scene by scene            |
| [`writing-critique`](./skills/writing/writing-critique) | Diagnose problems without rewriting                    |
| [`writing-revise`](./skills/writing/writing-revise)     | Change structure or substance deliberately             |
| [`writing-edit`](./skills/writing/writing-edit)         | Tighten sentences while holding meaning fixed          |
| [`writing-verify`](./skills/writing/writing-verify)     | Audit factual claims without silently deleting them    |

## Skills

| Skill                                                   | What it's for                                                                                         |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`create-rule`](./skills/create-rule)                   | Create portable AGENTS.md instructions or reusable skills instead of editor-specific rule files       |
| [`docs-to-skill`](./skills/docs-to-skill)               | Turn documentation sites into lean skills backed by local references from `llms.txt` or `sitemap.xml` |
| [`repo-knowledge-miner`](./skills/repo-knowledge-miner) | Preserve current and historical repository knowledge with provenance and coverage                     |

The [docs site](#docs-site) documents these collections and standalone skills.

### Adding a skill

Put skills in `skills/<name>/` and plan workflows in `skills/plan/<name>/`.

```bash
npx skills init <name>
```

See the [Agent Skills specification](https://agentskills.io/specification) and
[best practices](https://agentskills.io/skill-creation/best-practices) before
writing one.

> [!NOTE]
> New skills must also be added to the matching table above.

## Docs site

The skills in this repo are documented at [`apps/docs`](./apps/docs), a
[Fumadocs](https://fumadocs.dev) site built on Next.js. Run it locally:

```bash
bun install
bun run --filter docs dev
```

Doc pages are hand-authored under `apps/docs/content/docs/` — they aren't
generated from `SKILL.md`, so a meaningfully changed skill needs its doc page
updated too.

## Repository structure

This repo is a [Bun workspace](https://bun.sh/docs/pm/workspaces) orchestrated with
[Turborepo](https://turborepo.dev):

| Path         | What it is                                       |
| ------------ | ------------------------------------------------ |
| `skills/`    | Published Agent Skills and nested collections    |
| `apps/docs`  | Fumadocs site for the published skills           |
| `apps/agent` | Local Eve agent for drafting skills in a sandbox |

## Development

```bash
bun install                                      # install JS dependencies
bun run --filter docs dev                        # start the docs site on :3000
bun run agent:dev                                # start the local Eve agent
bun run build                                    # build apps/docs and apps/agent
bunx turbo run quality                           # lint and format check
bunx turbo run quality:fix                       # fix lint and formatting
bunx changeset                                   # record a changelog entry
bun run skills:sync                              # restore local dev-tool skills
```

Versioning is driven by [changesets](https://github.com/changesets/changesets);
merging to `main` only versions and tags the repo — nothing is published to npm.
