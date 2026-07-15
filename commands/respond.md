---
description: Write up the table's long-form response to the active gate — decisions, rationale, and what changes in the plan
---

# /catalyst:respond

This command is for the **curveball gates** only. If `gates.gauntlet.status` is `active`, the table is in the Gauntlet — send them to `/catalyst:gauntlet`, which has its own five-stakeholder response file, and stop.

Read `catalyst_state.json`. Find the active gate: `gate_1` or `gate_2` with status `active`. If both are passed and `final` isn't, explain that `/catalyst:review` runs the final board pre-read directly from `rollout_plan_FINAL.md` and no response file is needed. If nothing is active, explain that gates open when curveballs drop (or, post-Gate-2, that `/catalyst:review` runs the final board pre-read directly) and stop.

Create `responses/gate_<n>_response.md` (or open it if it exists — never overwrite content the team already wrote). Template:

```markdown
# Gate <n> Response — <The Regulator Calls | Less Money, More People>

## Our decisions
<The room's calls, stated plainly. e.g. "Two-track rollout: standard track proceeds
on the original cadence; critical-function track gated behind MRM validation.">

## Why
<The reasoning. Reference the data where it drove the decision.>

## What changes in the plan
<Which sections of rollout_plan_FINAL.md change and the one-line summary of each change.
Then actually make those changes in the plan before review.>

## Tradeoffs and deferrals
<What you gave up, deferred, or de-scoped — named honestly, costed where possible.>

## Risks we accept
<What could go wrong with this response and why you accept it.>
```

Then coach, briefly:
- This is the table's thinking, long-form — the stakeholder panel reads **both** this response and `rollout_plan_FINAL.md`, and checks that the plan actually reflects the decisions claimed here.
- The fastest path: decide as a table, then have Claude Code regenerate the affected plan sections from the data — don't hand-patch prose.
- When the response is written and the plan is updated: `/catalyst:review`.
