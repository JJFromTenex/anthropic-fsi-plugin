# Governance Patterns for Regulated Industries

Governance is not friction on the rollout — in FSI/healthcare, it *is* the rollout. Peers lead with governance in external comms because it's the license to operate. The craft is proportionality: controls sized to system criticality, so the regulated tier is defensible and the standard tier still moves.

## Pattern 1 — Criticality tiers (the two-track structure)

Classify systems (not people): **critical/regulated** (payments rails, trade execution, real-time risk, regulatory calc, core ledger, PHI systems) vs. **standard**. Engineers inherit the tier of the systems they touch. Each tier gets its own control set and rollout speed. The cardinal sin in both directions: gating everyone behind the critical tier's controls (adoption dies), or letting the standard tier's speed leak heavy-control work into production (the program dies at the first exam).

## Pattern 2 — Model-risk validation (SR 11-7-style)

For the critical tier, expect the model-risk function to require validation before production use: documented scope of use, evaluation evidence on representative internal code, failure-mode analysis, and human-oversight controls. Program moves: treat validation as a workstream with an owner and a calendar slot *before* the critical tier's first wave; run it concurrently with standard-tier waves; scope it to the use (code assistance with mandatory human review), not to "the model in general" — over-scoped validations never finish.

## Pattern 3 — Attestation (human accountability, operationalized)

Where required (or chosen as policy): a named engineer certifies review and understanding of AI-assisted changes merged to critical production branches. Make it real, not ceremonial: a PR-template checkbox + commit trailer captured in the audit trail, wired into the existing review flow (a second full review process kills throughput and gets bypassed). The principle behind it is universal and worth stating in every policy: **AI-generated code meets the same review bar as human code, and the committing engineer stays accountable.**

## Pattern 4 — Audit trail & log retention

Tiered retention: standard tier per existing policy (often 90 days); critical tier per regulatory expectation (12-month immutable is a common ask) in an org-controlled store. Two design rules: (a) reconcile the tiers *explicitly* in policy — a plan that promises 12-month retention while the standing policy says 90 days without an amendment is self-contradicting; (b) publish the **access policy** with the retention policy — logs exist for audit and security, not manager review of individuals; saying so in writing is what makes engineers accept the logging at all.

## Pattern 5 — Data-handling tiers

Map repo/data classifications to AI-tool rules developers can actually follow: open/internal code → allowed; restricted code → allowed with conditions (DPIA or equivalent sign-off, possibly project-scoped); customer PII / card data / MNPI in prompts → prohibited, full stop, with the enforcement story stated. Pair with the contractual layer: enterprise terms with zero data retention and no training on customer code — necessary, but not sufficient; internal handling rules still apply.

## Pattern 6 — Provenance

If policy or regulator expects it: a lightweight commit-trailer convention (`AI-Assisted: yes` or tool-emitted metadata) rather than heavyweight tooling. Its value is audit-answerability ("show me your AI-assisted changes to system X"), not blame.

## Pattern 7 — Policy amendment as a feature

Most orgs have a pre-AI-era tooling policy that half-blocks the rollout. The wrong moves are silent violation and indefinite exception. The right move: propose specific amendments with justification (the tiering, the retention split, the provenance mechanism), time-boxed exceptions only as a bridge while amendments land. Security owners who co-author amendments defend them.

## Pattern 8 — The regulator conversation

Assume you will explain the program to a supervisor or examiner. Keep an evidence pack current: policy + amendments, validation records, attestation samples, log-retention proof, incident correlation stats, adoption/impact reporting. Programs that can produce this on demand get treated as mature; programs that scramble get remediation letters. Drafting and maintaining this pack is itself an excellent Claude Code use case — which is the program eating its own cooking.
