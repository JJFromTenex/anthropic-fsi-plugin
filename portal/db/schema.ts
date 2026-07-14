import { integer, sqliteTable, text, uniqueIndex } from "drizzle-orm/sqlite-core";

export const workshops = sqliteTable("workshops", {
  id: text("id").primaryKey(),
  code: text("code").notNull().unique(),
  instructorToken: text("instructor_token").notNull(),
  stage: text("stage").notNull().default("lobby"),
  paused: integer("paused", { mode: "boolean" }).notNull().default(false),
  createdAt: text("created_at").notNull(),
  expiresAt: text("expires_at").notNull(),
});

export const teams = sqliteTable("teams", {
  id: text("id").primaryKey(),
  workshopId: text("workshop_id").notNull(),
  name: text("name").notNull(),
  ticker: text("ticker").notNull(),
  teamToken: text("team_token").notNull(),
  status: text("status").notNull().default("forming"),
  valueScore: integer("value_score").notNull().default(50),
  trustScore: integer("trust_score").notNull().default(50),
  workforceScore: integer("workforce_score").notNull().default(50),
  executionScore: integer("execution_score").notNull().default(50),
  createdAt: text("created_at").notNull(),
});

export const participants = sqliteTable("participants", {
  id: text("id").primaryKey(),
  teamId: text("team_id").notNull(),
  displayName: text("display_name").notNull(),
  role: text("role").notNull(),
  joinedAt: text("joined_at").notNull(),
});

export const contributions = sqliteTable("contributions", {
  id: text("id").primaryKey(),
  teamId: text("team_id").notNull(),
  stage: text("stage").notNull(),
  taskKey: text("task_key").notNull(),
  taskTitle: text("task_title").notNull(),
  participantName: text("participant_name").notNull(),
  claimedAt: text("claimed_at").notNull(),
}, (table) => [
  uniqueIndex("contributions_claim_idx").on(table.teamId, table.stage, table.taskKey, table.participantName),
]);

export const findings = sqliteTable("findings", {
  id: text("id").primaryKey(),
  teamId: text("team_id").notNull(),
  participantName: text("participant_name").notNull(),
  insight: text("insight").notNull(),
  source: text("source").notNull(),
  implication: text("implication").notNull(),
  createdAt: text("created_at").notNull(),
});

export const decisions = sqliteTable("decisions", {
  id: text("id").primaryKey(),
  teamId: text("team_id").notNull(),
  round: integer("round").notNull(),
  decision: text("decision").notNull(),
  rationale: text("rationale").notNull(),
  sources: text("sources").notNull(),
  createdAt: text("created_at").notNull(),
});

export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  workshopId: text("workshop_id").notNull(),
  teamId: text("team_id"),
  type: text("type").notNull(),
  title: text("title").notNull(),
  body: text("body").notNull(),
  createdAt: text("created_at").notNull(),
});
