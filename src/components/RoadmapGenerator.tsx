import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { Sparkles, Loader2 } from "lucide-react";
import { generateRoadmap } from "@/server/roadmap.functions";
import { toast } from "sonner";

export function RoadmapGenerator() {
  const navigate = useNavigate();
  const generate = useServerFn(generateRoadmap);
  const [career, setCareer] = useState("");
  const [skillLevel, setSkillLevel] = useState<"beginner" | "intermediate" | "advanced">(
    "beginner",
  );
  const [hoursPerDay, setHoursPerDay] = useState(2);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!career.trim()) return;
    setLoading(true);
    try {
      const result = await generate({ data: { career: career.trim(), skillLevel, hoursPerDay } });
      if (result.error || !result.id) {
        toast.error(result.error ?? "Generation failed");
        return;
      }
      navigate({ to: "/roadmap/$id", params: { id: result.id } });
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.form
      onSubmit={onSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.6 }}
      className="glass rounded-3xl p-6 md:p-8 shadow-elevated max-w-2xl mx-auto w-full"
    >
      <label className="block">
        <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
          What career do you want to build?
        </span>
        <input
          type="text"
          value={career}
          onChange={(e) => setCareer(e.target.value)}
          placeholder="e.g. Senior Machine Learning Engineer"
          className="mt-2 w-full bg-input/60 border border-border rounded-xl px-4 py-3.5 text-base md:text-lg font-medium placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/30 transition-all"
          required
          maxLength={120}
        />
      </label>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Current level
          </span>
          <div className="mt-2 grid grid-cols-3 gap-1.5 p-1 bg-input/40 rounded-xl border border-border">
            {(["beginner", "intermediate", "advanced"] as const).map((lvl) => (
              <button
                type="button"
                key={lvl}
                onClick={() => setSkillLevel(lvl)}
                className={`py-2 text-xs font-semibold rounded-lg capitalize transition-all ${
                  skillLevel === lvl
                    ? "bg-gradient-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
            Hours / day · <span className="text-primary">{hoursPerDay}h</span>
          </span>
          <input
            type="range"
            min={1}
            max={8}
            value={hoursPerDay}
            onChange={(e) => setHoursPerDay(Number(e.target.value))}
            className="mt-3 w-full accent-primary"
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading || !career.trim()}
        className="mt-6 w-full bg-gradient-primary text-primary-foreground font-bold py-4 rounded-xl shadow-glow hover:shadow-violet-glow transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-base group"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Charting your path…
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Generate my roadmap
          </>
        )}
      </button>
      <p className="mt-3 text-center text-xs text-muted-foreground font-mono">
        Powered by Gemini 2.5 Flash · ~10s
      </p>
    </motion.form>
  );
}
