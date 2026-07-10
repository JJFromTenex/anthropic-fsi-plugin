---
description: "Facilitator: drop a curveball into the simulation (1 = the regulator calls, 2 = less money, more people)"
argument-hint: "<1 | 2>"
---

# /catalyst:curveball

Facilitator-triggered. `$ARGUMENTS` must be `1` or `2` — anything else, explain usage and stop.

Read `catalyst_state.json` first. Guards:
- Mode must be `simulation` and the state file must exist (otherwise: run `/catalyst:start` first).
- Curveball 1: refuse if `1` is already in `curveballs_dropped`.
- Curveball 2: refuse if `2` already dropped, if `1` has not dropped, **or if `gates.gate_1.status` is not `passed` or `passed_by_override`** — the table must clear Gate 1 before the next shock. Say exactly which condition blocks.

**Never copy, read aloud, or reference `CONSULTANT_MEMO_sealed.md`. It stays in the plugin, facilitator-only.**

## Curveball 1 — "The Regulator Calls"

```bash
mkdir -p curveballs
cp "${CLAUDE_PLUGIN_ROOT}/scenario/curveballs/SR-26-11_regulatory_bulletin.md" curveballs/
cp "${CLAUDE_PLUGIN_ROOT}/scenario/curveballs/_staged/developer_census_v2.csv" data/developer_census.csv
git add -A && git commit -m "C1: SR 26-11 regulatory bulletin + critical_function census"
```

Update state: add `1` to `curveballs_dropped`, set `gates.gate_1.status` to `"active"`. Commit.

Then deliver the reveal — read it as **Marcus Webb, Chief Risk Officer**, verbatim:

> *"I'll be brief. The OCC and FCA dropped joint guidance an hour ago. If an AI tool touches code in a critical-function system — payments, trading, risk calc, core ledger — it now needs model-risk validation, per-merge human attestation, and a 12-month audit trail. We've flagged the census: about 4,900 of your ten thousand are in scope. The other 5,100 are unaffected — move as fast as you like there. But I need a governance section and a wave sequence that reflects this before I'll put my name on it. The files are in your repo now."*

Follow with, out of character:
- What landed: `curveballs/SR-26-11_regulatory_bulletin.md` (read it), and `data/developer_census.csv` now has a `critical_function` column.
- **Gate 1 is now active.** When the table has decided how to respond, run `/catalyst:respond` to write it up, then `/catalyst:review` to face the stakeholders. The plan does not advance until the panel is satisfied.
- Facilitator fact-clarifications only (if asked): the count is what the data says — trust the CSV; it's effective immediately; you cannot lobby the regulator; assume the pilot does not count as validation.

## Curveball 2 — "Less Money, More People"

```bash
cp "${CLAUDE_PLUGIN_ROOT}/scenario/curveballs/cfo_memo_budget_revision.md" curveballs/
cp "${CLAUDE_PLUGIN_ROOT}/scenario/curveballs/_staged/adjacent_roles.csv" data/adjacent_roles.csv
cp "${CLAUDE_PLUGIN_ROOT}/scenario/curveballs/_staged/budget_FY_v2.csv" data/budget_FY.csv
git add -A && git commit -m "C2: CFO budget revision + adjacent roles"
```

Update state: add `2` to `curveballs_dropped`, set `gates.gate_2.status` to `"active"`. Commit.

Deliver the reveal as **David Okafor, CFO** — slightly weary, non-negotiable:

> *"Two things from ExCo. First — macro headwinds; your budget is now nine-and-a-half million, not fourteen. The revised envelope is in the budget CSV. Reallocate however you want inside it, but the total is fixed. Second — the CEO saw Apex's 'AI-native workforce' announcement and wants Catalyst expanded to two thousand code-adjacent roles: BAs, QA, quants, technical PMs, SRE. Inside the six months, not a Phase 2. They're in adjacent_roles.csv with a proficiency score. I know how this sounds. I also think there's an angle here — these people don't touch critical-function code and they produce very visible output. Make it work. ExCo reconvenes in forty minutes."*

Follow with, out of character:
- What landed: the CFO memo, `data/adjacent_roles.csv` (2,000 rows), and `data/budget_FY.csv` revised to $9.5M.
- **Gate 2 is now active.** `/catalyst:respond` → `/catalyst:review` when ready.
- Fact-clarifications only: you can note the risk of the scope add but not refuse it; $9.5M is fixed; adjacent roles count toward the adoption target — it's now 85% of 12,000.
