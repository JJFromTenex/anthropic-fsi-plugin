import { env } from "cloudflare:workers";

const statements = [
  `CREATE TABLE IF NOT EXISTS workshops (
    id TEXT PRIMARY KEY, code TEXT NOT NULL UNIQUE, instructor_token TEXT NOT NULL,
    stage TEXT NOT NULL DEFAULT 'lobby', paused INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL, expires_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS teams (
    id TEXT PRIMARY KEY, workshop_id TEXT NOT NULL, name TEXT NOT NULL, ticker TEXT NOT NULL,
    team_token TEXT NOT NULL, status TEXT NOT NULL DEFAULT 'forming',
    value_score INTEGER NOT NULL DEFAULT 50, trust_score INTEGER NOT NULL DEFAULT 50,
    workforce_score INTEGER NOT NULL DEFAULT 50, execution_score INTEGER NOT NULL DEFAULT 50,
    created_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS participants (
    id TEXT PRIMARY KEY, team_id TEXT NOT NULL, display_name TEXT NOT NULL,
    role TEXT NOT NULL, joined_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS findings (
    id TEXT PRIMARY KEY, team_id TEXT NOT NULL, participant_name TEXT NOT NULL,
    insight TEXT NOT NULL, source TEXT NOT NULL, implication TEXT NOT NULL, created_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS decisions (
    id TEXT PRIMARY KEY, team_id TEXT NOT NULL, round INTEGER NOT NULL,
    decision TEXT NOT NULL, rationale TEXT NOT NULL, sources TEXT NOT NULL, created_at TEXT NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS events (
    id TEXT PRIMARY KEY, workshop_id TEXT NOT NULL, team_id TEXT,
    type TEXT NOT NULL, title TEXT NOT NULL, body TEXT NOT NULL, created_at TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS teams_workshop_idx ON teams(workshop_id)`,
  `CREATE INDEX IF NOT EXISTS participants_team_idx ON participants(team_id)`,
  `CREATE INDEX IF NOT EXISTS events_workshop_idx ON events(workshop_id)`,
];

export async function ensureSchema() {
  if (!env.DB) throw new Error("D1 binding DB is unavailable");
  await env.DB.batch(statements.map((sql) => env.DB.prepare(sql)));
  const now = new Date().toISOString();
  const expired = "SELECT id FROM workshops WHERE expires_at < ?";
  await env.DB.batch([
    env.DB.prepare(`DELETE FROM participants WHERE team_id IN (SELECT id FROM teams WHERE workshop_id IN (${expired}))`).bind(now),
    env.DB.prepare(`DELETE FROM findings WHERE team_id IN (SELECT id FROM teams WHERE workshop_id IN (${expired}))`).bind(now),
    env.DB.prepare(`DELETE FROM decisions WHERE team_id IN (SELECT id FROM teams WHERE workshop_id IN (${expired}))`).bind(now),
    env.DB.prepare(`DELETE FROM events WHERE workshop_id IN (${expired})`).bind(now),
    env.DB.prepare(`DELETE FROM teams WHERE workshop_id IN (${expired})`).bind(now),
    env.DB.prepare("DELETE FROM workshops WHERE expires_at < ?").bind(now),
  ]);
  return env.DB;
}

export function token(bytes = 18) {
  const values = crypto.getRandomValues(new Uint8Array(bytes));
  return Array.from(values, (value) => value.toString(16).padStart(2, "0")).join("");
}

export function workshopCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  return `FSI-${Array.from(bytes, (value) => alphabet[value % alphabet.length]).join("")}`;
}

export function safeTicker(value: string) {
  return value.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 5) || "BANK";
}
