---
description: "Advisory mode: intake interview about your real organization — builds the company profile everything else runs on"
---

# /catalyst:my-company

Advisory mode for the user's real company. If `catalyst_state.json` says `simulation`, check intent — they may want a fresh folder for this (recommend one; the simulation and their real work shouldn't share a directory).

Ensure `catalyst_state.json` exists with `{ "mode": "advisory" }` (create if needed).

Load the `adoption-playbook` skill for the frameworks before interviewing.

## The intake

Interview conversationally — a few questions at a time, adapting to answers, not a form dump. Cover:

1. **Org shape** — engineer headcount, divisions/lines of business, geographies, and the code-adjacent population (BAs, QA, quants, data, PMs, SRE) they may not have counted yet.
2. **Regulatory and security posture** — industry and regulators, whether an AI-tooling policy exists (ask them to drop it in `docs/` if so), data classifications, works councils, model-risk function.
3. **Where they are today** — pilot run or planned? Results and how they were measured? Current AI tool usage, sanctioned or shadow?
4. **Money and mandate** — budget reality, who sponsors this, what checkpoint the CFO (or equivalent) will impose, what "success" means to their board.
5. **The people** — sentiment signal if any (survey? vibes?), where the enthusiasm and resistance sit, candidate champions, the loudest skeptic they can name.
6. **Constraints and deadlines** — the real-world equivalents of the curveballs they can already see coming.

Invite real data: census/roster exports, pilot metrics, survey results → `data/`. Everything downstream gets sharper with real rows. (Note plainly: data stays local; nothing about this flow sends it anywhere.)

## Output

Write `COMPANY_PROFILE.md` — organized, complete, their words preserved, gaps marked `[UNKNOWN — affects X]`. Close with the path: `/catalyst:assess` (where you stand) → `/catalyst:plan` (your tailored rollout plan) → `/catalyst:stress-test` (the stakeholder panel reads it).
