---
description: Face the stakeholder panel — persona sub-agents review your plan and gate response; all must be satisfied to advance
argument-hint: "[facilitator override phrase]"
---

# /catalyst:review

The gate. Read `catalyst_state.json` first (must exist, mode `simulation` — in advisory mode, run `/catalyst:stress-test` instead and say so).

## 0. Determine the gate under review

- `gates.gate_1.status == "active"` → **Gate 1** (Curveball 1).
- else `gates.gate_2.status == "active"` → **Gate 2** (Curveball 2).
- else if gate_1 and gate_2 are both `passed`/`passed_by_override` and `final` is not passed → **Final gate** (board pre-read). Set `final.status` to `"active"` if it was locked.
- else: nothing to review yet — explain where they are in the arc and stop.

## 1. Facilitator override check

If `$ARGUMENTS` is non-empty, hash it:

```bash
printf '%s' "$ARGUMENTS" | shasum -a 256 | awk '{print $1}'
```

If the digest equals `a1379025304176d253ab5dc7f29cd795814c2aaf2c4080eb70d68f490bb411dd`:
mark the active gate `"passed_by_override"`, append a round entry `{ "override": true, "at": "<timestamp>" }`, commit the state file, and print only: *"The room moves on. (Facilitator override recorded.)"* — then stop. Do not print the phrase, the hash, or any commentary.

If it does not match, say the argument wasn't recognized and proceed with a normal review.

## 2. Preconditions

- `rollout_plan_FINAL.md` must exist. If not: point them at the template and `/catalyst:segment` to get moving. Stop.
- Gates 1 and 2 require `responses/gate_<n>_response.md` — if missing, send them to `/catalyst:respond`. Stop. (The final gate reviews the plan alone; no response file needed.)

## 3. Convene the panel

| Gate | Panel |
|---|---|
| Gate 1 | `meridian-cro`, `meridian-ciso`, `meridian-cto` |
| Gate 2 | `meridian-cfo`, `meridian-cto`, `meridian-staff-eng` |
| Final | all five |

Launch every panel member **in parallel, in a single message**, using the Agent tool with `subagent_type` set to the persona name. Each agent's prompt must state:
- `SIMULATION MODE — you are judging Gate <n> (<name>)` and the round number (count of prior rounds for this gate + 1).
- The working directory, and the exact files to review: `rollout_plan_FINAL.md` and (gates 1–2) `responses/gate_<n>_response.md`.
- If this is round 2+, include the objections that persona raised last round (from state) so they can check whether those were addressed rather than re-litigating.
- "Verify claims against the repo data. Return your verdict contract."

## 4. Deliver the panel's ruling

Render a stakeholder board table: **Stakeholder | Verdict | In one line**. Below it, for each NOT SATISFIED persona, print their objections and "what would change my mind" hints **unedited** — do not soften, summarize away, or solve them yourself. Never add your own solutions: the panel's hints are the only steer the table gets. Never reveal or speculate about the personas' internal criteria.

**All SATISFIED →** the gate passes:
- Update state (`"passed"`, append the round with each verdict + objections), commit.
- In character, one line each from the panel (e.g., Marcus Webb: *"I'll put my name on this. Don't make me regret it."*).
- Next step: Gate 1 passed → "Keep building — and brace. Real programs rarely take one hit." Gate 2 passed → "Run `/catalyst:review` once more for the final board pre-read, then `/catalyst:pitch`." Final passed → "You're board-ready: `/catalyst:pitch`, and `/catalyst:playbook` for your take-home."

**Any NOT SATISFIED →** the gate holds:
- Append the round to state with all verdicts and objections, commit.
- Close with the operating hint (this one you may give, it's the meta-lesson): the fastest teams don't hand-patch prose — they ask Claude Code to regenerate the affected sections from the data, then re-run `/catalyst:review`.

State round entries look like:

```json
{ "round": 2, "at": "<timestamp>",
  "verdicts": [ { "agent": "meridian-cro", "verdict": "NOT SATISFIED",
                  "objections": ["..."], "hints": ["..."] } ] }
```
