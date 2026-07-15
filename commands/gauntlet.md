---
description: Face the Gauntlet — draft the table's response to all five stakeholders' simultaneous challenges to the first strategy
---

# /catalyst:gauntlet

Read `catalyst_state.json`. Must exist and be `mode: simulation` — in advisory mode, this phase doesn't apply; advisory users get the same five stakeholders via `/catalyst:stress-test` instead. Say so and stop.

**Precondition:** `rollout_plan_FINAL.md` must exist with the wave design, change & adoption, governance, ROI, and risk sections drafted (the First Strategy). If it doesn't exist or looks empty, point at `/catalyst:segment` and `/catalyst:roi` to get the baseline plan built first, and stop.

**Backfill:** if `catalyst_state.json` doesn't yet have a `gauntlet` key (state written before this command existed), add `"gauntlet": { "status": "locked", "rounds": [] }` to it now and commit — don't make the table re-run `/catalyst:start`.

**Guard:** if `gates.gauntlet.status` is already `"passed"` or `"passed_by_override"`, say the Gauntlet is already cleared and show status instead (same shape as `/catalyst:status`). Stop.

Create `responses/gauntlet_response.md` (or open it if it exists — never overwrite content the team already wrote). Template:

```markdown
# The Gauntlet — Five Stakeholders, Five Questions

Each of you is judged only on your own answer to your own stakeholder — the panel doesn't average.

## Anika Rao, CTO — the adoption arithmetic

> "You've promised me 85% of ten thousand engineers active by Month 6. Walk me through the
> arithmetic — month by month, who activates and when — and then tell me what happens to that
> number if Works Council consultation for Dublin takes the twelve weeks it usually takes.
> Eleven hundred people is not a rounding error. If your answer is 'we'll push harder in Q2,'
> this meeting is over."

<Your answer. Month-by-month or wave-by-wave, with Dublin's 1,145 explicitly accounted for.>

## Marcus Webb, CRO — the paper trail

> "Nothing in the current rulebook prohibits this tool — and everything in it says
> accountability stays with us and audit expectations go up. So play it forward: an
> AI-suggested change merges into the payments rail, and three weeks later we take a Sev-1.
> Show me the paper trail I hand the OCC — how we know the change was AI-assisted, who the
> named reviewer was, and where the prompt logs are. If that trail doesn't exist today, I need
> what you're building and by when. Not a value statement. A trail."

<Your answer. The artifact chain: provenance marking, named reviewer, retrievable logs.>

## Priya Nair, CISO — clause by clause

> "Policy 14.7 is binding until amended, and your Wave 1 almost certainly contains teams
> working in Restricted repositories. §3.1 says that code does not leave the building without
> a DPO-approved DPIA — which has a lead time your wave table doesn't show. So: name your DPIA
> path and when it starts. Give me your provenance mechanism for §4.2 — 'TBD' was the old
> policy's answer, it can't be yours. And confirm §4.3 stands: nothing in this rollout grants
> the tool write access to production. Tell me clause by clause what you comply with as
> written and what you're formally proposing to amend."

<Your answer. §3.1 DPIA path and lead time, §4.2 provenance mechanism, §4.3 confirmed.>

## David Okafor, CFO — the Month-3 slide

> "Your value case leans on two hundred hand-picked engineers building greenfield
> applications. I'm being asked to spend fourteen million dollars against ten thousand
> engineers whose estate includes COBOL older than some of your team. So give me the Month-3
> slide today: the metric, the population it's measured on, the baseline you'll capture before
> they start, and the target — including your haircut on the pilot's 22%, because if you
> extrapolate that number to the whole bank I'll stop reading. And answer the question nobody
> puts on the slide: if you miss it by half, what do you cut?"

<Your answer. Metric, population, baseline, haircut target, and the miss-by-half consequence.>

## Deirdre O'Brien, Staff Engineer — the trust question

> "Fifty-one percent of us said opt-in, and your own target says 85% adoption by Month 6.
> Square those for me — because from my desk that math only works if 'opt-in' quietly becomes
> a quota on someone's dashboard. And while you're at it: a junior on my team asked me last
> week whether her manager will read her prompt logs, since you're keeping them for audit. I
> didn't have an answer. Sixty-seven percent of us asked for a clear policy on exactly this. If
> your plan doesn't say who reads the logs, the answer on the floor will be 'management does' —
> and you'll lose the cautious 41% by Christmas."

<Your answer. Opt-in reconciled with 85% as an earned outcome, plus a named log-access policy.>
```

On first run only (i.e. `gates.gauntlet.status` was `"locked"` before this command ran): flip it to `"active"` in state and commit — mirroring how `/catalyst:curveball` activates gate_1/gate_2. If it was already `"active"` (the team is editing an in-progress response), don't re-flip it or re-commit the state file.

Then coach, briefly:
- This is the table's one shot to answer each stakeholder's actual question — not the theme of it. Anika wants arithmetic, Marcus wants an artifact chain, Priya wants clause numbers, David wants a haircut and a consequence, Deirdre wants a named log-access policy. Generic reassurance reads as an objection to all five.
- When all five sections are written: `/catalyst:review` convenes the full panel — each stakeholder grades only their own answer.

---

*Workshop: this is **The Gauntlet** in Mission Control. Answer all five here, run `/catalyst:review` to pre-grade, then paste each answer into its field. See [WORKSHOP_MAP.md](../WORKSHOP_MAP.md).*
