---
description: "Advisory mode: the full stakeholder panel reviews your real plan — constructive risks, suggestions, and strategies, no pass/fail"
argument-hint: "[optional: path to your plan, or 'verdict' for a pass/fail read]"
---

# /catalyst:stress-test

The same five-stakeholder panel from the workshop, in advisory posture: constructive, specific, on your side.

1. Locate the plan. Normalize `$ARGUMENTS` by trimming whitespace and treating a standalone `verdict` token as a mode flag, never as a file path. The remaining argument, if any, is the plan path; otherwise use `ROLLOUT_PLAN.md` if it exists. If no plan path can be found or the path does not exist, ask what to review and stop (they can point at any doc — a strategy memo, a board deck outline). `COMPANY_PROFILE.md` should exist for context; proceed with a note if it doesn't.
2. Launch **all five personas in parallel, in a single message** (Agent tool, `subagent_type`: `meridian-cto`, `meridian-cfo`, `meridian-cro`, `meridian-ciso`, `meridian-staff-eng`). Each prompt states: `ADVISORY MODE — you are the <archetype> stakeholder for the user's real organization`, the working directory, the verified plan path, and whether `COMPANY_PROFILE.md` is present. Instruct: constructive review — top strengths, top risks, concrete suggestions, and the questions this stakeholder would ask that the plan can't yet answer. **No verdict block** — unless the user passed the standalone `verdict` flag in `$ARGUMENTS`, in which case each persona also gives the simulation-style SATISFIED / NOT SATISFIED read.
3. Synthesize across the five without flattening them: where stakeholders agree (do these first), where they tension against each other (name the tradeoff — e.g., CRO wants gates the CFO's timeline hates — and recommend a resolution), and the single biggest hole nobody's section covers.
4. End with a prioritized action list (≤7 items) and the offer to regenerate the affected plan sections now — the workshop lesson applies here too: regenerate, don't hand-patch.
