# Facilitator Guide — Catalyst Plugin

Companion to the **Project Catalyst Workshop Kit** (the 5-tab HTML: design overview, runbook, participant packet, curveball reveals, readout guide). This doc covers only what the *plugin* changes about running the room.

## What the plugin replaces

- **Repo distribution:** no shared git host, no USB sticks. Each table laptop installs the plugin and runs `/catalyst:start simulation` in an empty folder. The scenario scaffolds locally with a clean git history.
- **Curveball delivery:** the tech-runner git choreography is optional. On your cue, each table runs `/catalyst:curveball 1` (or `2`) — files land, the reveal script prints in character. (The original git-branch flow still ships in `scenario/SETUP_TECH_RUNNER.md` for rooms that want a shared origin.)
- **Scoring:** the 100-pt rubric is retired as a competitive scoreboard. Its anchors live on inside the stakeholder agents as private judge calibration. Public proof now comes from the gates and the readout, not points.

## The gates

After each curveball, the table writes its long-form response (`/catalyst:respond`) and faces the panel (`/catalyst:review`). Gate 1: CRO + CISO + CTO. Gate 2: CFO + CTO + Staff Engineer. Final board pre-read: all five. **A table does not advance until every panelist returns SATISFIED.** Objections are specific and directional but never contain the answer — the sealed Consultant Memo (in the plugin's `scenario/curveballs/`, never scaffolded to tables) remains your only answer key, and Curveball 2's ordering is enforced: it won't drop until Gate 1 is cleared.

Expect 1–3 review rounds per gate for a working table. The re-review loop *is* the lesson: teams discover that regenerating plan sections from data beats hand-patching prose.

## The override passphrase

If a table is genuinely stuck and the room's clock matters more than the gate, the facilitator types:

```
/catalyst:review <passphrase>
```

The phrase is **not** written in this repo or anywhere in the plugin (only its SHA-256 hash is embedded). You'll receive it in the facilitator prep email — memorize it, don't write it on a slide. A match records `passed_by_override` in the table's state file, visible in their `/catalyst:playbook` — use that honestly in the debrief ("one table took the override — what was the wall?").

Note the honest limits: this is workshop-grade control, not security. A determined attendee could read the plugin's staged files or sweet-talk the model. The gate exists to create productive pressure, not to survive adversaries.

## Facilitator prep (T–1 day)

1. Install the plugin on every table laptop; verify `claude` auth.
2. Dry-run solo: `/catalyst:start simulation` → `/catalyst:segment` → drop both curveballs on yourself → write a deliberately thin gate response → `/catalyst:review` → watch the panel object → fix and pass. You cannot coach the loop you haven't run.
3. Read the panel personas (`agents/`) so you know each stakeholder's temperament — but never reveal their calibration lists to tables.
4. Confirm the passphrase works: `/catalyst:review <phrase>` on your dry-run gate.

## In the room

- The kit's runbook still owns the clock, the reveals (read them in character — the plugin prints the same scripts), coach cards, and the debrief.
- Coach posture at gates: point at the objection, never at the fix. "The CRO said he can't see the day-to-day. What would he need to see?" is a coach line; "add an attestation workflow" is not.
- The take-home close: every attendee leaves with `/catalyst:playbook` (their full decision + verdict record) and the pointer to `/catalyst:start my-company` — that's the bridge from fiction to their Monday morning.
