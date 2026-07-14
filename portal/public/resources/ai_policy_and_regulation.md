# Meridian AI Policy and Regulatory Brief

## Executive context

Meridian operates under OCC, FCA, MAS, GDPR, and local works-council requirements. Claude Code may be deployed only through the enterprise tenancy and approved engineering controls.

## Current controls

- Enterprise tenancy is required; provider terms must prohibit training on Meridian data.
- Customer PII, payment-card data, and material non-public information may not be entered into prompts.
- Restricted repositories require an approved data-protection impact assessment before external AI processing.
- Prompt and completion logs are retained for at least 90 days in a Meridian-controlled store.
- AI-assisted commits require a documented provenance mechanism.
- Claude Code may not write directly to production branches or pipelines without change-approval controls.
- Exceptions require written, time-limited CISO approval.

## Regulatory expectations

- Leaders must demonstrate proportional controls based on system criticality and data classification.
- Human accountability for reviewed and merged code remains with Meridian employees.
- Audit evidence must connect policy, access, training, usage, review, and incident response.
- Works-council consultation must precede deployment to covered European populations.

## Open leadership questions

- Which populations can move quickly under existing controls?
- What must be operational before critical-function engineering receives access?
- Who may inspect usage and prompt telemetry, and for what purpose?
- Who owns the authority to pause or resume deployment?
- Which policy amendments are necessary, and which prohibitions remain absolute?

This brief is intentionally incomplete. Teams should identify assumptions and decide which additional evidence they require.
