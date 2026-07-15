# Project Catalyst — Claude Code Adoption Workshop Plugin

You've been handed a mandate: roll Claude Code out to an entire engineering organization. This plugin is the workshop — and the tool you take home afterward.

**Two modes, one playbook:**

- **Simulation** — play the AI Enablement Office at *Meridian Global Bank* (fictional: $1.2T assets, 10,000 engineers, five divisions, eight countries). Build a board-ready 6-month rollout plan while the conditions change under you. Your work is judged by a panel of stakeholder sub-agents — a CTO, CFO, CRO, CISO, and a skeptical staff engineer — and you don't advance until all of them are satisfied.
- **Advisory** — point the same machinery at your **own company**: an intake interview, a maturity assessment, a tailored rollout plan, and the same five-stakeholder panel stress-testing it, constructively.

## Install

```
/plugin marketplace add JJFromTenex/anthropic-fsi-plugin
/plugin install catalyst@catalyst
```

## Run the simulation

```bash
mkdir meridian && cd meridian
claude
> /catalyst:start simulation
```

That scaffolds the Meridian repo (10,000-row developer census, pilot results, budget, policy docs — deliberately more than you can read manually; that's the point) and delivers the CTO's mandate.

| Command | What it does |
|---|---|
| `/catalyst:brief` | Re-read the mandate, deliverable, and ground rules |
| `/catalyst:segment` | Census → data-driven wave design |
| `/catalyst:roi` | Pilot results → CFO-credible ROI model |
| `/catalyst:gauntlet` | Face all five stakeholders' challenges to your first strategy at once |
| `/catalyst:rebudget` | Re-cut the budget under a new envelope |
| `/catalyst:respond` | Write up the table's response to a curveball |
| `/catalyst:review` | Face the stakeholder panel — all must be satisfied to advance |
| `/catalyst:status` | Where you are in the arc |
| `/catalyst:pitch` | 3-minute board pitch from the finished plan |
| `/catalyst:playbook` | Compile the take-home artifact: every decision, every verdict, the final plan |

`/catalyst:curveball 1|2` is facilitator-only — it changes the conditions mid-exercise. If you're re-running solo at home, you're your own facilitator: drop them on yourself.

Your deliverable: `rollout_plan_FINAL.md` — six sections (Wave Design, Change & Adoption, Governance & Guardrails, ROI Framework, Budget Allocation, Risk Register). The repo's `CLAUDE.md` is pre-loaded; Claude Code is your only analyst, comms writer, financial modeler, and policy researcher. Use it accordingly.

## At the live workshop

If you're running this alongside **Mission Control** — the web app that drives the FSI workshop — install the plugin at the start and keep a terminal open next to it. Mission Control holds the briefings, the evidence, and the scoring; this plugin is your table's analyst: it reads the census, sums the budget, cross-references the policy, and drafts the memo you paste in. It never submits on your behalf.

**[WORKSHOP_MAP.md](WORKSHOP_MAP.md)** maps all eight stages to the commands that answer them, and covers the one trick worth knowing: `/catalyst:review` uses the same rubric as Mission Control's judges, so you can pre-grade your answer before it counts.

## Run it for your company

```bash
mkdir our-rollout && cd our-rollout
claude
> /catalyst:start my-company
```

Then: `/catalyst:assess` → `/catalyst:plan` → `/catalyst:stress-test`. Drop real data (census export, pilot metrics, survey results, your current AI policy) into `data/` and `docs/` — everything gets sharper with real rows. All analysis happens locally in your repo.

The scenario is entirely fictional; every name, number, and document in it was generated for this workshop.
