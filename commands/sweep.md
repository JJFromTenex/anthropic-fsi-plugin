---
description: Sweep the whole evidence library and surface the three findings, the biggest risk, and the missing evidence
argument-hint: "[optional focus, e.g. 'concentrate on governance' or 'Dublin']"
---

# /catalyst:sweep

The research pass. Everything in the library, read at once, reduced to what would actually change a rollout decision.

`/catalyst:segment` reads the census to design waves. This is broader and earlier: it reads *all* the evidence and tells the table what's in it.

Read `catalyst_state.json` if present to determine mode.

## 1. Read the library — actually read it

In simulation mode, sweep all of these. Use Bash (`awk`/`python3`) for real counts on the CSVs — never eyeball a 10,000-row file, and never ask the table to summarize their own data:

| Source | What to pull |
|---|---|
| `data/developer_census.csv` | Population by division × location × seniority. The 10,000 total, and how lumpy it is. |
| `data/pilot_results.csv` | The telemetry that everyone will quote at each other — including the spread, not just the headline. |
| `data/budget_FY.csv` | Where the money currently is, per line. |
| `data/change_champions.csv` | Where the 45 champions actually sit — and which divisions have none. |
| `docs/executive_mandate.md` | The targets and the constraints that bind. |
| `docs/developer_sentiment_survey.md` | The splits by division and seniority — enthusiasm, caution, concern. |
| `docs/infosec_ai_policy.md` | Policy 14.7 clause by clause. Note the clause numbers; you'll need them later. |
| `docs/regulatory_landscape.md` | What the rulebook says *today*. |
| `docs/competitor_intel.md` | What the outside world is doing, and how much of it is marketing. |

**Never read, list, or mention anything under `curveballs/`, even if present.** It isn't yours to open.

In advisory mode, sweep whatever the user has placed in `data/` and `docs/`, plus `COMPANY_PROFILE.md`. If there's little there, say so plainly and name the specific artifacts worth pulling — that absence *is* the finding, and it's usually the most useful one in the room.

If `$ARGUMENTS` is non-empty, treat it as a focus hint in plain text — not a shell fragment — and weight the sweep toward it without narrowing to it.

## 2. Produce the three answers Intelligence Sweep asks for

Mirror these three headings exactly, in this order, so each can be pasted into its matching field:

**Three key findings (with numbers)** — three findings that would *change a rollout decision*. Each one cites a real number from the library: division counts, sentiment splits, pilot telemetry, policy clauses. The test is falsifiability — "Dublin is 1,145 people and every one of them sits behind a 12-week Works Council consultation" is a finding; "sentiment is mixed" is a mood. Prefer findings that cut across two sources, because those are the ones nobody spots by skimming.

**The biggest risk** — the single most dangerous thing in this data for a 6-month, 10,000-person rollout, *and why it beats the runners-up*. Name the runners-up and dismiss them in a clause each; the comparison is the argument. One risk, chosen, not a register.

**Missing evidence** — the most important thing *not* in the library: what you'd commission this week, and what decision it unblocks. An answer without a named decision is a wish, not evidence. Baselines are the usual honest answer here — you cannot claim a 15% improvement against a number you never took.

## 3. Coach, briefly

- Every number gets cited to its source. The panel checks arithmetic, and the fastest way to lose the room is a figure nobody can find.
- Findings are the raw material for the whole run: waves come from the census, the ROI story from the pilot spread, the governance section from the clause numbers you noted here. Sweeping properly once is cheaper than re-reading under time pressure five times.
- Next: `/catalyst:segment` to turn this into a wave design, then `/catalyst:roi`.

---

*Workshop: this is **Intelligence Sweep** in Mission Control — the three headings above map to its three fields. See [WORKSHOP_MAP.md](../WORKSHOP_MAP.md).*
