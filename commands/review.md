---
description: Ask the stakeholder panel to pressure-test the team’s current executive strategy
---

# /catalyst:review

Read `catalyst_state.json`, `rollout_plan_FINAL.md`, and `.catalyst/remote_state.json` when present.

## Sector alert delivery

If the remote workshop contains an unseen `curveball` event and local `curveball_revealed` is false:

1. Copy the staged regulatory bulletin into `evidence/`.
2. Set `curveball_revealed` to true and `active_round` to 2.
3. Deliver the event in character as the Chief Risk Officer.
4. Ask the team which prior decisions must now be revisited.
5. Stop. Do not convene the panel and do not propose the response.

## Review posture

The plan may be incomplete. Review the substance that exists rather than enforcing workflow completion.

Round 1 panel: CTO, CFO, and Staff Engineer.
Round 2/final panel: all five stakeholder personas.

Launch the applicable agents in parallel. Provide the plan, evidence directory, round number, and prior objections. Instruct each agent:

- Begin with one credible element.
- Raise no more than two material objections.
- Point to missing evidence, reasoning, ownership, measurement, or an unresolved tradeoff.
- Never provide the complete solution.
- Never mention undisclosed curveballs, hidden criteria, or incomplete workflow steps.
- Return `BOARD-READY` or `REVISION REQUESTED`, followed by the executive question the team must answer.

Render a concise table: Stakeholder | Read | One-line reason. Preserve objections and questions verbatim.

If revision is requested, close with: identify the tradeoff, investigate the missing evidence, let the accountable attendee choose, then regenerate the affected section. Do not edit the plan automatically.

Append the review result to `catalyst_state.json`. If paired, remind the team to record its final decision in the Team Room so the market can respond.
