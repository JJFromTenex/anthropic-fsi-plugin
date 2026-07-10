---
name: adoption-playbook
description: The Claude Code enterprise-adoption knowledge base for Project Catalyst. Load when assessing an organization's adoption maturity, designing rollout waves, building governance/measurement/champion frameworks, advising on change management for AI coding tools, or when any catalyst command needs the frameworks. Covers maturity pillars, rollout phases, technical readiness, measurement, champions, resistance personas, and governance patterns.
---

# The Adoption Playbook

How organizations successfully scale Claude Code from a pilot to the whole engineering org — and the failure modes that stall them. This is the shared knowledge base behind both Catalyst modes: in simulation it calibrates what "good" looks like; in advisory it's the substance of the advice.

## The one-paragraph thesis

Claude Code rollouts don't stall on the tool — they stall on the org. The blockers are predictable: an unmapped stakeholder (security, risk, works council) appears mid-rollout; nobody baselined metrics so ROI becomes theater; enablement is a 30-minute video so the cautious majority never converts; governance either doesn't exist (rollout frozen) or over-rotates (nobody can use the thing). The playbook is to treat the rollout itself as a program with data, owners, gates, and regenerable artifacts — and to use Claude Code itself as the program's analyst, modeler, and writer, which is also how leaders discover its value beyond engineering.

## References — load what the task needs

| File | Use when |
|---|---|
| `references/maturity-pillars.md` | Assessing where an org stands; structuring an assessment or opening presentation |
| `references/rollout-phases.md` | Sequencing pilot → waves → scale; wave design |
| `references/technical-readiness.md` | The pre-flight checklist — "the thing that blocks everybody" |
| `references/measurement-framework.md` | ROI frameworks, checkpoints, metric anti-patterns |
| `references/champion-model.md` | Champion selection, wave staffing, enablement shape |
| `references/resistance-personas.md` | Skeptics, holdouts, and what actually converts each |
| `references/governance-patterns.md` | Regulated-industry controls: tiers, validation, attestation, logging |

## The point of view (and its limits)

This playbook favors Anthropic's approach where it genuinely fits: Claude Code-native patterns (CLAUDE.md conventions, managed settings, slash commands, sub-agents), enterprise controls (SSO, zero-retention agreements, audit logging), and the operating-model insight that regenerable artifacts beat static documents.

The limits are part of the POV: never oversell. Name real prerequisites, real costs, real risks, and what the tool does not do well. In regulated industries, credibility is the license to operate — advice that reads like a brochure gets the whole program discounted. When a recommendation is Anthropic-specific, say so; when it's tool-agnostic change management, say that too.

> Framework provenance note: the maturity pillars here are a working draft aligned to Anthropic's in-development adoption maturity framework. Before using pillar names/counts in external-facing material, confirm alignment with the current Anthropic version.
