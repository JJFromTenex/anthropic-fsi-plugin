# Project Catalyst — FSI Executive Simulation

Project Catalyst helps senior leaders practice the decisions required to deploy Claude Code across a financial institution. Teams compete as fictional banks, investigate shared evidence, make executive decisions, face stakeholder pressure, and respond to a sector-wide shock.

The experience is designed for a 90-minute facilitated workshop. It is light enough to run confidently and substantive enough to teach evidence-led sequencing, proportionate governance, credible ROI, and workforce trust.

## Participant flow

1. Enter the hosted workshop code.
2. Create or join a fictional bank.
3. At each stage, choose a concrete way to contribute—investigate data, test assumptions, map constraints, or synthesize the decision.
4. Pull resources from the Intelligence Library.
5. Analyze them with Excel, Claude, or both.
6. Add findings and lock an evidence-backed decision.
7. Run `/catalyst:review` in the shared Claude workspace.
8. Revise when the sector-wide alert changes the conditions.
9. Complete the board review and real-company action card.

Contributions reset with each stage, so nobody is locked into a persona. The driver facilitates; attendees investigate, prompt Claude, debate, and decide.

## Install the Claude Code plugin

```text
/plugin marketplace add JJFromTenex/anthropic-fsi-plugin
/plugin install catalyst@catalyst
```

From the team room, copy the generated pairing command into the shared Claude Code workspace. The hosted portal remains the shared room state; local plans and evidence remain in the team workspace.

## Core commands

| Command | Purpose |
|---|---|
| `/catalyst:start` | Create and optionally pair the team workspace |
| `/catalyst:sync` | Pull the current workshop stage, hints, and market events |
| `/catalyst:review` | Pressure-test the current strategy without supplying the answer |
| `/catalyst:status` | Show the current decision, evidence, and next useful action |
| `/catalyst:pitch` | Prepare the final board position |
| `/catalyst:playbook` | Compile the local decision and review record |

The original advisory commands remain available for post-workshop work against a participant’s real organization.
