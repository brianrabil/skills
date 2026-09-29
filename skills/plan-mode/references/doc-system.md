# Doc System

Plan-mode skills think. The doc system makes the thinking durable. Every skill
that produces a durable artifact records it as Markdown in `docs/plans/`.

## Where docs live

Artifacts go in `docs/plans/` at the root of the project being worked on. If the
project has no `docs/plans/`, create it. This repo keeps its own `docs/plans/`
for work done on itself.

## Artifact types

Each skill maps to one artifact. The filename is the artifact type in kebab-case.

| Skill                     | Artifact              | Filename            |
| ------------------------- | --------------------- | ------------------- |
| `plan-mode-plan`          | Plan                  | `plan.md`           |
| `plan-mode-to-spec`       | Technical spec        | `spec.md`           |
| `plan-mode-to-prd`        | PRD                   | `prd.md`            |
| `plan-mode-to-epic`       | Epic                  | `epic.md`           |
| `plan-mode-to-tickets`    | Ticket breakdown      | `tickets.md`        |
| `plan-mode-to-checklist`  | Execution checklist   | `checklist.md`      |
| `plan-mode-decide`        | Decision record       | `decision.md`       |
| `plan-mode-bounds`        | Constraints           | `bounds.md`         |
| `plan-mode-estimate`      | Estimate              | `estimate.md`       |
| `plan-mode-prioritize`    | Priority order        | `priority.md`       |
| `plan-mode-premortem`     | Premortem             | `premortem.md`      |
| `plan-mode-brief`         | Brief                 | `brief.md`          |
| `plan-mode-handoff`       | Handoff               | `handoff.md`        |
| `plan-mode-audit`         | Audit report          | `audit.md`          |
| `plan-mode-spec-lint`     | Spec gaps             | `spec-gaps.md`      |
| `plan-mode-archaeology`   | Change history        | `change-history.md` |
| `plan-mode-trace`         | Trace                 | `trace.md`          |
| `plan-mode-sunset`        | Sunset recommendation | `sunset.md`         |
| `plan-mode-park`          | Parked items          | `parked.md`         |
| `plan-mode-calibrate`     | Confidence record     | `confidence.md`     |
| `plan-mode-research`      | Research findings     | `research.md`       |
| `plan-mode-deep-research` | Deep research         | `deep-research.md`  |
| `plan-mode-explore`       | Options map           | `options.md`        |
| `plan-mode-brainstorm`    | Ideas                 | `ideas.md`          |
| `plan-mode-reframe`       | Reframing             | `reframing.md`      |
| `plan-mode-debate`        | Debate                | `debate.md`         |
| `plan-mode-counsel`       | Recommendation        | `recommendation.md` |
| `plan-mode-teach`         | Lesson                | `lesson.md`         |
| `plan-mode-visualize`     | Diagram               | `diagram.md`        |
| `plan-mode-clarify`       | Clarification         | `clarification.md`  |
| `plan-mode-read-docs`     | Doc summary           | `doc-summary.md`    |
| `plan-mode-verify`        | Verification          | `verification.md`   |
| `plan-mode-reroute`       | Reroute record        | `reroute.md`        |
| `plan-mode-run`           | Progress log          | `progress.md`       |
| `marketkit-to-campaign`   | Campaign plan         | `campaign.md`       |
| `marketkit-to-posts`      | Social posts          | `posts.md`          |
| `marketkit-to-ads`        | Ad copy               | `ads.md`            |
| `marketkit-to-email`      | Email copy            | `email.md`          |
| `marketkit-to-images`     | Image manifest        | `images.md`         |
| `marketkit-to-schedule`   | Publishing schedule   | `schedule.md`       |
| `marketkit-to-checklist`  | Publishing checklist  | `checklist.md`      |
| `write-reword`            | Reworded text         | `reword.md`         |

## Artifact structure

Every artifact is markdown with frontmatter:

```markdown
---
type: <artifact type>
skill: <skill name>
date: <ISO date>
status: draft | final
---

# <Title>

<Body: the skill's output, structured for a reader who was not present.>

## Source

- <the skill invocation or decision that produced this>
```

## Index

`docs/plans/index.md` lists every artifact with its type, date, and status.
Update the index after writing an artifact.

## Writing artifacts

Delegate artifact writing to a subagent when one is available and the source
material can be passed without losing required context. Otherwise write the
artifact directly. In both cases, apply this convention and update the index.

Invoke **plan-mode-docs** to document a body of work after the fact, or to
review and reconcile the docs tree.
