---
description: Re-cut the budget under a new envelope — every line item justified, every cut defended
argument-hint: "[optional ceiling or constraints, e.g. '9.5M, protect governance']"
---

# /catalyst:rebudget

1. Read the current envelope in `data/budget_FY.csv` and the team's Section 5 in `rollout_plan_FINAL.md` if it exists. Parse `$ARGUMENTS` for a ceiling or protected lines.
2. Rebuild the allocation to fit the ceiling. Rules:
   - **Show the before → after per line item** with a one-line rationale for every change. "Numbers, not vibes."
   - Consider a **ramped seat model** (active seats by quarter, not full population × 12 months) — verify the math against the census/adjacent-roles headcounts with Bash.
   - Governance/model-risk spend that a regulator gate depends on should not silently vanish — if it must shrink, say what risk that buys.
   - Enablement can shift shape (champion-led, in-repo, self-serve) rather than just shrink — cite the sentiment survey: seniors vouching and proof-on-our-codebase beat classroom hours.
   - The total must sum exactly. Compute it; don't eyeball it.
3. Name the deferral honestly: what no longer happens in the window, and what it costs to finish later.
4. Offer to write it into Section 5 of `rollout_plan_FINAL.md` and reconcile Sections 1 and 4 to match (a budget change that doesn't ripple is a lie).
