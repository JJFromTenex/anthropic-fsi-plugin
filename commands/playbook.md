---
description: Compile the take-home playbook — every decision, every stakeholder verdict, and the final plan in one standalone HTML artifact
---

# /catalyst:playbook

The walk-away artifact. Requires simulation artifacts: `catalyst_state.json` and `rollout_plan_FINAL.md`. If either is missing, stop and explain the playbook is available after the simulation has produced a final plan. Then read everything: `catalyst_state.json` (full verdict history, rounds, overrides), `rollout_plan_FINAL.md`, everything under `responses/` if present, and the git log (`git log --oneline`) which shows the re-planning story.

Build `catalyst_playbook.html` — a single self-contained HTML file (inline CSS, no external dependencies, print-friendly) with:

1. **The story arc** — a timeline: starter state → baseline plan → Curveball 1 → Gate 1 rounds (how many tries, what the stakeholders objected to, verbatim) → Curveball 2 → Gate 2 rounds → final gate → board-ready. Include override flags honestly if any.
2. **The stakeholder ledger** — per persona: every objection they raised across all rounds and how the final plan answers it. This is the Q&A record the user asked to keep — "all the questions that were asked, and the answers."
3. **The final plan** — `rollout_plan_FINAL.md` rendered in full.
4. **The decisions register** — the "Our decisions / Tradeoffs / Risks we accept" content from each gate response.
5. **Run it for real** — a closing section: how to re-run this against their own org (`/catalyst:start my-company` in a fresh folder → intake → `/catalyst:assess` → `/catalyst:plan` → `/catalyst:stress-test`), and the honest note that the same stakeholder pressures — regulator, CFO, security, skeptical engineers — are exactly the gates their real rollout must pass.

Tone: their work, professionally presented — something they'd forward to their own CTO. Keep every verdict and objection verbatim; the friction is the value.
