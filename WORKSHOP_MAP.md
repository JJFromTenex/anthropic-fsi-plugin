# Workshop Map — Catalyst alongside Mission Control

If you're at the FSI workshop, **Mission Control** (the web app on the screen) runs the exercise: it holds the briefings, the evidence library, the submission forms, and the scoring. This plugin is **your table's analyst** — a terminal open next to it that does the reading, the arithmetic, and the drafting your answers are made of.

The division of labor matters:

- **Mission Control** decides. It shows you the challenge, takes your answer, convenes the AI panel, and puts the score on the leaderboard.
- **Catalyst** works. It reads the 10,000-row census, sums the budget, cross-references the policy, and drafts the memo you paste in.

**Catalyst never submits on your behalf.** The plugin has no idea Mission Control exists. You copy your answer across. That's deliberate — the table stays the decision-maker, and the tool stays the analyst.

## Setup — do this at the start of the workshop

```
/plugin marketplace add JJFromTenex/anthropic-fsi-plugin
/plugin install catalyst@catalyst
```

Then, in a scratch folder:

```bash
mkdir meridian && cd meridian
claude
> /catalyst:start simulation
```

That scaffolds the same Meridian data Mission Control's evidence library shows you — census, pilot results, budget, policy docs — into a real repo you can grep, sum, and re-model. One person per table is enough; more is better.

## The stages, and what to run for each

Match on the **tab name**, not the number — Mission Control renumbers its sidebar depending on which curveballs the facilitator turns on.

| Mission Control tab | Run this | What it gets you |
|---|---|---|
| **The Mandate** | `/catalyst:brief` | Anika's mandate, the deliverable, the ground rules — restated so the table can draft against it |
| **Intelligence Sweep** | `/catalyst:sweep` | The whole library read at once — census, sentiment, pilot telemetry, policy clauses — reduced to three findings with numbers, the biggest risk, and the evidence that's missing |
| **The First Strategy** | `/catalyst:segment` → `/catalyst:roi` | Wave design grounded in the census, then a CFO-credible ROI model off the pilot data |
| **The Gauntlet** | `/catalyst:gauntlet` | All five stakeholder challenges, verbatim, with a drafting slot under each — then `/catalyst:review` grades them before you paste |
| **The Regulator Calls** | `/catalyst:curveball 1` → `/catalyst:respond` | SR 26-11 dropped into the repo, then the two-track response written against it |
| **Less Money, More People** — *only if it appears* | `/catalyst:curveball 2` → `/catalyst:rebudget` → `/catalyst:respond` | The revised envelope, the budget re-cut to the new ceiling, the deferrals named and costed |
| **The Final Pitch** | `/catalyst:review` → `/catalyst:pitch` | The full board pre-read, then a 3-minute pitch from the finished plan |
| **Take It Home** | `/catalyst:playbook` | Every decision, every verdict, the final plan — one artifact you keep |

**"Less Money, More People" is optional.** It's the second curveball, and the facilitator switches it on only if the room has time. If it isn't in your sidebar, skip that row entirely — don't run `/catalyst:curveball 2`, and don't be thrown that The Final Pitch is numbered 06 rather than 07.

**On the curveball stages:** `/catalyst:curveball` is normally facilitator-only. When you're following Mission Control, the app *is* the facilitator — once it reveals the curveball on screen, drop the matching one in your repo so your analyst sees what the room sees.

**A useful trick for The Gauntlet and The Final Pitch:** run `/catalyst:review` before you submit. The plugin's panel and Mission Control's judges are calibrated from the same rubric, so a `NOT SATISFIED` in your terminal is a very good predictor of a low score on the board — and it tells you which objection to fix, for free, before it counts.

## The knowledge base behind all of it

Everything above sits on one skill — `adoption-playbook` — which loads on demand when a command needs it. You can also just ask for it directly, in plain language, at any point:

- *"What's the champion model for a 10,000-engineer org?"* → `references/champion-model.md`
- *"How do I baseline before rollout without ROI theater?"* → `references/measurement-framework.md`
- *"What controls do regulated industries actually need?"* → `references/governance-patterns.md`
- *"What converts a skeptical staff engineer?"* → `references/resistance-personas.md`

Also available: `maturity-pillars.md`, `rollout-phases.md`, `technical-readiness.md`. You don't need to name the file — describing the problem is enough.

## After the workshop — the part that's actually yours

The simulation is practice. The advisory mode is the point.

```bash
mkdir our-rollout && cd our-rollout
claude
> /catalyst:start my-company
```

Then walk it:

| Command | What it does |
|---|---|
| `/catalyst:my-company` | Intake interview — your org, your regulators, your estate, your constraints |
| `/catalyst:assess` | Maturity assessment against the playbook's pillars, grounded in your answers |
| `/catalyst:plan` | A rollout plan for *your* company — same six-section structure the board judged today |
| `/catalyst:stress-test` | The same five stakeholders, adapted to your context, arguing with your real plan |
| `/catalyst:sweep` | Whatever real evidence you have, read at once → three findings, the biggest risk, what's missing |
| `/catalyst:playbook` | The whole thing compiled into one HTML artifact — the version you forward to your sponsor |

Drop real data into `data/` and `docs/` — a census export, pilot metrics, survey results, your current AI policy — and everything gets sharper. All analysis stays local to your repo.

The five personas shift with the mode. In simulation they're Meridian's board and they're adversarial. In advisory they become archetypes of *your* stakeholders — your CFO's actual budget reality, your regulator's actual surface — and they turn constructive. `/catalyst:stress-test` is the honest one: it's the meeting you're going to have anyway, run early enough that the objections are still cheap to fix.
