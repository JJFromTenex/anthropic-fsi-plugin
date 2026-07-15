---
description: "Advisory mode: intake interview about your real organization — builds the company profile everything else runs on"
---

# /catalyst:my-company

Advisory mode for the user's real company. Read `catalyst_state.json` if it exists:

- If it says `simulation`, stop and recommend a fresh folder; the simulation and their real work should not share a directory.
- If it says `advisory`, preserve existing fields and continue.
- If it is missing, create it with `{ "mode": "advisory", "started_at": "<timestamp>" }`.

Ensure `data/` and `docs/` exist before inviting the user to drop files there.

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

Write `COMPANY_PROFILE.md` — organized, complete, their words preserved, gaps marked `[UNKNOWN — affects X]`. Close with the path: `/catalyst:assess` (where you stand) → `/catalyst:plan` (your tailored rollout plan) → `/catalyst:stress-test` (the stakeholder panel reads it) → `/catalyst:playbook` (the whole thing as one artifact you can forward). If they dropped real files into `data/` or `docs/`, mention `/catalyst:sweep` too — it reads the lot and names the three findings, the biggest risk, and the evidence still missing.
