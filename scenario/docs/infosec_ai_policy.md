# Meridian InfoSec Policy 14.7 — AI-Assisted Development Tooling (v2.3)

**Owner:** CISO Office · **Effective:** Current · **Review cycle:** Annual

## 1. Scope
Applies to any tool that uses machine learning to generate, complete, review, or modify source code, configuration, or infrastructure-as-code within Meridian environments.

## 2. Approved deployment models
2.1 Only **enterprise-tenanted** deployments with contractual data-handling terms are permitted. Consumer/free tiers are prohibited.
2.2 All traffic must route via Meridian's egress proxy with full TLS inspection.
2.3 Model providers must attest to **zero retention** of Meridian prompts and outputs, and **no training** on Meridian data.

## 3. Data handling
3.1 Source code from repositories classified **Restricted** or **Highly Restricted** may not be transmitted to any external AI service without a Data Protection Impact Assessment (DPIA) approved by the DPO.
3.2 Customer PII, payment card data, and material non-public information (MNPI) are **prohibited** from any AI tool prompt under all circumstances.
3.3 Prompt and completion logs must be retained for **90 days minimum** in a Meridian-controlled store for audit.

## 4. Code provenance & review
4.1 AI-generated code is subject to the **same review requirements** as human-authored code — no exceptions.
4.2 Commits containing AI-generated content **should** be tagged for provenance (mechanism TBD by Engineering Standards).
4.3 AI tools may not be granted **write access** to production branches, deployment pipelines, or infrastructure without explicit CAB approval.

## 5. Acceptable use
5.1 Engineers remain **fully accountable** for code they commit, regardless of authorship.
5.2 AI tools must not be used to generate code intended to circumvent security controls, licensing obligations, or regulatory requirements.

## 6. Exceptions
Exceptions require written CISO approval and are time-bound (max 90 days).

---
*Note to Catalyst team: this policy predates the pilot. Sections 3.1 and 4.2 are known friction points — Engineering Standards has an open RFC. You may propose amendments as part of your governance section, but assume v2.3 is binding until amended.*
