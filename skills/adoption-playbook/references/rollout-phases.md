# Phases of Rollout & Wave Design

## The phase arc

1. **Pilot (30–90 days).** Small (50–300), instrumented, honest. Purpose is evidence, not victory: baseline first, measure against it, include at least one hard cohort (legacy estate, regulated system) or accept that skeptics will call it cherry-picked — because they will.
2. **Foundation (in parallel with late pilot).** Technical readiness checklist (see `technical-readiness.md`), policy written, stakeholders signed, champions recruited, measurement wired. The phase orgs skip, and then re-run under duress mid-rollout.
3. **Waves (the scale phase).** Population segmented into onboarding waves. Each wave: pre-baseline → onboard → champion support → measure → publish results to the next wave. Published wins are the conversion engine for the cautious middle.
4. **Operate.** Provisioning by policy, enablement in-repo, metrics on a dashboard, a Year-2 plan for deepening (agents, CI integration, adjacent roles) rather than just seat count.

## Wave design rules

- **Segment on data, not politics.** Division × location × seniority × sentiment × risk posture. A 10,000-person census is a Claude Code job, not a spreadsheet-by-eye job.
- **Ride enthusiasm early.** First waves from high-excitement, low-risk-posture populations (platform/DevEx teams are the classic Wave 1): fast wins, low governance friction, visible proof.
- **Gate, don't block, the regulated tier.** Split standard vs. critical/regulated tracks. The standard track moves at enthusiasm speed; the regulated track moves at validation speed. One track's constraints must never set the other track's pace.
- **Respect structural lead times.** Works-council consultation, DPIA approvals, model-risk validation are calendar items with owners — sequence waves so the clock runs concurrently, not serially.
- **Check the map for landmines.** Timezones and follow-the-sun teams (a training calendar in HQ time silently strands them), contractors vs. employees, license true-ups, holiday windows. Stress-test the schedule against the roster — literally ask Claude to find who the plan excludes.
- **Headcounts must sum.** Every person in the census lands in exactly one wave (or an explicit exclusion with a reason). Plans whose wave table doesn't add up get destroyed by the first numerate stakeholder.
- **Adjacent roles are a track, not an afterthought.** BAs, QA, quants, technical PMs, SRE: cheap to enable (hours, not days), near-zero governance overhead, highly visible output — often the best early-ROI evidence in the whole program.

## Re-planning (the operating-model lesson)

Conditions change mid-rollout — a regulation, a budget cut, a reorg. Teams whose plan is a static document rewrite for a week; teams whose plan is regenerable (data queries + templates + prompts) re-run it in minutes. Build the plan as an artifact Claude Code can regenerate section-by-section when an input changes. This is the single most transferable practice in the playbook.
