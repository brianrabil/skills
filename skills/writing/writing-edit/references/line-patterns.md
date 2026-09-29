# Line patterns

The patterns for [`writing-edit`](../SKILL.md). Each carries a **mechanism**
(why it costs the reader), a **tell** (how to spot it fast), and a
before → after with meaning identical on both sides. Work the pattern named by
the current pass; the patterns are weapons for a mode, not a checklist to spray.

Two cautions that outrank every pattern: meaning wins over brevity, and voice
overrides every rule here (see Guardrails in the SKILL.md).

## Word-level padding (condense)

Cut words that carry no information; keep every fact, condition, and working
qualifier.

- `in order to` → `to` · `due to the fact that` → `because` · `at this point in time` → `now`
- `has the ability to` → `can` · `in the event that` → `if` · `a large number of` → `many`
- `is able to help` → `helps` · `at the end of the day` → _(cut)_
- `very unique`, `quite essential`, `completely destroyed` — the adjective
  already says it; the intensifier is noise.

**Test:** delete the candidate words. If no fact, condition, or emphasis is
lost, they were padding.

## Nominalizations (de-nominalize)

A **zombie noun** buries the action inside a noun, usually beside a form of _to
be_, with the actor demoted or gone. Find the actor and the action; promote both
to subject and verb.

- `The implementation of the migration was completed by the team.` → `The team finished the migration.`
- `There was a reduction in latency.` → `Latency dropped.`
- `An investigation into the failure was conducted.` → `We investigated the failure.`
- `Her realization came slowly.` → `She realized slowly.` (or better, dramatize: see Embodiment)

**Test:** find the actor and the action. If either is a noun next to _to be_,
promote both.

- `is indicative of` → `indicates` · `is in agreement with` → `agrees with`
- `provides an explanation of` → `explains`

**When to leave it:** the nominalization can be right when the _thing_, not the
act, is the topic ("the revision was better than the original").

## Expletive openings

`There is / there are / it is` openers delay the real subject.

- `There are three reasons the build fails.` → `The build fails for three reasons.`
- `It was the cache that caused the staleness.` → `The cache caused the staleness.`

Leave it when the delay is the meaning: _there was nothing he could do_ states
an absence; the construction is doing that work.

## Throat-clearing

Delete the warm-up; the point is usually the second clause.

- `It is worth noting that the API changed.` → `The API changed.`
- `I think what I'm trying to say is that we should ship.` → `We should ship.`
- `In today's fast-paced world, margins are thin.` → `Margins are thin.`

**Test:** delete the first clause or sentence. If nothing breaks, it was
clearing its throat. Essay-openers that "set context" for three sentences before
touching the subject are throat-clearing at paragraph scale.

## Hedges and weasel words

Cut qualifiers that protect the writer rather than inform the reader.

- `This is somewhat likely to improve things.` → pick the real confidence: `This will likely…` or `This may…`
- `It could be argued that X.` → `X.`
- `Arguably the most important factor` → `The most important factor` — if you will defend it; otherwise `one of the most important`.

**Test:** does the qualifier tell the reader how much to believe, or shield the
writer from being wrong? Keep the first, cut the second.

## Echoes

Unintentional word repetition inside a paragraph — usually a distinctive noun
or verb reused within earshot. Read each paragraph aloud; any content word
appearing twice that isn't a deliberate drumbeat needs one instance changed, and
the fix is a better word, not a synonym from the thesaurus (which reads as
evasion). Also check sentence _openings_: three consecutive sentences starting
with the same subject is a flattening.

Deliberate repetition is different: a repeated phrase across paragraphs can be
the piece's drumbeat. Fix the accident, keep the instrument.

## Reorder

Cause before effect; claim before evidence; the familiar before the unfamiliar;
condition before consequence.

- `Latency dropped 40%. We rewrote the parser.` → `We rewrote the parser. Latency dropped 40%.`
- Put the load-bearing word last: the final stress of a sentence is where the
  reader's ear rests. `She was tired of the lies.` → `The lies had tired her.`

## Rhythm

Uniform sentence length reads as machine output; uniform openings read as a
list. The lever is contrast, not variety for its own sake:

- After two long sentences, a short one lands like a gavel. Save those.
- A run of equal-length sentences can be merged with a semicolon or colon when
  they're one thought — `The build is slow: it compiles every file, runs the
full suite, and never caches.` — or split when they're genuinely separate
  beats.
- Paragraph ends carry emphasis; end on the word that matters, not a trailing
  qualifier: `…which is why we ship on Fridays, mostly.` → `…which is why we ship on Fridays.`

## Fiction: filters (psychic distance)

Filter words put the character's perception between the reader and the thing:
_saw, heard, felt, noticed, watched, realized, wondered, seemed_.

- `She saw the door swing open.` → `The door swung open.` — the first reports
  that she has eyes; the second puts you behind her eyes.
- `He realized the rope was fraying.` → `The rope was fraying.` (the realization
  shows in what he does next)

Leave the filter in when the _perceiving is the event_: she strains to see
through fog, he is drugged and hears sound arrive late, the whole point is that
she notices too late. The pattern to fight is routine filtering of ordinary
moments; deep-POV prose mostly reports the world, not the reporting of it.

## Fiction: telling → embodiment

`She felt devastated. He was furious. It was terrifying.` — naming the emotion
hands the reader a label and asks them to do the feeling. On the hot moments,
render through body, behavior, and the world's response:

- `She felt devastated.` → `She sat down on the curb. She was still holding her keys.` — what the body does, the detail it grabs.
- `The house was scary.` → what the house does: `Something ticked in the walls, unhurried.`

But not everywhere: flat statement is the right tool for cold moments, and the
contrast between a stated fact and a rendered one is itself an effect
("Her brother died on a Tuesday. She mailed the forms.").

## Fiction: dialogue mechanics

- **Tags**: `said` and `asked` are invisible — that's why they're used. Cut
  adverbs off tags (`said angrily` → let the line do it). Use an action beat
  instead of a tag when the speaker needs a body: `He set down the wrench. "Try again."`
- **One speaker per exchange** unless attribution is unambiguous.
- **Punctuation**: comma inside the quotes before a tag (`"I know," she said`),
  period when followed by an action beat (`"I know." She turned away.`).
- **Idiolect**: each speaker gets one or two speech tells (length, formality,
  favorite word) and keeps them; if two characters' lines could swap without
  loss, the dialogue isn't written yet.

## Fiction: dialogue rhythm

Bury the tag inside a long line to keep a speech moving; let the other
character interrupt with action rather than answering; give the line _after_
the key one the silence it needs — a beat of business where a reaction would
over-explain.

## Guardrails (shared with the SKILL.md)

Keystone terms fixed; deliberate fragments kept; long cumulative sentences kept
when the unspooling is the point; the fact that forces length wins.
