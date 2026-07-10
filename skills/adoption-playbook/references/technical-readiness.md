# Technical Readiness — the thing that blocks everybody

Rollouts rarely stall on model quality. They stall on an unmapped stakeholder or an unwired platform dependency discovered mid-wave. Run this checklist before Wave 1; every unchecked item is a future emergency.

## 1. Stakeholder map — named people, not departments

- [ ] Security / CISO office — owns the AI-tooling policy and egress posture
- [ ] Risk / model-risk function — regulated industries: owns validation requirements
- [ ] Legal & privacy / DPO — data-handling terms, DPIA paths, cross-border transfer
- [ ] Works councils / employee representation — telemetry and monitoring consultation (EU especially; this is a calendar item with statutory lead time)
- [ ] Finance — owns the checkpoint that can pause the program; agree the metric *before* spending
- [ ] Procurement / vendor management — contract terms: zero data retention, no training on customer code, audit rights
- [ ] Internal comms / HR — the job-security narrative will be written by someone; better it be you
- [ ] The skeptic bench — the respected senior engineers who haven't bought in; they're stakeholders, not obstacles

Test: for each row, can you name the person and the date they saw the plan? "We'll loop them in when needed" is how programs freeze at Month 2.

## 2. Platform wiring

- [ ] Enterprise tenant with SSO/SCIM provisioning (and deprovisioning)
- [ ] Managed settings / policy configuration deployed by cohort tier (permissions, allowed tools, model access)
- [ ] Network path approved: egress/proxy rules, TLS inspection stance documented
- [ ] Prompt caching enabled and verified — routinely missed, materially affects cost and latency at scale
- [ ] Audit logging to the org's own store, retention configured per policy tier
- [ ] Usage/adoption telemetry flowing into reporting the program team can query — you cannot manage a wave you cannot see
- [ ] Seat/licensing model matched to the wave ramp (active-seat ramp, not full-population flat)

## 3. Working-environment readiness

- [ ] CLAUDE.md conventions defined for the major repo families (context, build/test commands, standards)
- [ ] Data-handling rules published in developer-facing language: what can and cannot go in a prompt, per repo classification
- [ ] Provenance convention for AI-assisted commits (tag/trailer), if policy requires one
- [ ] Review policy stated: AI-assisted code meets the same review bar; engineers stay accountable
- [ ] Support path: champions channel, office hours, escalation to the program team

## 4. Evidence wiring

- [ ] Baseline metrics captured per wave cohort *before* onboarding (see `measurement-framework.md`)
- [ ] The executive checkpoint defined in writing: metric, population, target, date, decision rule

## Reading the checklist

Sections 1 and 4 are the ones orgs skip; they're also the two that kill programs. Section 2 is where "we'll be live next month" quietly becomes a quarter. If an org can't check "usage telemetry" and "baseline captured," it is not ready to scale — it's ready to pilot again, bigger and blinder.
