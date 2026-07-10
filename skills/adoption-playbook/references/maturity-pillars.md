# Adoption Maturity Pillars

> Working draft — align pillar names/count with Anthropic's official adoption maturity framework before external use.

Score each pillar independently; orgs are always uneven. The stage names run: **Exploring → Piloting → Scaling → Operating → Transforming**.

## Pillar 1 — Leadership & Mandate

| Stage | Looks like |
|---|---|
| Exploring | Individual enthusiasm; no sponsor; shadow usage |
| Piloting | A named sponsor funds a bounded pilot |
| Scaling | Exec mandate with budget, a program owner, and a board-visible goal |
| Operating | Adoption goals in division leaders' objectives; funded Year-2 plan |
| Transforming | AI-assisted engineering is the default operating assumption in planning |

Failure mode: a mandate without an owner ("everyone should use it") or an owner without a mandate (an enablement lead with no budget or air cover).

## Pillar 2 — Technical Readiness & Platform

Exploring: individual accounts, no controls. Piloting: enterprise tenant for the pilot group. Scaling: SSO/SCIM, managed settings, egress and audit wiring, usage reporting feeding a dashboard. Operating: self-service provisioning by policy tier; CLAUDE.md conventions standardized per repo family. Transforming: internal plugin/skill ecosystem; agents embedded in CI and internal tools.

See `technical-readiness.md` — this pillar is the most common hard blocker.

## Pillar 3 — Governance & Risk

Exploring: no policy (or a blanket ban being quietly ignored). Piloting: exception-based approval for the pilot. Scaling: a written AI-tooling policy with data-handling tiers; risk/security signed the rollout plan. Operating: proportionate controls per system criticality; audit evidence produced routinely, not scrambled. Transforming: governance treated as a competitive asset — the org can explain its AI controls to a regulator or client on demand.

Failure modes in both directions: no governance (rollout freezes at the first incident or exam) and over-rotation (controls sized for the riskiest system applied to everyone, so adoption dies).

## Pillar 4 — Enablement & Adoption

Exploring: self-taught early adopters. Piloting: hand-picked cohort with white-glove support. Scaling: differentiated training by division/seniority, champion network with real backfill, opt-in waves riding enthusiasm. Operating: in-repo enablement (CLAUDE.md, curated commands) makes the good path the easy path; adjacent roles (BAs, QA, quants, PMs) have their own track. Transforming: teams design their own workflows; enablement shifts from teaching the tool to curating patterns.

## Pillar 5 — Measurement & ROI

Exploring: anecdotes. Piloting: pilot measured against a baseline (if not — the pilot bought nothing). Scaling: leading + lagging metrics per wave, a falsifiable executive checkpoint, honest haircuts on extrapolation. Operating: adoption and impact metrics reviewed like any other business KPI; measurement drives wave adjustments. Transforming: ROI conversation shifts from "is the tool worth it" to "which workflows do we redesign next."

See `measurement-framework.md`.

## Using the pillars

- **Assessment:** place the org per pillar with evidence, then name the single next milestone per pillar. The gap pattern matters more than the average — a Scaling org with Exploring-stage governance is one incident from a freeze.
- **Sequencing:** the lagging pillar sets the safe speed. Scaling adoption past governance or measurement creates the two classic program-killers: the surprise stakeholder and ROI theater.
