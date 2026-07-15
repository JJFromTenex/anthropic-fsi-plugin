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

## The eight stages, and what to run for each

| # | Mission Control tab | Run this | What it gets you |
|---|---|---|---|
| 1 | **The Mandate** | `/catalyst:brief` | Anika's mandate, the deliverable, the ground rules — restated so the table can draft against it |
| 2 | **Intelligence Sweep** | `/catalyst:segment` | The census actually read: division, seniority, critical-function split, the numbers your answer needs to cite |
| 3 | **The First Strategy** | `/catalyst:segment` → `/catalyst:roi` | Wave design grounded in the census, then a CFO-credible ROI model off the pilot data |
| 4 | **The Gauntlet** | `/catalyst:gauntlet` | All five stakeholder challenges, verbatim, with a drafting slot under each — then `/catalyst:review` grades them before you paste |
| 5 | **The Regulator Calls** | `/catalyst:curveball 1` → `/catalyst:respond` | SR 26-11 dropped into the repo, then the two-track response written against it |
| 6 | **Less Money, More People** | `/catalyst:curveball 2` → `/catalyst:rebudget` → `/catalyst:respond` | The revised envelope, the budget re-cut to the new ceiling, the deferrals named and costed |
| 7 | **The Final Pitch** | `/catalyst:review` → `/catalyst:pitch` | The full board pre-read, then a 3-minute pitch from the finished plan |
| 8 | **Take It Home** | `/catalyst:playbook` | Every decision, every verdict, the final plan — one artifact you keep |

**On stages 5 and 6:** `/catalyst:curveball` is normally facilitator-only. When you're following Mission Control, the app *is* the facilitator — once it reveals the curveball on screen, drop the matching one in your repo so your analyst sees what the room sees.

**A useful trick for stages 4 and 7:** run `/catalyst:review` before you submit. The plugin's panel and Mission Control's judges are calibrated from the same rubric, so a `NOT SATISFIED` in your terminal is a very good predictor of a low score on the board — and it tells you which objection to fix, for free, before it counts.

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

Drop real data into `data/` and `docs/` — a census export, pilot metrics, survey results, your current AI policy — and everything gets sharper. All analysis stays local to your repo.

The five personas shift with the mode. In simulation they're Meridian's board and they're adversarial. In advisory they become archetypes of *your* stakeholders — your CFO's actual budget reality, your regulator's actual surface — and they turn constructive. `/catalyst:stress-test` is the honest one: it's the meeting you're going to have anyway, run early enough that the objections are still cheap to fix.
