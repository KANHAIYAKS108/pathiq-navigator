import { createFileRoute, Link, notFound, useRouter } from "@tanstack/react-router";
import { ArrowLeft, GitBranch } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { RoadmapFlow } from "@/components/roadmap/RoadmapFlow";
import { useRoadmapStore } from "@/store/useRoadmapStore";
import type { RoadmapData } from "@/lib/ai/types";

export const Route = createFileRoute("/roadmap/$id")({
  loader: async ({ params }) => {
    const { data, error } = await supabase
      .from("roadmaps")
      .select("id, career, skill_level, hours_per_day, data")
      .eq("id", params.id)
      .maybeSingle();
    if (error || !data) throw notFound();
    return {
      id: data.id,
      career: data.career,
      skillLevel: data.skill_level,
      hoursPerDay: data.hours_per_day,
      roadmap: data.data as unknown as RoadmapData,
    };
  },
  errorComponent: ErrorView,
  notFoundComponent: NotFoundView,
  component: RoadmapPage,
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData ? `${loaderData.roadmap.title} · PathIq` : "Roadmap · PathIq",
      },
      {
        name: "description",
        content: loaderData?.roadmap.summary ?? "Your personalized learning roadmap.",
      },
    ],
  }),
});

function RoadmapPage() {
  const { id, career, roadmap } = Route.useLoaderData();
  const completed = useRoadmapStore((s) => s.completed);
  const completedCount = roadmap.phases.filter((p) => completed[p.id]).length;
  const pct = Math.round((completedCount / roadmap.phases.length) * 100);

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden">
      {/* Header */}
      <header className="shrink-0 px-4 md:px-6 py-3.5 border-b border-border glass z-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-muted-foreground hover:text-foreground transition-colors shrink-0"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Link>
          <div className="h-5 w-px bg-border" />
          <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center shrink-0">
            <GitBranch className="w-4 h-4 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <div className="min-w-0">
            <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground truncate">
              {career}
            </div>
            <div className="text-sm md:text-base font-bold truncate">{roadmap.title}</div>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <div className="text-right">
            <div className="text-[10px] font-mono uppercase text-muted-foreground">Progress</div>
            <div className="text-sm font-bold">
              {completedCount}/{roadmap.phases.length} · {pct}%
            </div>
          </div>
          <div className="w-32 h-2 rounded-full bg-muted overflow-hidden">
            <div
              className="h-full bg-gradient-primary transition-all duration-500"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>
      </header>

      {/* Canvas */}
      <main className="flex-1 relative">
        <RoadmapFlow roadmapId={id} roadmap={roadmap} />
      </main>
    </div>
  );
}

function ErrorView({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <h1 className="text-2xl font-bold">Couldn't load this roadmap</h1>
        <p className="mt-2 text-sm text-muted-foreground">{error.message}</p>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground font-semibold"
          >
            Retry
          </button>
          <Link
            to="/"
            className="px-4 py-2 rounded-lg border border-border font-semibold hover:bg-muted"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

function NotFoundView() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Roadmap not found</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          The link may be broken or the roadmap was removed.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block px-4 py-2 rounded-lg bg-gradient-primary text-primary-foreground font-semibold"
        >
          Build a new roadmap
        </Link>
      </div>
    </div>
  );
}
