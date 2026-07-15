---
description: Compile the take-home playbook — every decision, every stakeholder objection, and the plan in one standalone HTML artifact you can forward
---

# /catalyst:playbook

The walk-away artifact. It works in both modes — read `catalyst_state.json` and branch on `mode`. If `catalyst_state.json` is missing entirely, stop and offer `/catalyst:start`.

Either way the output is `catalyst_playbook.html`: a single self-contained HTML file (inline CSS, no external dependencies, print-friendly). Tone: their work, professionally presented — something they'd forward to their own CTO. Keep every objection verbatim; the friction is the value.

## Simulation mode

Also requires `rollout_plan_FINAL.md`. If it's missing, stop and explain the playbook is available once the simulation has produced a final plan. Then read everything: `catalyst_state.json` (full verdict history, rounds, overrides), `rollout_plan_FINAL.md`, everything under `responses/` if present, and the git log (`git log --oneline`) which shows the re-planning story.

Sections:

1. **The story arc** — a timeline: starter state → baseline plan → the Gauntlet rounds (all five stakeholders at once) → Curveball 1 → Gate 1 rounds (how many tries, what the stakeholders objected to, verbatim) → Curveball 2 → Gate 2 rounds → final gate → board-ready. Include override flags honestly if any. Build the timeline from whatever `gates` actually contains: Curveball 2 is optional, so if `gate_2` never left `locked`, omit those two steps rather than showing them as gaps — and don't imply the run was incomplete.
2. **The stakeholder ledger** — per persona: every objection they raised across all rounds and how the final plan answers it. This is the Q&A record — "all the questions that were asked, and the answers."
3. **The final plan** — `rollout_plan_FINAL.md` rendered in full.
4. **The decisions register** — the content of each file under `responses/`, under its own headings. Those headings vary by gate (the Gauntlet is per-stakeholder; the curveball gates follow Mission Control's fields), so read what's actually there rather than assuming a fixed shape.
5. **Take it home — the four answers** — see below.
6. **Run it for real** — how to re-run this against their own org (`/catalyst:start my-company` in a fresh folder → intake → `/catalyst:assess` → `/catalyst:plan` → `/catalyst:stress-test`), and the honest note that the same stakeholder pressures — regulator, CFO, security, skeptical engineers — are exactly the gates their real rollout must pass.

## Advisory mode

The equivalent artifact for their real company: the thing they forward to their sponsor, not a workshop souvenir. Read whatever exists — `COMPANY_PROFILE.md`, `MATURITY_ASSESSMENT.md`, `ROLLOUT_PLAN.md`, anything under `responses/`, and the git log. Work with what's there rather than demanding the full set:

- No `ROLLOUT_PLAN.md` → stop and offer `/catalyst:plan`; there's no artifact to compile without a plan.
- No `COMPANY_PROFILE.md` or `MATURITY_ASSESSMENT.md` → build the playbook anyway, and say in one line which section is thinner because that input is missing.
- No stress-test on record → compile it, and close the stakeholder section with the plain recommendation to run `/catalyst:stress-test` before this goes to anyone who can say no. Don't invent objections the panel never made.

Sections:

1. **Where you stand** — the maturity placement from `MATURITY_ASSESSMENT.md`: the pillar table, the blocking gap, the sequencing call. This replaces the simulation's timeline — the arc that matters here is theirs, not the exercise's.
2. **The stakeholder ledger** — the stress-test panel's objections and open questions per persona, verbatim, with how the plan answers each (or an honest "not yet answered" where it doesn't). These are the questions their real CFO, CRO, CISO, and staff engineers will ask; the value is that they've seen them early.
3. **The plan** — `ROLLOUT_PLAN.md` rendered in full.
4. **The company profile** — `COMPANY_PROFILE.md` rendered, gap markers (`[UNKNOWN — affects X]` / `[NEEDS INPUT]`) preserved rather than tidied away. The gaps are half the message.
5. **The four answers** — see below.
6. **Keep it moving** — what to re-run when conditions change: the workshop lesson is that plans are regenerable artifacts, so name the commands (`/catalyst:plan` to re-cut a section, `/catalyst:stress-test` before each real review) rather than implying this HTML file is final.

## The four answers (both modes)

Draft each from the run rather than from generic advice, and mark them clearly as a starting point the reader must make their own:

- **One decision your org must make** — the real decision, with scope and a deadline: the equivalent of their wave-1 call.
- **One owner** — a named person or an existing role. Not a committee to be formed.
- **One missing piece of evidence** — what they don't have today that this proved they need: census, survey, baselines, policy, classification map. In simulation, draw on what the run kept tripping over; in advisory, draw on the profile's gap markers and the assessment's blocking pillar.
- **One 30-day action** — small enough to survive their calendar, real enough that a colleague could verify it happened.

---

*Workshop: this is **Take It Home** in Mission Control — the four answers map to its four fields. See [WORKSHOP_MAP.md](../WORKSHOP_MAP.md).*
