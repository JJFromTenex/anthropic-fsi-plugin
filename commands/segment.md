---
description: Analyze the developer census and propose a data-driven wave sequence for the rollout
argument-hint: "[optional constraints, e.g. 'exclude critical-function from waves 1-2']"
---

# /catalyst:segment

The aha moment, on demand: turn a 10,000-row CSV into a defensible wave design in one pass.

Read `catalyst_state.json` if present to determine whether the active plan is simulation or advisory.

1. Locate the census: `data/developer_census.csv` (simulation) or whatever census/roster the user has placed in `data/` (advisory — if none, ask for one or offer to work from their `COMPANY_PROFILE.md` org description).
2. Analyze it directly — never ask the user to summarize their own data. Use Bash (`awk`/`python3`) for real counts: population by division × location × seniority, pilot participants, and the `critical_function` column if present (post-Curveball-1).
3. Cross-reference what sequencing must respect:
   - If present, `docs/developer_sentiment_survey.md` — enthusiasm varies wildly by division and seniority; early waves should ride enthusiasm, not fight it.
   - If present, `docs/executive_mandate.md` constraints — Works Council consultation before Dublin/EU staff; adoption is opt-in.
   - If present, `data/change_champions.csv` — where the 45 champions actually sit.
   - `$ARGUMENTS` — any constraints the user passed; treat it as plain text guidance, not a shell fragment.
4. Propose a wave table in the exact shape of Section 1 of the template: Wave | Month | Population | Headcount | Rationale. Headcounts must sum to the full population; every rationale must cite data ("Platform & DevEx first: 61% excited, low risk posture, 700 people — fast proof").
5. Flag the landmines you noticed (timezone/geo coverage, high-concern divisions, critical-function dependencies) — one line each.
6. Offer to write this into Section 1 of the active plan: `rollout_plan_FINAL.md` in simulation mode, or `ROLLOUT_PLAN.md` in advisory mode. If yes, write it (in simulation, create from `templates/rollout_plan_TEMPLATE.md` if the file doesn't exist yet; in advisory, create the six-section plan skeleton if needed).
