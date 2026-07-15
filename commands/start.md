---
description: Start Project Catalyst — scaffold the Meridian workshop simulation into this folder, or begin advisory mode for your own company
argument-hint: "[simulation | my-company]"
---

# /catalyst:start

You are setting up Project Catalyst in the current working directory.

## 1. Determine mode

Normalize `$ARGUMENTS` first: trim leading/trailing whitespace and compare the remaining token exactly.

- `simulation` → simulation mode.
- `my-company` or `advisory` → advisory mode.
- Empty or anything else → present both options and wait for the answer. Don't guess, and don't default:

  > **Two ways to run Catalyst:**
  >
  > **1. Run the exercise** — `/catalyst:start simulation`
  > Play the AI Enablement Office at Meridian Global Bank: 10,000 engineers, five divisions, eight countries, a board that has to approve your rollout plan. The data is scaffolded for you, the conditions change under you, and five stakeholder sub-agents judge your work. This is the workshop.
  >
  > **2. Run it for your company** — `/catalyst:start my-company`
  > Same playbook, your real org. An intake interview, a maturity assessment, a rollout plan tailored to your constraints, and the same five stakeholders stress-testing it before your real ones do. Nothing leaves your repo.
  >
  > Which one?

  Then normalize their reply the same way: anything meaning the simulation/exercise/Meridian → simulation mode; anything meaning their own company/org/real work → advisory mode. If it's genuinely ambiguous, ask once more rather than picking.

## 2. Simulation mode

**Guards first:**
- If `catalyst_state.json` already exists here, say the exercise is already set up and show current progress (same output as `/catalyst:status`). Stop.
- If the directory contains existing unrelated files (anything beyond dotfiles/empty dirs), warn the user this command scaffolds ~2MB of scenario files here and get an explicit yes before continuing.

**Scaffold** (the scenario ships inside this plugin at `${CLAUDE_PLUGIN_ROOT}/scenario/`):

```bash
cp "${CLAUDE_PLUGIN_ROOT}/scenario/CLAUDE.md" .
cp "${CLAUDE_PLUGIN_ROOT}/scenario/README.md" .
cp -R "${CLAUDE_PLUGIN_ROOT}/scenario/data" .
cp -R "${CLAUDE_PLUGIN_ROOT}/scenario/docs" .
cp -R "${CLAUDE_PLUGIN_ROOT}/scenario/templates" .
cp -R "${CLAUDE_PLUGIN_ROOT}/scenario/.claude" .
```

**CRITICAL: never copy `scenario/curveballs/` or `scenario/SETUP_TECH_RUNNER.md`.** The curveball files are dropped later by `/catalyst:curveball` on the facilitator's cue. Copying them now spoils the exercise. Do not read, summarize, or mention their contents at any point.

**Initialize git** (the git history is part of the lesson — regenerable artifacts, visible re-planning):

```bash
git init 2>/dev/null; git add -A && git commit -m "Starter state — Project Catalyst begins"
```

**Write `catalyst_state.json`** (use `date -u +%Y-%m-%dT%H:%M:%SZ` for the timestamp):

```json
{
  "mode": "simulation",
  "started_at": "<timestamp>",
  "curveballs_dropped": [],
  "gates": {
    "gauntlet": { "status": "locked", "rounds": [] },
    "gate_1":   { "status": "locked", "rounds": [] },
    "gate_2":   { "status": "locked", "rounds": [] },
    "final":    { "status": "locked", "rounds": [] }
  }
}
```

Commit it too.

**Then deliver the kickoff.** Print, styled as a memo:

> *"Welcome to Day 1 of the AI Enablement Office. Six months from now, every one of Meridian's ten thousand engineers will be shipping with Claude Code — or I'll be explaining to the board why not. You have the pilot data, the budget, the census, and the policy landscape in the repo in front of you. I need a plan I can take to the board: six sections, one document, defensible numbers. Go."*
> — Anika Rao, CTO

Follow with a short orientation:
- Deliverable: fill in `templates/rollout_plan_TEMPLATE.md`, save as `rollout_plan_FINAL.md` — all six sections.
- The repo is more than you can read manually. That's the point — use Claude Code as your analyst, writer, and modeler.
- Useful commands: `/catalyst:sweep` (read the whole library → three findings, the biggest risk, the missing evidence), `/catalyst:segment` (census → wave design), `/catalyst:roi` (pilot data → ROI model), `/catalyst:gauntlet` (once the baseline plan exists — the five stakeholders challenge it directly), `/catalyst:status` (where you are), `/catalyst:brief` (re-read this briefing).
- "Conditions may change. Real ones always do."

## 3. Advisory mode

- Guards first:
  - If `catalyst_state.json` already exists here, say the exercise is already set up and show current progress (same output as `/catalyst:status`). Stop.
  - If the directory contains existing unrelated simulation files (`rollout_plan_FINAL.md`, `curveballs/`, Meridian `data/`/`docs/`), recommend a fresh folder and continue only after an explicit yes.
- Write `catalyst_state.json` with `{ "mode": "advisory", "started_at": "<timestamp>" }`.
- Then run the intake interview exactly as specified in the `/catalyst:my-company` command — proceed directly into it now rather than telling the user to run another command.
