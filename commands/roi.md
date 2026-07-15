---
description: Build a CFO-credible ROI model from the pilot results — baselines, per-wave targets, and the Month-3 checkpoint
argument-hint: "[optional focus, e.g. 'month-3 story only']"
---

# /catalyst:roi

Read `catalyst_state.json` if present to determine whether the active plan is simulation or advisory.

1. Read `data/pilot_results.csv` (simulation) or the user's own metrics in `data/` (advisory — if none, build the framework with explicit placeholder assumptions and say so). Compute real numbers with Bash/python3: median PR cycle-time improvement, review-rework delta, satisfaction distribution, weekly-active spread. In simulation, note the skeptic's caveat honestly — the pilot cohort was greenfield and hand-picked, so apply and state a haircut when extrapolating. In advisory, state any comparable caveats in the user's data rather than assuming the Meridian pilot caveat applies.
2. Build the ROI framework in the shape of Section 4 of the template:
   - **Baseline plan**: which metrics get baselined, for whom, before their wave starts (baseline-before-rollout is non-negotiable — you can't show improvement without a before).
   - **Per-wave targets**: conservative, sourced from the pilot/user metrics with the haircut or data caveat stated.
   - **The Month-3 checkpoint**: a specific, falsifiable claim — metric, population, target, measurement source. This is what the CFO reads first.
   - Leading indicators (weekly active users, sessions/engineer) vs lagging (cycle time, rework, incident rate) — and the anti-patterns to refuse (lines of code, unhaircut pilot extrapolation across the whole org).
3. If adjacent roles exist in the data (post-Curveball-2), model their contribution separately — cheap to enable, fast visible output, and note their potential role in the Month-3 evidence.
4. Where dollar values are wanted, show the arithmetic inline (assumptions × population × time) — a CFO checks math before prose.
5. Offer to write it into Section 4 of the active plan: `rollout_plan_FINAL.md` in simulation mode, or `ROLLOUT_PLAN.md` in advisory mode.

---

*Workshop: this feeds **Stage 3 — The First Strategy** in Mission Control. See [WORKSHOP_MAP.md](../WORKSHOP_MAP.md).*
