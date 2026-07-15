---
description: Re-cut the budget under a new envelope — every line item justified, every cut defended
argument-hint: "[optional ceiling or constraints, e.g. '9.5M, protect governance']"
---

# /catalyst:rebudget

Read `catalyst_state.json` if present to determine whether the active plan is simulation or advisory.

1. Determine the active plan: `rollout_plan_FINAL.md` in simulation mode, or `ROLLOUT_PLAN.md` in advisory mode. Read the current envelope in `data/budget_FY.csv` if it exists, and the plan's Section 5 if it exists. Parse `$ARGUMENTS` as plain text for a ceiling or protected lines; do not execute it. If there is no budget file and no ceiling in `$ARGUMENTS`, ask for the budget envelope and stop.
2. Rebuild the allocation to fit the ceiling. Rules:
   - **Show the before → after per line item** with a one-line rationale for every change. "Numbers, not vibes."
   - Consider a **ramped seat model** (active seats by quarter, not full population × 12 months) — verify the math against the census/adjacent-roles headcounts with Bash.
   - Governance/model-risk spend that a regulator gate depends on should not silently vanish — if it must shrink, say what risk that buys.
   - Enablement can shift shape (champion-led, in-repo, self-serve) rather than just shrink — cite the sentiment survey if present: seniors vouching and proof-on-our-codebase beat classroom hours.
   - The total must sum exactly. Compute it; don't eyeball it.
3. Name the deferral honestly: what no longer happens in the window, and what it costs to finish later.
4. Offer to write it into Section 5 of the active plan and reconcile Sections 1 and 4 to match (a budget change that doesn't ripple is a lie).

---

*Workshop: this feeds **Stage 6 — Less Money, More People** in Mission Control. See [WORKSHOP_MAP.md](../WORKSHOP_MAP.md).*
