# Measurement & ROI Framework

"Ruthlessly measure" operationalized. The scoreboard has two halves and a discipline.

## Leading indicators (is adoption happening?)

- Weekly active users / % of provisioned seats active in the last 7 and 30 days
- Sessions per engineer per week; depth signals (multi-turn sessions, agent/tool usage vs. one-shot Q&A)
- Suggestion/diff acceptance rates where measurable
- Champion-channel activity; office-hours demand
- Cohort retention: of the engineers active in week 1, how many are active in week 6? (Stalled pilots show up here first — a launch spike then decay is the classic silent failure)

## Lagging indicators (is it working?)

- PR cycle time (open → merge), review-rework rate, time-to-first-review
- Throughput per team (PRs/week) — always paired with a quality metric, never alone
- Incident/defect rates on AI-assisted vs. baseline changes (also your zero-Sev-1 evidence)
- Onboarding time-to-first-merge for new joiners
- Developer satisfaction (NPS or survey delta), attrition signals in heavy-use teams

## The discipline

1. **Baseline before rollout, per cohort.** The single most common failure: no before, so there is no after. Baseline each wave in the weeks before its onboarding — not org-wide once, since waves differ structurally.
2. **Haircut pilot extrapolation, and say so.** Pilot cohorts are self-selected and supported. Extrapolating a pilot's 22% improvement to the whole org unhaircut is how CFOs learn to distrust the program. State the haircut (commonly 40–60% of pilot effect for planning) and let results beat it.
3. **Make the checkpoint falsifiable.** "Show measurable value at 90 days" becomes: *metric M for population P, baselined at B, target T, measured from source S, reviewed on date D, with decision rule R (including what happens on a miss).* If the checkpoint can't fail, it can't succeed either.
4. **Match evidence speed to checkpoint speed.** Lagging metrics need months; a 90-day checkpoint should therefore lean on leading indicators plus the fastest lagging metric (cycle time) for the earliest waves — and say exactly that, in advance.
5. **Segment results.** Aggregates hide everything. Report by division/wave/seniority; find the outlier team with 90%+ retention and study it — the internal playbook is usually already written somewhere in the org.

## Anti-patterns (refuse these)

- **Lines of code generated** — measures noise, incentivizes bloat; declining it is a credibility signal with engineers and CFOs alike
- **% of code written by AI** as a target — a vanity ratio that punishes review discipline
- **Unbaselined before/after claims** — theater
- **Aggregate-only reporting** — hides the stalled half of the org behind the enthusiastic half
- **Surveilling individuals** — metrics are for cohorts and programs; individual prompt-log review destroys the trust adoption depends on (and may trigger works-council obligations)

## The ROI narrative

Value = (time returned × loaded cost) + quality effects (rework avoided, incidents avoided) + cycle effects (faster delivery of priced work) − program cost. Present all assumptions inline, use conservative bounds, and always include the qualitative line execs actually retain: what engineers *did* with the returned time. Adjacent roles (analysts, QA, quants, PMs) often produce the fastest visible wins in the whole program — hours-not-days enablement, immediately observable output. No public peer has published a rigorous ROI methodology; an org that does owns the conversation with its board and its regulator.
