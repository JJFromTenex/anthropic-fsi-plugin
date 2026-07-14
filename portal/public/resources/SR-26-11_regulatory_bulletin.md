# REGULATORY BULLETIN — URGENT

**From:** Marcus Webb, Chief Risk Officer
**To:** AI Enablement Office; CTO; CISO
**Re:** OCC/FCA Joint Supervisory Letter SR 26-11 — immediate applicability to Catalyst

---

The OCC and FCA have this morning jointly issued **Supervisory Letter SR 26-11: *AI-Assisted Code Generation in Critical Financial Infrastructure***. Regulatory Affairs' summary is below; full text is on the RegDesk.

## What SR 26-11 requires

For any AI code-generation tool used on systems classified as **"critical function"** — defined as payments processing, trade execution, real-time risk and margin, regulatory calculation engines, and core ledger — firms must:

1. **Model-risk validation** of the AI tool under an SR 11-7-equivalent framework, signed off by an independent Model Risk function, before production use.
2. **Human attestation** on every AI-suggested change merged to a production branch of a critical-function system — a named engineer certifies review and understanding.
3. **12-month retention** of prompt/completion logs for critical-function repos (vs. our current 90-day standard), in an immutable store.
4. **Quarterly reporting** to the supervisor on AI-assisted change volume and incident correlation.

Effective date: **immediately** for new deployments. 90-day remediation window for anything already live.

## What this means for Catalyst

I've had the Risk Data team flag every engineer whose primary system-of-record is critical-function. The updated `data/developer_census.csv` now includes a `critical_function` column. Rough count: **~4,900 of the 10,000** are in scope.

To be direct: I will not sign off on a rollout plan that puts Claude Code in front of critical-function engineers without items 1–3 above operationalized first. The Board will ask me, and I will tell them.

This does **not** block the ~5,100 engineers outside critical-function scope. Move as fast as you like there.

I need to see a revised governance section and wave sequence that reflects this. Today.

— MW
