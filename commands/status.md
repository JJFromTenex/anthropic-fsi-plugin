---
description: Where the table is in the Project Catalyst arc — curveballs dropped, gates passed, review rounds, next action
---

# /catalyst:status

Read `catalyst_state.json` (if missing: nothing started — point to `/catalyst:start`). If `gates` has no `gauntlet` key, treat it as `locked` and report it as such — don't error on state written before the Gauntlet existed.

**Advisory mode:** report which artifacts exist (`COMPANY_PROFILE.md`, `MATURITY_ASSESSMENT.md`, `ROLLOUT_PLAN.md`), and the sensible next command (`/catalyst:my-company` → `/catalyst:assess` → `/catalyst:plan` → `/catalyst:stress-test`).

**Simulation mode:** render the arc as a compact table:

| Stage | Status |
|---|---|
| Scenario scaffolded | started_at timestamp |
| Baseline plan | does `rollout_plan_FINAL.md` exist / which of the 6 sections have content |
| The Gauntlet — all five | locked / active (N rounds so far) / passed / passed by override |
| Curveball 1 — The Regulator Calls | not dropped / dropped |
| Gate 1 — CRO · CISO · CTO | locked / active (N rounds so far) / passed / passed by override |
| Curveball 2 — Less Money, More People | not dropped / dropped |
| Gate 2 — CFO · CTO · Staff Eng | same |
| Final gate — full board pre-read | same |

For the active gate, list the outstanding objections from the most recent round (from state), verbatim.

End with exactly one recommended next action (e.g., "Gate 1 is active with 2 unresolved objections from the CRO — update Sections 1 and 3, then `/catalyst:review`").
