"use client";

import { FormEvent, useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";

type Workshop = { id: string; code: string; stage: string; paused: boolean; expiresAt: string };
type Team = {
  id: string; name: string; ticker: string; status: string;
  value_score: number; trust_score: number; workforce_score: number; execution_score: number;
};
type Contribution = { id: string; team_id: string; stage: string; task_key: string; task_title: string; participant_name: string };
type Finding = { id: string; team_id: string; participant_name: string; insight: string; source: string; implication: string };
type Decision = { id: string; team_id: string; round: number; decision: string; rationale: string; sources: string };
type MarketEvent = { id: string; team_id?: string; type: string; title: string; body: string; created_at: string };
type Snapshot = { workshop: Workshop; teams: Team[]; contributions: Contribution[]; findings: Finding[]; decisions: Decision[]; events: MarketEvent[] };

const stageBriefs: Record<string, { label: string; decision: string; evidence: string[]; tasks: Array<{ key: string; title: string; detail: string }> }> = {
  lobby: {
    label: "Get to the start line",
    decision: "How will your group investigate together and return with one shared recommendation?",
    evidence: ["Resource library", "Shared Claude Code workspace", "Workshop decision brief"],
    tasks: [
      { key: "workspace", title: "Pair the Claude Code workspace", detail: "Confirm the group can investigate, capture findings, and sync progress." },
      { key: "scan", title: "Scan the available evidence", detail: "Identify the datasets and documents most likely to change the decision." },
      { key: "questions", title: "Frame the first questions", detail: "Turn the board ask into two or three questions the team can test." },
    ],
  },
  baseline: {
    label: "Baseline decision",
    decision: "Who should receive Claude Code access first, how should limited capacity be allocated, and why?",
    evidence: ["Usage & capacity", "Developer census", "Pilot outcomes", "Budget", "Sentiment", "AI policy"],
    tasks: [
      { key: "capacity", title: "Analyze usage and capacity", detail: "Use Claude Code to test whether equal token allocation is efficient." },
      { key: "readiness", title: "Test workforce readiness", detail: "Compare population, pilot, and sentiment data to find adoption constraints." },
      { key: "controls", title: "Map risk and policy constraints", detail: "Separate binding controls from assumptions that can be challenged." },
      { key: "synthesize", title: "Synthesize and challenge", detail: "Connect the findings, surface the tradeoff, and pressure-test the recommendation." },
    ],
  },
  review: {
    label: "Stakeholder review",
    decision: "Which gaps in the first recommendation must be resolved before leadership can defend it?",
    evidence: ["Submitted decision", "Team findings", "Claude stakeholder review", "Original source files"],
    tasks: [
      { key: "value", title: "Stress-test the value case", detail: "Check whether the expected value and Month-3 proof point are credible." },
      { key: "missing", title: "Find missing evidence", detail: "Identify where the recommendation relies on inference instead of a source." },
      { key: "adoption", title: "Challenge adoption assumptions", detail: "Look for populations, managers, or concerns the plan leaves behind." },
      { key: "revise", title: "Turn objections into updates", detail: "Decide what changes and what the team will defend as-is." },
    ],
  },
  curveball: {
    label: "Sector alert",
    decision: "What must change under the new control requirements, and what can continue without losing momentum?",
    evidence: ["Joint regulatory bulletin", "Existing AI policy", "Baseline decision", "Critical-function data"],
    tasks: [
      { key: "scope", title: "Scope what is affected", detail: "Identify the teams and workflows subject to the new requirements." },
      { key: "requirements", title: "Interpret the new controls", detail: "Translate validation, attestation, and auditability into operational changes." },
      { key: "recalculate", title: "Recalculate pace and value", detail: "Test how the new controls change sequencing, capacity, and the value case." },
      { key: "response", title: "Draft the updated decision", detail: "State what pauses, what continues, and which tradeoff leadership accepts." },
    ],
  },
  response: {
    label: "Response",
    decision: "How will the bank implement its regulatory response while preserving the original value case?",
    evidence: ["Joint regulatory bulletin", "Revised analysis", "Baseline decision", "Team findings"],
    tasks: [
      { key: "scope", title: "Confirm affected scope", detail: "Validate which workflows need added controls and which can continue." },
      { key: "controls", title: "Design the control response", detail: "Define the minimum viable validation, attestation, and evidence trail." },
      { key: "economics", title: "Recheck the economics", detail: "Update capacity, cost, and Month-3 proof points." },
      { key: "synthesize", title: "Synthesize the response", detail: "Make the updated recommendation coherent and defensible." },
    ],
  },
  board: {
    label: "Final board",
    decision: "What is the clearest evidence-backed recommendation the board can approve today?",
    evidence: ["Updated decision", "Team findings", "Stakeholder objections", "Market response"],
    tasks: [
      { key: "proof", title: "Tighten the proof points", detail: "Select the evidence and Month-3 measures that make the case credible." },
      { key: "challenge", title: "Prepare for challenge", detail: "Ask the hardest board question and test the response." },
      { key: "owners", title: "Confirm owners and checkpoints", detail: "Make accountability and revisit triggers explicit." },
      { key: "submit", title: "Finalize the recommendation", detail: "Reconcile the work into one concise decision and accepted tradeoff." },
    ],
  },
};

const resources = [
  { title: "Usage & Capacity Dataset", type: "CSV", file: "/resources/claude_usage_capacity.csv", detail: "Twelve weeks of usage, capacity, and cost data for building an allocation model." },
  { title: "Developer Population", type: "CSV", file: "/resources/developer_census.csv", detail: "Ten thousand engineers across divisions, roles, locations, and readiness levels." },
  { title: "Pilot Outcomes", type: "CSV", file: "/resources/pilot_results.csv", detail: "Observed adoption, cycle-time, quality, and satisfaction results from the pilot." },
  { title: "Enterprise Budget", type: "CSV", file: "/resources/budget_FY.csv", detail: "The current program envelope and investment categories." },
  { title: "Developer Sentiment", type: "MD", file: "/resources/developer_sentiment_survey.md", detail: "What engineers trust, fear, and need from leadership." },
  { title: "AI Policy & Regulation", type: "MD", file: "/resources/ai_policy_and_regulation.md", detail: "Binding controls, regulator expectations, and unresolved policy questions." },
];

const stageLabels: Record<string, string> = {
  lobby: "Pre-market", baseline: "Baseline decision", review: "Stakeholder review",
  curveball: "Sector alert", response: "Response", board: "Board review", closed: "Market closed",
};

async function api(body: Record<string, unknown>) {
  const response = await fetch("/api/workshop", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
  const data = await response.json();
  if (!response.ok) throw new Error(data.error || "Request failed");
  return data;
}

function indexOf(team: Team) {
  return Math.round((team.value_score + team.trust_score + team.workforce_score + team.execution_score) / 4);
}

export function CatalystApp() {
  const search = useSyncExternalStore(
    (callback) => { window.addEventListener("popstate", callback); return () => window.removeEventListener("popstate", callback); },
    () => window.location.search,
    () => "",
  );
  const params = useMemo(() => {
    const query = new URLSearchParams(search);
    return { code: query.get("code") || "", view: query.get("view") || "", teamId: query.get("team") || "", token: query.get("token") || "" };
  }, [search]);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const load = useCallback(async () => {
    if (!params.code) return;
    try {
      const response = await fetch(`/api/workshop?code=${encodeURIComponent(params.code)}`, { cache: "no-store" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to load workshop");
      setSnapshot(data);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to load workshop");
    }
  }, [params.code]);

  useEffect(() => {
    if (!params.code) return;
    const immediate = window.setTimeout(load, 0);
    const timer = window.setInterval(load, 3000);
    return () => { window.clearTimeout(immediate); window.clearInterval(timer); };
  }, [load, params.code]);

  function navigate(next: { code: string; view: string; teamId?: string; token?: string }) {
    const query = new URLSearchParams({ code: next.code, view: next.view });
    if (next.teamId) query.set("team", next.teamId);
    if (next.token) query.set("token", next.token);
    window.history.pushState({}, "", `/?${query.toString()}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  async function createWorkshop() {
    setLoading(true); setError("");
    try {
      const data = await api({ action: "createWorkshop" });
      navigate({ code: data.code, view: "instructor", token: data.instructorToken });
    } catch (err) { setError(err instanceof Error ? err.message : "Unable to create workshop"); }
    finally { setLoading(false); }
  }

  if (!params.code) return <Landing loading={loading} error={error} onCreate={createWorkshop} onEnter={(code) => navigate({ code, view: "join" })} />;
  if (params.view === "market") return <Market snapshot={snapshot} error={error} />;
  if (params.view === "instructor") return <Instructor snapshot={snapshot} code={params.code} token={params.token} refresh={load} error={error} />;
  if (params.view === "team" && params.teamId) return <TeamRoom snapshot={snapshot} teamId={params.teamId} teamToken={params.token} code={params.code} refresh={load} error={error} />;
  return <JoinWorkshop snapshot={snapshot} code={params.code} error={error} onJoined={(teamId, token) => navigate({ code: params.code, view: "team", teamId, token })} />;
}

function Shell({ children, eyebrow = "PROJECT CATALYST" }: { children: React.ReactNode; eyebrow?: string }) {
  return <main className="shell"><header className="brand"><div className="brand-mark">C</div><div><p className="eyebrow">{eyebrow}</p><p className="brand-name">FSI Executive Simulation</p></div></header>{children}</main>;
}

function Landing({ loading, error, onCreate, onEnter }: { loading: boolean; error: string; onCreate: () => void; onEnter: (code: string) => void }) {
  const [code, setCode] = useState("");
  return <Shell><section className="hero"><div><p className="kicker">LEAD THROUGH THE TRADEOFFS</p><h1>Can your bank turn Claude Code into an advantage?</h1><p className="hero-copy">A live, evidence-led simulation for senior leaders deploying Claude Code across a financial institution.</p></div><div className="entry-card"><button className="primary" onClick={onCreate} disabled={loading}>{loading ? "Opening market…" : "Create instructor room"}</button><div className="divider"><span>or join a workshop</span></div><form onSubmit={(event) => { event.preventDefault(); onEnter(code.trim().toUpperCase()); }}><label>Workshop code<input value={code} onChange={(event) => setCode(event.target.value)} placeholder="FSI-ABC123" required /></label><button className="secondary" type="submit">Enter workshop</button></form>{error && <p className="error">{error}</p>}</div></section><section className="principles"><article><span>01</span><h2>Investigate</h2><p>Pull real usage, cost, population, sentiment, and policy evidence.</p></article><article><span>02</span><h2>Decide</h2><p>Reconcile value, trust, workforce readiness, and execution.</p></article><article><span>03</span><h2>Adapt</h2><p>Respond when market conditions and regulatory expectations change.</p></article></section></Shell>;
}

function JoinWorkshop({ snapshot, code, error, onJoined }: { snapshot: Snapshot | null; code: string; error: string; onJoined: (teamId: string, token: string) => void }) {
  const [name, setName] = useState(""); const [ticker, setTicker] = useState(""); const [busy, setBusy] = useState(false); const [localError, setLocalError] = useState("");
  async function create(event: FormEvent) { event.preventDefault(); setBusy(true); try { const data = await api({ action: "createTeam", code, name, ticker }); onJoined(data.teamId, data.teamToken); } catch (err) { setLocalError(err instanceof Error ? err.message : "Unable to create team"); } finally { setBusy(false); } }
  async function join(teamId: string) { setBusy(true); try { const data = await api({ action: "joinTeam", code, teamId }); onJoined(data.teamId, data.teamToken); } catch (err) { setLocalError(err instanceof Error ? err.message : "Unable to join team"); } finally { setBusy(false); } }
  return <Shell eyebrow={`WORKSHOP ${code}`}><div className="page-title"><div><p className="kicker">PRE-MARKET LOBBY</p><h1>Enter the banking market</h1><p>Join your group or establish a new fictional bank. You will divide the work at each decision stage.</p></div><span className="stage-pill">{snapshot ? stageLabels[snapshot.workshop.stage] : "Connecting"}</span></div><div className="two-column"><section><h2>Companies forming</h2><div className="team-list">{snapshot?.teams.length ? snapshot.teams.map((team) => { const active = new Set(snapshot.contributions.filter((item) => item.team_id === team.id).map((item) => item.participant_name)).size; return <button className="team-row" key={team.id} onClick={() => join(team.id)} disabled={busy}><span className="ticker">{team.ticker}</span><span><strong>{team.name}</strong><small>{active ? `${active} contributors active` : "Ready to start"}</small></span><span>Join →</span></button>; }) : <div className="empty">No banks have entered yet. Yours can be first.</div>}</div></section><section className="form-panel"><h2>Create your bank</h2><form onSubmit={create}><label>Bank name<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Northstar Capital" required /></label><label>Ticker<input value={ticker} onChange={(event) => setTicker(event.target.value.toUpperCase())} placeholder="NST" maxLength={5} /></label><button className="primary" disabled={busy}>{busy ? "Entering…" : "Enter pre-market"}</button></form>{(error || localError) && <p className="error">{localError || error}</p>}</section></div></Shell>;
}

function Market({ snapshot, error }: { snapshot: Snapshot | null; error: string }) {
  const ranked = useMemo(() => [...(snapshot?.teams || [])].sort((a, b) => indexOf(b) - indexOf(a)), [snapshot]);
  return <Shell eyebrow="CATALYST EXCHANGE"><div className="market-header"><div><p className="kicker">LIVE FSI MARKET</p><h1>{snapshot ? stageLabels[snapshot.workshop.stage] : "Connecting to market"}</h1></div><div className="market-status"><span className="live-dot" /> {snapshot?.workshop.paused ? "PAUSED" : "LIVE"}<strong>{snapshot?.workshop.code}</strong></div></div>{error && <p className="error">{error}</p>}<div className="market-grid"><section className="leaderboard"><div className="section-heading"><h2>Banking Leadership Index</h2><span>Value · Trust · Workforce · Execution</span></div>{ranked.length ? ranked.map((team, index) => <article className="leader-row" key={team.id}><span className="rank">{index + 1}</span><span className="ticker large">{team.ticker}</span><span className="bank-name"><strong>{team.name}</strong><small>{team.status}</small></span><div className="score-line"><i style={{ width: `${indexOf(team)}%` }} /><span>{indexOf(team)}</span></div></article>) : <div className="empty market-empty"><strong>The exchange is waiting.</strong><span>Banks will appear here as teams enter the workshop.</span></div>}</section><aside className="newsroom"><div className="section-heading"><h2>Market wire</h2><span>Latest</span></div>{snapshot?.events.map((event) => <article className={`news-item ${event.type}`} key={event.id}><span>{event.type === "curveball" ? "SECTOR ALERT" : event.type === "hint" ? "FACILITATOR" : "MARKET UPDATE"}</span><h3>{event.title}</h3><p>{event.body}</p></article>)}</aside></div></Shell>;
}

function Instructor({ snapshot, code, token, refresh, error }: { snapshot: Snapshot | null; code: string; token: string; refresh: () => Promise<void>; error: string }) {
  const [busy, setBusy] = useState(false);
  async function act(action: string, extra: Record<string, unknown> = {}) { setBusy(true); try { await api({ action, code, instructorToken: token, ...extra }); await refresh(); } finally { setBusy(false); } }
  return <Shell eyebrow="INSTRUCTOR CONTROL"><div className="page-title"><div><p className="kicker">WORKSHOP {code}</p><h1>Control tower</h1><p>Keep the room moving. Help people divide the work, then bring the group back to one decision.</p></div><a className="secondary link-button" href={`/?code=${code}&view=market`} target="_blank">Open shared market ↗</a></div>{error && <p className="error">{error}</p>}<div className="control-strip"><button onClick={() => act("togglePause")} disabled={busy}>{snapshot?.workshop.paused ? "Resume" : "Pause"}</button><button onClick={() => act("advanceStage", { stage: "baseline" })} disabled={busy}>Start baseline</button><button onClick={() => act("advanceStage", { stage: "review" })} disabled={busy}>Open review</button><button className="alert-button" onClick={() => act("releaseCurveball")} disabled={busy}>Release sector alert</button><button onClick={() => act("advanceStage", { stage: "board" })} disabled={busy}>Final board</button><button onClick={() => act("advanceStage", { stage: "closed" })} disabled={busy}>Close market</button></div><section className="instructor-teams"><div className="section-heading"><h2>Room readiness</h2><span>{snapshot?.teams.length || 0} banks</span></div>{snapshot?.teams.map((team) => { const currentContributions = snapshot.contributions.filter((item) => item.team_id === team.id && item.stage === snapshot.workshop.stage); const contributors = new Set(currentContributions.map((item) => item.participant_name)).size; const teamFindings = snapshot.findings.filter((item) => item.team_id === team.id).length; const teamDecisions = snapshot.decisions.filter((item) => item.team_id === team.id).length; return <article className="instructor-row" key={team.id}><span className="ticker large">{team.ticker}</span><span><strong>{team.name}</strong><small>{contributors} contributing now · {teamFindings} findings · {teamDecisions} decisions</small></span><span className="stage-pill">{team.status}</span><div className="hint-actions"><button onClick={() => act("releaseHint", { teamId: team.id, level: 1 })}>Hint</button><button onClick={() => act("releaseHint", { teamId: team.id, level: 2 })}>Clue</button><button onClick={() => act("releaseHint", { teamId: team.id, level: 3 })}>Source clue</button></div></article>; })}{!snapshot?.teams.length && <div className="empty">Share code <strong>{code}</strong>. Teams will appear as they enter the market.</div>}</section></Shell>;
}

function TeamRoom({ snapshot, teamId, teamToken, code, refresh, error }: { snapshot: Snapshot | null; teamId: string; teamToken: string; code: string; refresh: () => Promise<void>; error: string }) {
  const team = snapshot?.teams.find((item) => item.id === teamId);
  const teamContributions = snapshot?.contributions.filter((item) => item.team_id === teamId) || [];
  const teamFindings = snapshot?.findings.filter((item) => item.team_id === teamId) || [];
  const teamDecisions = snapshot?.decisions.filter((item) => item.team_id === teamId) || [];
  const events = snapshot?.events.filter((item) => !item.team_id || item.team_id === teamId) || [];
  const stage = snapshot?.workshop.stage || "lobby";
  const currentRound = stage === "curveball" || stage === "response" || stage === "board" ? 2 : 1;
  const marketClosed = stage === "closed";
  const [busy, setBusy] = useState(false); const [localError, setLocalError] = useState("");
  const origin = useSyncExternalStore(() => () => undefined, () => window.location.origin, () => "PORTAL_URL");
  async function submit(action: string, body: Record<string, unknown>) { setBusy(true); setLocalError(""); try { await api({ action, code, teamId, teamToken, ...body }); await refresh(); } catch (err) { setLocalError(err instanceof Error ? err.message : "Request failed"); } finally { setBusy(false); } }
  const canSubmitDecision = ["baseline", "curveball", "response", "board"].includes(stage);
  return <Shell eyebrow={`${team?.ticker || "TEAM"} · ${stageLabels[stage]}`}><div className="page-title"><div><p className="kicker">{team?.name || "CONNECTING"}</p><h1>{marketClosed ? "Turn the simulation into one real commitment" : stageBriefs[stage]?.label || "Work the decision together"}</h1><p>{marketClosed ? "Leave with an owner, an immediate decision, and a specific evidence gap to close." : "Choose how you can help in this stage, investigate in parallel, then reconvene around one shared decision."}</p></div>{team && <div className="index-card"><span>Leadership Index</span><strong>{indexOf(team)}</strong></div>}</div>{(error || localError) && <p className="error">{localError || error}</p>}<div className="team-layout"><div className="team-main">{marketClosed ? <ActionCard disabled={busy || teamDecisions.some((item) => item.round === 3)} onSubmit={(data) => submit("addDecision", data)} /> : <><ContributionBoard stage={stage} contributions={teamContributions} disabled={busy} onClaim={(data) => submit("claimContribution", data)} onRelease={(contributionId) => submit("releaseContribution", { contributionId })} /><ResourceLibrary curveball={currentRound === 2} />{stage !== "lobby" && <><FindingForm disabled={busy} onSubmit={(data) => submit("addFinding", data)} /><div className="findings"><div className="section-heading"><h2>Team evidence</h2><span>{teamFindings.length} findings</span></div>{teamFindings.map((finding) => <article key={finding.id}><span>{finding.participant_name} · {finding.source}</span><strong>{finding.insight}</strong><p>{finding.implication}</p></article>)}{!teamFindings.length && <div className="empty">Pull a resource, investigate it, then add the finding that changes the decision.</div>}</div></>}{canSubmitDecision && <DecisionForm round={currentRound} disabled={busy || teamDecisions.some((item) => item.round === currentRound)} onSubmit={(data) => submit("addDecision", data)} />}</>}</div><aside className="team-side"><section className="pairing"><div className="section-heading"><h2>Pair Claude</h2><span>Team workspace</span></div><p>Run this in the shared Claude Code workspace. Attendees—not the driver—guide the analysis.</p><code>/catalyst:start simulation --portal {origin || "PORTAL_URL"} --workshop {code} --team {teamId} --token {teamToken}</code></section><section className="team-wire"><div className="section-heading"><h2>Room wire</h2><span>Live</span></div>{events.slice(0, 6).map((event) => <article key={event.id} className={event.type}><span>{event.type === "curveball" ? "SECTOR ALERT" : event.type === "hint" ? "HINT / CLUE" : "MARKET"}</span><strong>{event.title}</strong><p>{event.body}</p></article>)}</section></aside></div></Shell>;
}

function ContributionBoard({ stage, contributions, disabled, onClaim, onRelease }: { stage: string; contributions: Contribution[]; disabled: boolean; onClaim: (data: Record<string, unknown>) => void; onRelease: (id: string) => void }) {
  const [participantName, setParticipantName] = useState("");
  const brief = stageBriefs[stage] || stageBriefs.baseline;
  const stageContributions = contributions.filter((item) => item.stage === stage);
  return <section className="contribution-board"><div className="section-heading"><h2>Team huddle</h2><span>{brief.label}</span></div><div className="decision-needed"><span>Decision needed</span><h3>{brief.decision}</h3></div><div className="available-evidence"><span>Evidence available</span><div>{brief.evidence.map((item) => <i key={item}>{item}</i>)}</div></div><div className="contribution-intro"><div><span>Ways to contribute</span><p>Work alone or pair up. You can choose a different contribution at every stage.</p></div><label>Your name<input value={participantName} onChange={(event) => setParticipantName(event.target.value)} placeholder="Name" aria-label="Your name for this contribution" /></label></div><div className="contribution-grid">{brief.tasks.map((task) => { const claims = stageContributions.filter((item) => item.task_key === task.key); const mine = claims.find((item) => item.participant_name.toLowerCase() === participantName.trim().toLowerCase()); return <article key={task.key}><div className="task-number">{String(brief.tasks.indexOf(task) + 1).padStart(2, "0")}</div><h3>{task.title}</h3><p>{task.detail}</p><div className="claimants">{claims.map((claim) => <span key={claim.id}>{claim.participant_name}{mine?.id === claim.id && <button type="button" onClick={() => onRelease(claim.id)} aria-label={`Release ${task.title}`}>×</button>}</span>)}{!claims.length && <em>Open</em>}</div><button className={mine ? "claimed-button" : "secondary"} type="button" disabled={disabled || !participantName.trim() || Boolean(mine)} onClick={() => onClaim({ participantName: participantName.trim(), stage, taskKey: task.key, taskTitle: task.title })}>{mine ? "You’re helping here" : "I’ll take this"}</button></article>; })}</div><div className="reconvene"><span>RECONVENE</span><p>Bring back one finding, its source, and why it changes the decision.</p></div></section>;
}

function ResourceLibrary({ curveball }: { curveball: boolean }) {
  const all = curveball ? [...resources, { title: "Joint Regulatory Bulletin", type: "MD", file: "/resources/SR-26-11_regulatory_bulletin.md", detail: "New requirements for critical-function engineering and auditability." }] : resources;
  return <section className="library"><div className="section-heading"><h2>Intelligence library</h2><span>{all.length} resources</span></div><div className="resource-grid">{all.map((resource) => <article key={resource.title}><span className="file-type">{resource.type}</span><h3>{resource.title}</h3><p>{resource.detail}</p><a href={resource.file} download>Download locally ↓</a></article>)}</div></section>;
}

function FindingForm({ onSubmit, disabled }: { onSubmit: (data: Record<string, unknown>) => void; disabled: boolean }) {
  const [participantName, setParticipantName] = useState(""); const [insight, setInsight] = useState(""); const [source, setSource] = useState(""); const [implication, setImplication] = useState("");
  return <form className="evidence-form" onSubmit={(event) => { event.preventDefault(); onSubmit({ participantName, insight, source, implication }); setInsight(""); setImplication(""); }}><div className="section-heading"><h2>Add a finding</h2><span>Insight · source · implication</span></div><div className="form-grid"><label>Attendee<input value={participantName} onChange={(event) => setParticipantName(event.target.value)} required /></label><label>Source<input value={source} onChange={(event) => setSource(event.target.value)} placeholder="Usage workbook" required /></label><label className="wide">What did you find?<textarea value={insight} onChange={(event) => setInsight(event.target.value)} required /></label><label className="wide">Why does it change the decision?<textarea value={implication} onChange={(event) => setImplication(event.target.value)} required /></label></div><button className="secondary" disabled={disabled}>Add to team evidence</button></form>;
}

function DecisionForm({ round, onSubmit, disabled }: { round: number; onSubmit: (data: Record<string, unknown>) => void; disabled: boolean }) {
  const [decision, setDecision] = useState(""); const [rationale, setRationale] = useState(""); const [sources, setSources] = useState("");
  return <form className="decision-form" onSubmit={(event) => { event.preventDefault(); onSubmit({ round, decision, rationale, sources }); }}><div className="section-heading"><h2>Lock the team decision</h2><span>{disabled ? "Submitted" : "Executive owner submits"}</span></div><label>Decision<textarea value={decision} onChange={(event) => setDecision(event.target.value)} required disabled={disabled} /></label><label>Rationale and accepted tradeoff<textarea value={rationale} onChange={(event) => setRationale(event.target.value)} required disabled={disabled} /></label><label>Evidence used<input value={sources} onChange={(event) => setSources(event.target.value)} placeholder="Usage workbook; census; policy" required disabled={disabled} /></label><button className="primary" disabled={disabled}>{disabled ? "Decision locked" : "Submit to the market"}</button></form>;
}

function ActionCard({ onSubmit, disabled }: { onSubmit: (data: Record<string, unknown>) => void; disabled: boolean }) {
  const [decision, setDecision] = useState(""); const [rationale, setRationale] = useState(""); const [sources, setSources] = useState("");
  return <form className="decision-form action-card" onSubmit={(event) => { event.preventDefault(); onSubmit({ round: 3, decision, rationale, sources }); }}><p className="kicker">EXECUTIVE TAKEAWAY</p><h2>Your 30-day action card</h2><p>Keep it specific enough to use when you return to your organization.</p><label>What is the first Claude Code deployment decision you will make?<textarea value={decision} onChange={(event) => setDecision(event.target.value)} required disabled={disabled} /></label><label>Who owns it, and what will they do in the next 30 days?<textarea value={rationale} onChange={(event) => setRationale(event.target.value)} required disabled={disabled} /></label><label>What evidence is still missing, and when will you review it?<textarea value={sources} onChange={(event) => setSources(event.target.value)} required disabled={disabled} /></label><button className="primary" disabled={disabled}>{disabled ? "Commitment captured" : "Commit to action"}</button></form>;
}
