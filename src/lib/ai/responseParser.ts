import type { RoadmapData } from "./types";

export function parseRoadmapResponse(raw: string): RoadmapData {
  // Strip markdown code fences if any
  let cleaned = raw.trim();
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/```\s*$/, "");
  }

  // Extract first {...} JSON block in case of stray text
  const first = cleaned.indexOf("{");
  const last = cleaned.lastIndexOf("}");
  if (first !== -1 && last !== -1) {
    cleaned = cleaned.slice(first, last + 1);
  }

  const parsed = JSON.parse(cleaned) as RoadmapData;

  if (!parsed.phases?.length) {
    throw new Error("Roadmap parse error: no phases");
  }

  // Backfill linear edges if missing
  if (!parsed.edges?.length) {
    parsed.edges = parsed.phases.slice(0, -1).map((p, i) => ({
      from: p.id,
      to: parsed.phases[i + 1].id,
    }));
  }

  return parsed;
}
