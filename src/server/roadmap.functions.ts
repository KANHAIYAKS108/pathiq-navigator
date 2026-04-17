import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { buildRoadmapPrompt } from "@/lib/ai/promptBuilder";
import { parseRoadmapResponse } from "@/lib/ai/responseParser";
import type { RoadmapData } from "@/lib/ai/types";

const InputSchema = z.object({
  career: z.string().min(2).max(120),
  skillLevel: z.enum(["beginner", "intermediate", "advanced"]),
  hoursPerDay: z.number().int().min(1).max(12),
});

export const generateRoadmap = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return { error: "AI service not configured", id: null as string | null };
    }

    const prompt = buildRoadmapPrompt(data.career, data.skillLevel, data.hoursPerDay);

    try {
      const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: [
            {
              role: "system",
              content:
                "You are PathIq, an expert career coach. Always respond with strict valid JSON only — no markdown fences, no commentary.",
            },
            { role: "user", content: prompt },
          ],
        }),
      });

      if (!res.ok) {
        if (res.status === 429) {
          return { error: "Rate limit exceeded — try again in a moment.", id: null };
        }
        if (res.status === 402) {
          return {
            error: "AI credits exhausted. Add funds in Workspace → Usage.",
            id: null,
          };
        }
        const t = await res.text();
        console.error("AI gateway error", res.status, t);
        return { error: "AI generation failed.", id: null };
      }

      const json = await res.json();
      const raw = json.choices?.[0]?.message?.content as string | undefined;
      if (!raw) return { error: "Empty AI response.", id: null };

      let roadmap: RoadmapData;
      try {
        roadmap = parseRoadmapResponse(raw);
      } catch (e) {
        console.error("Roadmap parse failed:", e, raw.slice(0, 500));
        return { error: "Could not parse the AI response. Try again.", id: null };
      }

      const { data: inserted, error: dbError } = await supabaseAdmin
        .from("roadmaps")
        .insert([
          {
            career: data.career,
            skill_level: data.skillLevel,
            hours_per_day: data.hoursPerDay,
            data: roadmap as unknown as import("@/integrations/supabase/types").Json,
          },
        ])
        .select("id")
        .single();

      if (dbError || !inserted) {
        console.error("DB insert failed:", dbError);
        return { error: "Could not save roadmap.", id: null };
      }

      return { error: null as string | null, id: inserted.id as string };
    } catch (e) {
      console.error("generateRoadmap error:", e);
      return { error: "Unexpected error. Please try again.", id: null };
    }
  });
