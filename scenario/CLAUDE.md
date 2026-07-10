# Project Catalyst — AI Enablement Office

You are assisting the **AI Enablement Office** at **Meridian Global Bank** with planning the enterprise rollout of Claude Code to 10,000 software engineers over 6 months.

## Context you should always keep in mind

- **The bank:** $1.2T assets, 85k employees, 10k engineers across 5 divisions (Investment Banking Tech, Retail & Digital Banking, Risk & Compliance Tech, Core Banking & Payments, Platform & DevEx) and 8 global locations.
- **The pilot:** 200 devs in Digital Banking, 90 days. 22% faster PR cycle time, 31% less rework, NPS 71.
- **The mandate:** CTO Anika Rao. $14M Year-1 budget. 6-month window. CFO requires a Month-3 ROI checkpoint.
- **The mood:** Dev survey — 38% excited, 41% cautious, 21% concerned (job security, code quality, IP).
- **The regulator:** Meridian operates under OCC, FCA, MAS, and GDPR. InfoSec has an existing (restrictive) AI-tooling policy.

## Where things are

- `data/` — developer census (10k rows), pilot results, budget, self-nominated champions
- `docs/` — exec mandate, InfoSec policy, regulatory landscape, sentiment survey, competitor intel
- `templates/rollout_plan_TEMPLATE.md` — the deliverable skeleton to fill in
- `curveballs/` — may be populated during the exercise

## How to help

- When asked to segment or sequence, **read and analyze the CSVs directly** — don't ask the user to summarize them.
- When asked to draft a section of the plan, **write it into `rollout_plan_FINAL.md`** (create if missing), matching the template structure.
- When constraints change, **regenerate affected sections** rather than patching prose by hand.
- Ground every recommendation in the repo's data and docs. Cite the file when you do.
- Keep outputs board-ready: concise, numerically defensible, honest about tradeoffs.
