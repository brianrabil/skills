# Plan Mode

Thirty-five focused skills for thinking through work, producing plans, and
following them through. Each skill stands alone; invoking one does not require
running the others.

Install a single skill by its exact name:

```bash
npx skills add brianrabil/skills --full-depth --skill plan-mode-research
```

## How the pack is organized

The skills are cognitive verbs. They group into seven movements:

| Movement     | Skills                                                                                 | Question they answer                    |
| ------------ | -------------------------------------------------------------------------------------- | --------------------------------------- |
| **Orient**   | `trace`, `archaeology`, `clarify`, `explore`, `research`, `deep-research`, `read-docs` | What is actually going on?              |
| **Generate** | `brainstorm`, `reframe`, `debate`, `counsel`, `visualize`                              | What could we do?                       |
| **Shape**    | `to-prd`, `to-spec`, `to-epic`, `to-tickets`, `to-checklist`, `spec-lint`, `audit`     | What exactly are we building?           |
| **Commit**   | `decide`, `bounds`, `estimate`, `prioritize`, `premortem`, `calibrate`                 | What will we do, and what does it cost? |
| **Execute**  | `plan`, `run`, `verify`, `reroute`                                                     | Are we doing it, and is it working?     |
| **Compress** | `brief`, `handoff`                                                                     | How do we pass this on?                 |
| **Stop**     | `sunset`, `park`                                                                       | Should we keep doing this?              |

## Skills

### Orient

| Skill                                        | What it does                                             |
| -------------------------------------------- | -------------------------------------------------------- |
| [`plan-mode-trace`](./trace)                 | Follow one value through the system end to end           |
| [`plan-mode-archaeology`](./archaeology)     | Find what changed, when, and why                         |
| [`plan-mode-clarify`](./clarify)             | Resolve consequential ambiguity                          |
| [`plan-mode-explore`](./explore)             | Map viable approaches and tradeoffs                      |
| [`plan-mode-research`](./research)           | Answer a bounded question with sources                   |
| [`plan-mode-deep-research`](./deep-research) | Investigate a complex question across competing evidence |
| [`plan-mode-read-docs`](./read-docs)         | Extract the relevant contract from current documentation |

### Generate

| Skill                                  | What it does                                                |
| -------------------------------------- | ----------------------------------------------------------- |
| [`plan-mode-brainstorm`](./brainstorm) | Generate distinct possibilities before selection            |
| [`plan-mode-reframe`](./reframe)       | Challenge a stuck problem framing                           |
| [`plan-mode-debate`](./debate)         | Test competing positions against shared criteria            |
| [`plan-mode-counsel`](./counsel)       | Help weigh a consequential choice without deciding silently |
| [`plan-mode-visualize`](./visualize)   | Choose a useful visual form for a problem or decision       |

### Shape

| Skill                                      | What it does                                             |
| ------------------------------------------ | -------------------------------------------------------- |
| [`plan-mode-to-prd`](./to-prd)             | Turn a product idea into a product requirements document |
| [`plan-mode-to-spec`](./to-spec)           | Define a testable implementation contract                |
| [`plan-mode-to-epic`](./to-epic)           | Frame a coordinated outcome and its dependencies         |
| [`plan-mode-to-tickets`](./to-tickets)     | Split accepted work into executable tickets              |
| [`plan-mode-to-checklist`](./to-checklist) | Turn an accepted plan into an executable checklist       |
| [`plan-mode-spec-lint`](./spec-lint)       | Find what a spec leaves unstated                         |
| [`plan-mode-audit`](./audit)               | Judge an artifact against a named standard               |

### Commit

| Skill                                  | What it does                                   |
| -------------------------------------- | ---------------------------------------------- |
| [`plan-mode-decide`](./decide)         | Close open options and record the commitment   |
| [`plan-mode-bounds`](./bounds)         | Surface hard resource limits before planning   |
| [`plan-mode-estimate`](./estimate)     | Size the work and name the unknowns            |
| [`plan-mode-prioritize`](./prioritize) | Order work under real capacity                 |
| [`plan-mode-premortem`](./premortem)   | Assume failure and work backward to causes     |
| [`plan-mode-calibrate`](./calibrate)   | State how much you actually know before acting |

### Execute

| Skill                            | What it does                                         |
| -------------------------------- | ---------------------------------------------------- |
| [`plan-mode-plan`](./plan)       | Set out an actionable sequence and acceptance checks |
| [`plan-mode-run`](./run)         | Execute an accepted plan and record progress         |
| [`plan-mode-verify`](./verify)   | Check the result against acceptance with evidence    |
| [`plan-mode-reroute`](./reroute) | Revise the route when assumptions or evidence change |

### Compress

| Skill                            | What it does                                     |
| -------------------------------- | ------------------------------------------------ |
| [`plan-mode-brief`](./brief)     | Compress research into a decision-ready page     |
| [`plan-mode-handoff`](./handoff) | Compress session state into a resumable artifact |

### Stop

| Skill                          | What it does                                         |
| ------------------------------ | ---------------------------------------------------- |
| [`plan-mode-sunset`](./sunset) | Kill a goal that is not worth pursuing               |
| [`plan-mode-park`](./park)     | Capture rejected and deferred work so it is not lost |

### Meta

| Skill                      | What it does                                         |
| -------------------------- | ---------------------------------------------------- |
| [`plan-mode-docs`](./docs) | Document plan-mode work as markdown in `docs/plans/` |

## Routing

Skills cross-reference each other. The common paths:

- `clarify` → `explore` → `decide` — resolve ambiguity, map options, commit
- `research` / `deep-research` → `brief` — investigate, then compress for a decision
- `to-spec` → `spec-lint` → `to-tickets` — write, audit for gaps, then slice
- `plan` → `bounds` → `estimate` — sequence, then check against limits and size
- `run` → `verify` → `reroute` — execute, check, revise on failure
- `premortem` → `decide` — surface risks before committing
- `sunset` / `park` — the exit hatches when the goal or the idea is not worth it
