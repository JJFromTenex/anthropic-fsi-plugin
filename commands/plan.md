---
description: "Advisory mode: generate your organization's tailored rollout plan — same six-section shape the workshop battle-tested"
---

# /catalyst:plan

Requires `COMPANY_PROFILE.md`; use `MATURITY_ASSESSMENT.md` and any real data in `data/` if present (run intake/assessment first if missing — offer to).

Load the `adoption-playbook` skill.

Generate `ROLLOUT_PLAN.md` in the same six-section shape the workshop uses — it's battle-tested against a CRO, a CFO, a CISO, and a skeptical staff engineer:

1. **Wave Design** — sequenced from their actual org shape (real census if provided), riding enthusiasm, respecting regulatory/works-council lead times, with headcounts that sum.
2. **Change & Adoption** — champion model with backfill honesty, differentiated training, comms plan, and a concrete answer for their skeptics (including the prompt-log-privacy question — someone will ask it).
3. **Governance & Guardrails** — proportionate tiers from their regulatory posture; reconcile with their existing AI policy or draft the skeleton of one; provenance, retention, access controls.
4. **ROI Framework** — baseline-before-rollout, leading + lagging metrics, a specific falsifiable checkpoint their CFO would accept, anti-patterns named.
5. **Budget Allocation** — ramped seats, enablement, platform, governance, contingency; real numbers where the profile gives them, labeled assumptions where it doesn't.
6. **Risk Register** — top 5 with likelihood, impact, mitigation, owner — including at least one they told you about and one they didn't (the one the workshop teaches: the buried landmine — geo/timezone exclusion, the policy conflict, the stalled-pilot outlier).

Every recommendation grounded in their profile or their data — cite which. Mark gaps `[NEEDS INPUT]` rather than inventing facts. Anthropic-POV, honestly: recommend Claude Code-native patterns where they fit, name prerequisites and costs where they don't.

Close by pointing at `/catalyst:stress-test` — "before your real stakeholders read this, let the panel do it."
