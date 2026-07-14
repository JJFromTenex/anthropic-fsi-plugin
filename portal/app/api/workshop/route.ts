import { NextRequest, NextResponse } from "next/server";
import { ensureSchema, safeTicker, token, workshopCode } from "@/lib/workshop-db";

const stages = ["lobby", "baseline", "review", "curveball", "response", "board", "closed"];

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

async function workshopByCode(db: D1Database, code: string) {
  return db.prepare("SELECT * FROM workshops WHERE code = ?").bind(code.toUpperCase()).first<Record<string, unknown>>();
}

async function teamByToken(db: D1Database, teamId: string, teamToken: string) {
  return db.prepare("SELECT * FROM teams WHERE id = ? AND team_token = ?").bind(teamId, teamToken).first<Record<string, unknown>>();
}

export async function GET(request: NextRequest) {
  try {
    const db = await ensureSchema();
    const code = request.nextUrl.searchParams.get("code")?.toUpperCase();
    if (!code) return jsonError("Workshop code is required");
    const workshop = await workshopByCode(db, code);
    if (!workshop) return jsonError("Workshop not found", 404);

    const teams = await db.prepare(
      `SELECT id, name, ticker, status, value_score, trust_score, workforce_score,
       execution_score, created_at FROM teams WHERE workshop_id = ? ORDER BY created_at`,
    ).bind(workshop.id).all();
    const teamIds = (teams.results as Array<{ id: string }>).map((team) => team.id);
    const contributions = teamIds.length
      ? await db.prepare(`SELECT id, team_id, stage, task_key, task_title, participant_name, claimed_at FROM contributions WHERE team_id IN (${teamIds.map(() => "?").join(",")}) ORDER BY claimed_at`).bind(...teamIds).all()
      : { results: [] };
    const findings = teamIds.length
      ? await db.prepare(`SELECT id, team_id, participant_name, insight, source, implication, created_at FROM findings WHERE team_id IN (${teamIds.map(() => "?").join(",")}) ORDER BY created_at`).bind(...teamIds).all()
      : { results: [] };
    const decisions = teamIds.length
      ? await db.prepare(`SELECT id, team_id, round, decision, rationale, sources, created_at FROM decisions WHERE team_id IN (${teamIds.map(() => "?").join(",")}) ORDER BY created_at`).bind(...teamIds).all()
      : { results: [] };
    const events = await db.prepare("SELECT id, team_id, type, title, body, created_at FROM events WHERE workshop_id = ? ORDER BY created_at DESC LIMIT 30").bind(workshop.id).all();

    return NextResponse.json({
      workshop: { id: workshop.id, code: workshop.code, stage: workshop.stage, paused: Boolean(workshop.paused), expiresAt: workshop.expires_at },
      teams: teams.results,
      contributions: contributions.results,
      findings: findings.results,
      decisions: decisions.results,
      events: events.results,
    });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to load workshop", 500);
  }
}

