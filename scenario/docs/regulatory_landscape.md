# Regulatory Landscape — AI in Software Development (Meridian jurisdictions)

**Prepared by:** Regulatory Affairs · **For:** Project Catalyst · **Status:** Informational

## United States — OCC / FRB / SEC
- **SR 11-7 (Model Risk Management):** Historically applied to quantitative models. OCC has signaled it *may* extend to generative AI used in "material business processes." No formal guidance yet on code-generation tools specifically.
- **SOX 404:** AI-assisted changes to financial reporting systems fall under existing change-control attestation. No new obligation, but auditors are asking questions.
- **SEC cyber disclosure rules:** Material AI-related incidents in trading or reporting systems would be disclosable.

## United Kingdom — FCA / PRA
- **PS21/3 (Operational Resilience):** Important Business Services must have impact tolerances. AI tooling that touches IBS code inherits those tolerances.
- **FCA AI discussion paper:** Principles-based; emphasizes accountability, governance, and consumer outcomes. Expects firms to be able to explain AI-influenced decisions — arguably includes AI-influenced code paths in customer-facing systems.

## Singapore — MAS
- **FEAT principles + Veritas framework:** Fairness, Ethics, Accountability, Transparency. MAS has been proactive; expects board-level AI governance.
- **Technology Risk Management Guidelines:** Change management for critical systems already stringent; AI-generated code is not exempted.

## European Union — GDPR / EU AI Act
- **GDPR:** Source code containing personal data (e.g., in test fixtures, logs) transmitted to an AI service is a cross-border transfer. DPIA + SCCs required.
- **EU AI Act:** Code-generation tools are currently *not* classified high-risk in themselves, but downstream systems (credit scoring, fraud) may be. Provenance obligations for general-purpose AI apply to the vendor, not Meridian.
- **Works Councils (Ireland/EU):** Introduction of workplace monitoring or productivity tooling requires consultation. Usage telemetry from Claude Code likely qualifies.

## India — RBI / DPDP
- **RBI IT Framework:** Outsourcing and third-party risk rules apply to SaaS AI tooling.
- **DPDP Act:** Cross-border data transfer restrictions; relevant if Pune-based repos contain Indian customer data.

## Practical read for Catalyst
- Nothing currently *prohibits* enterprise AI coding tools in any Meridian jurisdiction.
- The consistent theme: **accountability stays with the firm**, change control doesn't get lighter, and audit trail expectations go *up*.
- Highest-friction populations: anything touching payments rails, trade execution, regulatory calc engines, and EU-resident staff (consultation lead time).
