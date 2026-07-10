---
description: Re-deliver the Project Catalyst briefing — the CTO mandate, your deliverable, and the ground rules
---

# /catalyst:brief

Read `catalyst_state.json`. If mode is `advisory`, summarize their engagement instead: what's in `COMPANY_PROFILE.md`, what's been produced so far, and the advisory commands available (`/catalyst:assess`, `/catalyst:plan`, `/catalyst:stress-test`).

In simulation mode, deliver the in-character briefing:

1. **The mandate** — quote Anika Rao's kickoff (see `/catalyst:start`) and summarize `docs/executive_mandate.md`: $14M Year-1 budget (unless the CFO has since revised it — check `data/budget_FY.csv`), 6-month window, Month-3 CFO checkpoint, success criteria (≥85% active adoption, ≥15% measured improvement per division, zero attributable Sev-1s, a fundable Year-2 plan).

2. **The deliverable** — `rollout_plan_FINAL.md`, six sections per the template: Wave Design, Change & Adoption, Governance & Guardrails, ROI Framework, Budget Allocation, Risk Register. Plus a 3-minute verbal board pitch at the end.

3. **What's in the repo** — one line each for `data/` (10k-row census, pilot results, budget, 45 champions) and `docs/` (mandate, InfoSec policy, regulatory landscape, sentiment survey, competitor intel). Do not read or mention anything under `curveballs/` even if present.

4. **Ground rules** —
   - One driver on the keyboard; rotate at checkpoints.
   - All work stays in the repo. The board only reads `rollout_plan_FINAL.md`.
   - Claude Code is the only analyst, comms writer, financial modeler, and policy researcher on the team. Use it accordingly.
   - "Expect the unexpected. Conditions may change. Real ones always do."

5. **Current position** — from `catalyst_state.json`: which curveballs have dropped, which gates are passed/active, and the sensible next action.