export async function POST(request: NextRequest) {
  try {
    const db = await ensureSchema();
    const body = await request.json() as Record<string, unknown>;
    const action = String(body.action || "");
    const now = new Date().toISOString();

    if (action === "createWorkshop") {
      const id = crypto.randomUUID();
      const code = workshopCode();
      const instructorToken = token();
      const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
      await db.prepare("INSERT INTO workshops (id, code, instructor_token, stage, paused, created_at, expires_at) VALUES (?, ?, ?, 'lobby', 0, ?, ?)")
        .bind(id, code, instructorToken, now, expiresAt).run();
      await db.prepare("INSERT INTO events (id, workshop_id, type, title, body, created_at) VALUES (?, ?, 'system', 'Market lobby opened', 'Banks may now enter the Catalyst Exchange.', ?)")
        .bind(crypto.randomUUID(), id, now).run();
      return NextResponse.json({ code, instructorToken });
    }

    const code = String(body.code || "").toUpperCase();
    const workshop = await workshopByCode(db, code);
    if (!workshop) return jsonError("Workshop not found", 404);

    if (action === "createTeam") {
      const name = String(body.name || "").trim().slice(0, 60);
      const ticker = safeTicker(String(body.ticker || name));
      if (name.length < 2) return jsonError("Enter a bank name");
      const duplicate = await db.prepare("SELECT id FROM teams WHERE workshop_id = ? AND (lower(name) = lower(?) OR ticker = ?)").bind(workshop.id, name, ticker).first();
      if (duplicate) return jsonError("That bank name or ticker is already in the market");
      const id = crypto.randomUUID();
      const teamToken = token();
      await db.prepare("INSERT INTO teams (id, workshop_id, name, ticker, team_token, created_at) VALUES (?, ?, ?, ?, ?, ?)")
        .bind(id, workshop.id, name, ticker, teamToken, now).run();
      await db.prepare("INSERT INTO events (id, workshop_id, team_id, type, title, body, created_at) VALUES (?, ?, ?, 'listing', ?, ?, ?)")
        .bind(crypto.randomUUID(), workshop.id, id, `${ticker} enters pre-market`, `${name} is ready to investigate its first deployment decision.`, now).run();
      return NextResponse.json({ teamId: id, teamToken, ticker });
    }

    if (action === "joinTeam") {
      const teamId = String(body.teamId || "");
      const team = await db.prepare("SELECT id, team_token, ticker FROM teams WHERE id = ? AND workshop_id = ?").bind(teamId, workshop.id).first<{ id: string; team_token: string; ticker: string }>();
      if (!team) return jsonError("Team not found", 404);
      return NextResponse.json({ teamId: team.id, teamToken: team.team_token, ticker: team.ticker });
    }

    if (action === "claimContribution" || action === "releaseContribution") {
      const teamId = String(body.teamId || "");
      const teamToken = String(body.teamToken || "");
      if (!(await teamByToken(db, teamId, teamToken))) return jsonError("Invalid team access", 403);
      if (action === "releaseContribution") {
        await db.prepare("DELETE FROM contributions WHERE id = ? AND team_id = ?").bind(String(body.contributionId || ""), teamId).run();
        return NextResponse.json({ ok: true });
      }
      const participantName = String(body.participantName || "").trim().slice(0, 50);
      const stage = String(body.stage || "").trim();
      const taskKey = String(body.taskKey || "").trim().slice(0, 50);
      const taskTitle = String(body.taskTitle || "").trim().slice(0, 100);
      if (!participantName || !taskKey || !taskTitle) return jsonError("Name and contribution are required");
      if (stage !== workshop.stage) return jsonError("The workshop has moved to a new stage. Refresh and choose again.");
      await db.prepare("INSERT OR IGNORE INTO contributions (id, team_id, stage, task_key, task_title, participant_name, claimed_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
        .bind(crypto.randomUUID(), teamId, stage, taskKey, taskTitle, participantName, now).run();
      await db.prepare("UPDATE teams SET status = 'investigating' WHERE id = ? AND status = 'forming'").bind(teamId).run();
      return NextResponse.json({ ok: true });
    }

    if (action === "addFinding" || action === "addDecision") {
      const teamId = String(body.teamId || "");
      const teamToken = String(body.teamToken || "");
      if (!(await teamByToken(db, teamId, teamToken))) return jsonError("Invalid team access", 403);
      if (action === "addFinding") {
        await db.prepare("INSERT INTO findings (id, team_id, participant_name, insight, source, implication, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
          .bind(crypto.randomUUID(), teamId, String(body.participantName || "Team"), String(body.insight || ""), String(body.source || ""), String(body.implication || ""), now).run();
        return NextResponse.json({ ok: true });
      }
      const round = Number(body.round || 1);
      if (![1, 2, 3].includes(round)) return jsonError("Invalid decision round");
      await db.prepare("INSERT INTO decisions (id, team_id, round, decision, rationale, sources, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)")
        .bind(crypto.randomUUID(), teamId, round, String(body.decision || ""), String(body.rationale || ""), String(body.sources || ""), now).run();
      if (round === 3) {
        const team = await db.prepare("SELECT name, ticker FROM teams WHERE id = ?").bind(teamId).first<{ name: string; ticker: string }>();
        await db.prepare("UPDATE teams SET status = 'action committed' WHERE id = ?").bind(teamId).run();
        await db.prepare("INSERT INTO events (id, workshop_id, team_id, type, title, body, created_at) VALUES (?, ?, ?, 'commitment', ?, ?, ?)")
          .bind(crypto.randomUUID(), workshop.id, teamId, `${team?.ticker} commits to action`, `${team?.name} named its first real-world deployment decision, accountable owner, and next evidence check.`, now).run();
        return NextResponse.json({ ok: true });
      }
      const delta = round === 1 ? [6, 4, 3, 5] : [4, 7, 5, 6];
      await db.prepare("UPDATE teams SET value_score = min(100, value_score + ?), trust_score = min(100, trust_score + ?), workforce_score = min(100, workforce_score + ?), execution_score = min(100, execution_score + ?), status = ? WHERE id = ?")
        .bind(...delta, round === 1 ? "baseline submitted" : "board ready", teamId).run();
      const team = await db.prepare("SELECT name, ticker FROM teams WHERE id = ?").bind(teamId).first<{ name: string; ticker: string }>();
      await db.prepare("INSERT INTO events (id, workshop_id, team_id, type, title, body, created_at) VALUES (?, ?, ?, 'milestone', ?, ?, ?)")
        .bind(crypto.randomUUID(), workshop.id, teamId, `${team?.ticker} advances`, round === 1 ? `${team?.name} submitted an evidence-backed deployment strategy.` : `${team?.name} completed its response to the market shock.`, now).run();
      return NextResponse.json({ ok: true });
    }

    const instructorToken = String(body.instructorToken || "");
    if (instructorToken !== workshop.instructor_token) return jsonError("Invalid instructor access", 403);

    if (action === "advanceStage") {
      const requested = String(body.stage || "");
      if (!stages.includes(requested)) return jsonError("Invalid stage");
      await db.prepare("UPDATE workshops SET stage = ?, paused = 0 WHERE id = ?").bind(requested, workshop.id).run();
      return NextResponse.json({ ok: true });
    }
    if (action === "togglePause") {
      await db.prepare("UPDATE workshops SET paused = CASE paused WHEN 1 THEN 0 ELSE 1 END WHERE id = ?").bind(workshop.id).run();
      return NextResponse.json({ ok: true });
    }
    if (action === "releaseHint") {
      const level = Number(body.level || 1);
      const messages = [
        "What evidence would let you distinguish between a fast rollout and a defensible one?",
        "Compare observed usage, population readiness, and the fixed cost envelope.",
        "The usage workbook and developer census can be combined to test whether equal allocation is efficient.",
      ];
      await db.prepare("INSERT INTO events (id, workshop_id, team_id, type, title, body, created_at) VALUES (?, ?, ?, 'hint', ?, ?, ?)")
        .bind(crypto.randomUUID(), workshop.id, body.teamId ? String(body.teamId) : null, level === 1 ? "Facilitator hint" : "Facilitator clue", messages[Math.max(0, Math.min(2, level - 1))], now).run();
      return NextResponse.json({ ok: true });
    }
    if (action === "releaseCurveball") {
      await db.prepare("UPDATE workshops SET stage = 'curveball' WHERE id = ?").bind(workshop.id).run();
      await db.prepare("INSERT INTO events (id, workshop_id, type, title, body, created_at) VALUES (?, ?, 'curveball', 'Sector-wide regulatory alert', 'OCC and FCA guidance now requires validation, human attestation, and a 12-month audit trail for critical-function engineering. Updated intelligence is available.', ?)")
        .bind(crypto.randomUUID(), workshop.id, now).run();
      return NextResponse.json({ ok: true });
    }

    return jsonError("Unknown action");
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Request failed", 500);
  }
}
