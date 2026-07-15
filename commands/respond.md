---
description: Write up the table's long-form response to the active gate — decisions, rationale, and what changes in the plan
---

# /catalyst:respond

This command is for the **curveball gates** only. If `gates.gauntlet.status` is `active`, the table is in the Gauntlet — send them to `/catalyst:gauntlet`, which has its own five-stakeholder response file, and stop.

Read `catalyst_state.json`. Find the active gate: `gate_1` or `gate_2` with status `active`. If both are passed and `final` isn't, explain that `/catalyst:review` runs the final board pre-read directly from `rollout_plan_FINAL.md` and no response file is needed. If nothing is active, explain that gates open when curveballs drop (or, post-Gate-2, that `/catalyst:review` runs the final board pre-read directly) and stop.

Create `responses/gate_<n>_response.md` (or open it if it exists — never overwrite content the team already wrote).

The sections below are **the same fields, in the same order, that Mission Control asks for** at this stage. Use them verbatim as headings so the table can answer here and paste each section straight into its matching field — no re-cutting under time pressure.

**For Gate 1 — The Regulator Calls:**

```markdown
# Gate 1 Response — The Regulator Calls

## The two-track rollout revision
<Which populations move on which track, with the v2 census numbers. The standard
track's cadence, the critical-function track's gate, and how the wave order changes.>

## Operationalizing the controls
<MRM validation (owner, timing, what it gates), per-merge attestation (who, where in
the workflow, recorded how), 12-month immutable logs reconciled with 14.7 §3.3,
quarterly reporting (owner).>

## Timeline & value impact
<What SR 26-11 does to the 6-month window, the 85% target, and the Month-3 story —
with honest numbers, not reassurance.>

## What does NOT change — and why
<The parts of your strategy that survive intact, and the argument for why the letter
doesn't touch them.>
```

**For Gate 2 — Less Money, More People:**

```markdown
# Gate 2 Response — Less Money, More People

## What gets cut or deferred
<The honest list: what no longer happens in the window, what it costs to finish later,
and why these cuts and not others.>

## The re-cut budget
<Line items summing to <= $9.5M. Show before → after per line with one-line rationale.
David will do the arithmetic — do it first. `/catalyst:rebudget` drafts this.>

## The 12,000-person plan
<How 2,000 adjacent roles enter the six-month window: which waves, what enablement
(differentiated — a BA is not a compressed engineer), and what the 85%-of-12,000 math
now looks like.>

## Protecting the Month-3 story
<The revised checkpoint claim: metric, population, baseline, target — and where the
adjacent roles help the evidence rather than dilute it.>
```

Then coach, briefly:
- Each heading is a field on screen. Answer all of them — a blank section is a guaranteed objection from whichever stakeholder owns it.
- The panel reads **both** this response and `rollout_plan_FINAL.md`, and checks that the plan actually reflects the decisions claimed here. Say it here, then make it true there.
- The fastest path: decide as a table, then have Claude Code regenerate the affected plan sections from the data — don't hand-patch prose.
- When the response is written and the plan is updated: `/catalyst:review` — it grades this before the room does.
