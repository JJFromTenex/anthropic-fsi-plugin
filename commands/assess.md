---
description: "Advisory mode: assess your organization's Claude Code adoption maturity — placement, gaps, and the next milestone per pillar"
---

# /catalyst:assess

Requires `COMPANY_PROFILE.md`. If it is missing, stop, explain that the intake has to run first, and offer to start `/catalyst:my-company` now.

Load the `adoption-playbook` skill; the maturity pillars and technical-readiness references are the scoring framework.

1. Assess the org against **each maturity pillar** (Leadership & Mandate, Technical Readiness & Platform, Governance & Risk, Enablement & Adoption, Measurement & ROI — per the skill's reference). For each: current stage, the evidence from their profile, and the single next milestone that moves them one stage.
2. Run the **technical-readiness checklist** explicitly — it's the thing that blocks everybody: stakeholders mapped (security, risk, legal, works councils, finance — named people, not departments), platform wiring (SSO, managed settings, audit logging, usage reporting), policy in place, data-handling tiers defined.
3. Be honest about sequencing: name the pillar that will actually block them first, and what breaks if they scale before fixing it.
4. Anthropic-POV rule: favor Claude Code-native patterns where they genuinely fit (CLAUDE.md conventions, managed policy settings, enterprise controls) — but name real prerequisites and real costs. Credibility over cheerleading; this assessment is worthless if it reads like a brochure.

Write the result to `MATURITY_ASSESSMENT.md`: a placement table (pillar | stage | evidence | next milestone), the gap list in priority order, and a "what to do in the next 30 days" close. Then point to `/catalyst:plan`.
