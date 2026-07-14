#!/usr/bin/env python3
"""Pull safe workshop state into a paired Project Catalyst workspace."""

from __future__ import annotations

import json
import sys
import urllib.parse
import urllib.request
from pathlib import Path


def main() -> int:
    if len(sys.argv) < 2 or sys.argv[1] != "pull":
        print("Usage: catalyst_sync.py pull", file=sys.stderr)
        return 2

    connection_path = Path(".catalyst/connection.json")
    if not connection_path.exists():
        print("No hosted workshop connection found.", file=sys.stderr)
        return 2

    connection = json.loads(connection_path.read_text())
    base = str(connection["portal_url"]).rstrip("/")
    code = urllib.parse.quote(str(connection["workshop_code"]))
    request = urllib.request.Request(f"{base}/api/workshop?code={code}", headers={"Accept": "application/json"})
    with urllib.request.urlopen(request, timeout=12) as response:
        snapshot = json.load(response)

    team_id = str(connection["team_id"])
    safe_state = {
        "workshop": snapshot.get("workshop", {}),
        "team": next((team for team in snapshot.get("teams", []) if str(team.get("id")) == team_id), None),
        "events": [event for event in snapshot.get("events", []) if not event.get("team_id") or str(event.get("team_id")) == team_id],
        "synced_at": __import__("datetime").datetime.now(__import__("datetime").timezone.utc).isoformat(),
    }
    output = Path(".catalyst/remote_state.json")
    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(json.dumps(safe_state, indent=2) + "\n")
    print(f"Synced workshop {safe_state['workshop'].get('code', '')}: {safe_state['workshop'].get('stage', 'unknown')}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
