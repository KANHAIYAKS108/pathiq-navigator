import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, GitBranch, Zap, ArrowRight } from "lucide-react";
import { VisualDemo } from "@/components/VisualDemo";
import { RoadmapGenerator } from "@/components/RoadmapGenerator";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "PathIq — AI Career GPS for any goal" },
      {
        name: "description",
        content:
          "Turn any career goal into a personalized, interactive learning roadmap. Powered by Gemini 2.5 Flash.",
      },
      { property: "og:title", content: "PathIq — AI Career GPS" },
      {
        property: "og:description",
        content: "Personalized learning roadmaps, generated in seconds.",
      },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-aurora pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

      {/* Nav */}
      <header className="relative z-10 px-6 md:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary shadow-glow flex items-center justify-center">
            <GitBranch className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="text-lg font-bold tracking-tight">
            Path<span className="text-gradient-primary">Iq</span>
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass text-xs font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
          AI online · Gemini 2.5
        </div>
      </header>

      {/* Hero */}
      <section className="relative z-10 px-6 md:px-10 pt-12 md:pt-20 pb-16 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-6 text-xs font-mono uppercase tracking-wider"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          AI Career GPS · v1
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[0.95]"
        >
          From <span className="text-gradient-primary">where you are</span>
          <br />
          to where you{" "}
          <span className="relative">
            want to be.
            <motion.svg
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1.2, delay: 0.8 }}
              viewBox="0 0 300 12"
              className="absolute left-0 -bottom-2 w-full h-3"
              fill="none"
            >
              <motion.path
                d="M2 6 Q 75 0, 150 6 T 298 6"
                stroke="oklch(0.78 0.18 200)"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </motion.svg>
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          PathIq turns any career goal into a step-by-step interactive roadmap. Real
          resources, real timelines, generated in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-12"
          id="generate"
        >
          <RoadmapGenerator />
        </motion.div>
      </section>

      {/* Visual demo */}
      <section className="relative z-10 px-6 md:px-10 pb-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="text-xs font-mono uppercase tracking-wider text-primary mb-3">
            See it in action
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            A live canvas, not a static plan.
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <VisualDemo />
        </motion.div>
      </section>

      {/* Features */}
      <section className="relative z-10 px-6 md:px-10 pb-24 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-4">
          {[
            {
              icon: Zap,
              title: "Generated in seconds",
              body: "Gemini 2.5 Flash builds a tailored 6-9 phase plan in under 10 seconds.",
            },
            {
              icon: GitBranch,
              title: "Interactive canvas",
              body: "Pan, zoom, click. Each node opens skills, resources, and progress.",
            },
            {
              icon: Sparkles,
              title: "Your progress, saved",
              body: "Mark phases complete. Pick up exactly where you left off.",
            },
          ].map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass rounded-2xl p-6 hover:shadow-glow transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center mb-4">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-16 text-center">
          <a
            href="#generate"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-wider text-primary hover:text-accent transition-colors"
          >
            Build your path
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      <footer className="relative z-10 border-t border-border py-8 text-center text-xs font-mono text-muted-foreground">
        PathIq · AI Career GPS
      </footer>
    </div>
  );
}
