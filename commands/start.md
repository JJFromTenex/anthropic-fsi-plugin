---
description: Start Project Catalyst locally and optionally pair this workspace with a hosted workshop team
argument-hint: "simulation [--portal URL --workshop CODE --team ID --token TOKEN] | my-company"
---

# /catalyst:start

Normalize `$ARGUMENTS`. `my-company` and `advisory` continue into the existing `/catalyst:my-company` flow. Everything below applies to simulation mode.

## Guards

- If `catalyst_state.json` exists, show `/catalyst:status` and stop.
- If the directory contains unrelated files, explain that Catalyst creates a small team workspace and require confirmation.

## Scaffold the lean workspace

Copy only the neutral workshop materials:

```bash
cp "${CLAUDE_PLUGIN_ROOT}/scenario/CLAUDE.md" .
cp "${CLAUDE_PLUGIN_ROOT}/scenario/README.md" .
cp -R "${CLAUDE_PLUGIN_ROOT}/scenario/templates" .
cp -R "${CLAUDE_PLUGIN_ROOT}/scenario/.claude" .
mkdir -p evidence .catalyst
cp "templates/rollout_plan_TEMPLATE.md" rollout_plan_FINAL.md
```

Do not scaffold `scenario/data/`, `scenario/docs/`, `scenario/curveballs/`, or facilitator material. Attendees choose evidence from the hosted Intelligence Library.

## Optional hosted pairing

Parse these plain-text options when present: `--portal`, `--workshop`, `--team`, `--token`. Never execute option values as shell fragments.

If all four are present, write `.catalyst/connection.json`:

```json
{
  "portal_url": "<URL>",
  "workshop_code": "<CODE>",
  "team_id": "<ID>",
  "team_token": "<TOKEN>"
}
```

Add `.catalyst/connection.json` to `.gitignore`. Run the bundled sync helper and confirm the workshop stage without printing the token:

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/catalyst_sync.py" pull
```

If pairing details are absent, continue in local/offline mode and point to `/catalyst:sync` when the team is ready to connect.

## State

Write `catalyst_state.json`:

```json
{
  "version": 2,
  "mode": "simulation",
  "started_at": "<UTC timestamp>",
  "active_round": 1,
  "curveball_revealed": false,
  "reviews": []
}
```

Initialize git when needed, commit the starter state, and deliver the CTO mandate. Explain that the first task is not to fill every section: it is to determine what evidence the board’s questions require.
