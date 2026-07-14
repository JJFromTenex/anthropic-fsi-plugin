---
description: Show the team’s current Catalyst stage, evidence, decisions, and next useful action
---

# /catalyst:status

Read `catalyst_state.json`, `.catalyst/remote_state.json` when present, `evidence/`, and `rollout_plan_FINAL.md`.

Report:

- Hosted stage and paused state
- Active decision round
- Selected evidence files
- Number of stakeholder reviews
- Most recent unresolved objections
- Exactly one recommended next action

Do not show a checklist of undisclosed future events.
