---
description: Synchronize the local Catalyst workspace with its hosted workshop room
argument-hint: "[pull]"
---

# /catalyst:sync

Require `.catalyst/connection.json`. If it is absent, explain that the team must pair from the hosted Team Room first.

Run:

```bash
python3 "${CLAUDE_PLUGIN_ROOT}/scripts/catalyst_sync.py" pull
```

Read `.catalyst/remote_state.json` and report only:

- Current workshop stage
- Whether the room is paused
- New facilitator hints or clues
- New sector or market events

Never print the team token or the full connection file.
