import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const root = new URL("../", import.meta.url);

test("builds the Project Catalyst experience without starter residue", async () => {
  const [page, layout, client] = await Promise.all([
    readFile(new URL("app/page.tsx", root), "utf8"),
    readFile(new URL("app/layout.tsx", root), "utf8"),
    readFile(new URL("dist/client/.vite/manifest.json", root), "utf8"),
  ]);
  assert.match(page, /Project Catalyst \| FSI Executive Simulation/i);
  assert.match(layout, /FSI executive simulation for enterprise Claude Code adoption/i);
  assert.match(client, /CatalystApp/);
  assert.doesNotMatch(`${page}${layout}${client}`, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("ships the full workshop surface and resource library", async () => {
  const app = await readFile(new URL("app/CatalystApp.tsx", root), "utf8");
  const api = await readFile(new URL("app/api/workshop/route.ts", root), "utf8");
  for (const text of ["Create instructor room", "Enter the banking market", "Banking Leadership Index", "Intelligence library", "Your 30-day action card"]) {
    assert.match(app, new RegExp(text));
  }
  for (const action of ["createWorkshop", "createTeam", "joinRole", "addFinding", "addDecision", "releaseHint", "releaseCurveball"]) {
    assert.match(api, new RegExp(action));
  }
  for (const path of [
    "public/resources/claude_usage_capacity.csv",
    "public/resources/developer_census.csv",
    "public/resources/pilot_results.csv",
    "public/resources/budget_FY.csv",
    "public/resources/developer_sentiment_survey.md",
    "public/resources/ai_policy_and_regulation.md",
    "public/resources/SR-26-11_regulatory_bulletin.md",
    "drizzle/0000_goofy_christian_walker.sql",
  ]) await access(new URL(path, root));
});
