---
description: Analyze the developer census and propose a data-driven wave sequence for the rollout
argument-hint: "[optional constraints, e.g. 'exclude critical-function from waves 1-2']"
---

# /catalyst:segment

The aha moment, on demand: turn a 10,000-row CSV into a defensible wave design in one pass.

1. Locate the census: `data/developer_census.csv` (simulation) or whatever census/roster the user has placed in `data/` (advisory — if none, ask for one or offer to work from their `COMPANY_PROFILE.md` org description).
2. Analyze it directly — never ask the user to summarize their own data. Use Bash (`awk`/`python3`) for real counts: population by division × location × seniority, pilot participants, and the `critical_function` column if present (post-Curveball-1).
3. Cross-reference what sequencing must respect:
   - `docs/developer_sentiment_survey.md` — enthusiasm varies wildly by division and seniority; early waves should ride enthusiasm, not fight it.
   - `docs/executive_mandate.md` constraints — Works Council consultation before Dublin/EU staff; adoption is opt-in.
   - `data/change_champions.csv` — where the 45 champions actually sit.
   - `$ARGUMENTS` — any constraints the user passed.
4. Propose a wave table in the exact shape of Section 1 of the template: Wave | Month | Population | Headcount | Rationale. Headcounts must sum to the full population; every rationale must cite data ("Platform & DevEx first: 61% excited, low risk posture, 700 people — fast proof").
5. Flag the landmines you noticed (timezone/geo coverage, high-concern divisions, critical-function dependencies) — one line each.
6. Offer: "Want me to write this into Section 1 of `rollout_plan_FINAL.md`?" If yes, write it (create the file from the template if it doesn't exist yet).
