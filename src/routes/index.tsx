import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Sparkles, GitBranch, Zap, ArrowRight } from "lucide-react";
import { VisualDemo } from "@/components/VisualDemo";
import { RoadmapGenerator } from "@/components/RoadmapGenerator";
import { HowItWorks } from "@/components/HowItWorks";
import { HowToUse } from "@/components/HowToUse";
import heroNeural from "@/assets/hero-neural.jpg";
import ctaBanner from "@/assets/cta-banner.jpg";
import ambientParticles from "@/assets/ambient-particles.mp4.asset.json";

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
      { property: "og:image", content: heroNeural },
      { name: "twitter:image", content: heroNeural },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Ambient hero video — sits behind everything */}
      <div className="absolute inset-x-0 top-0 h-[100vh] overflow-hidden pointer-events-none">
        <video
          src={ambientParticles.url}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/60 to-background" />
      </div>
      <div className="absolute inset-0 bg-gradient-aurora pointer-events-none" />
      <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />

      {/* Nav */}
      <header className="relative z-10 px-6 md:px-10 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-primary shadow-glow flex items-center justify-center">
            <GitBranch className="w-5 h-5 text-primary-foreground" strokeWidth={2.5} />
          </div>
          <span className="text-2xl font-bold tracking-tight font-display">
            Path<em className="italic text-gradient-primary">Iq</em>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-mono uppercase tracking-[0.2em] text-muted-foreground">
          <a href="#how-it-works" className="hover:text-primary transition-colors">How it works</a>
          <a href="#how-to-use" className="hover:text-primary transition-colors">How to use</a>
          <a href="#generate" className="hover:text-primary transition-colors">Generate</a>
        </nav>
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
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 text-xs font-mono uppercase tracking-[0.25em]"
        >
          <Sparkles className="w-3.5 h-3.5 text-primary" />
          AI Career GPS · v1
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.05 }}
          className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05]"
        >
          From <em className="italic font-normal text-gradient-primary">where you are</em>
          <br />
          to where you{" "}
          <span className="relative italic font-normal">
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
          className="mt-6 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed font-serif italic"
        >
          PathIq turns any career goal into a step-by-step interactive roadmap. Real
          resources, real timelines, generated in seconds.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-10"
          id="generate"
        >
          <RoadmapGenerator />
        </motion.div>
      </section>

      {/* Hero showcase image */}
      <section className="relative z-10 px-6 md:px-10 pb-16 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-gradient-primary opacity-25 blur-3xl group-hover:opacity-40 transition-opacity rounded-full" />
          <div className="relative overflow-hidden rounded-2xl border border-border shadow-elevated max-h-[460px]">
            <img
              src={heroNeural}
              alt="PathIq neural roadmap visualization"
              width={1920}
              height={1080}
              className="w-full h-full object-cover max-h-[460px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
            <div className="absolute bottom-6 md:bottom-8 left-6 md:left-10 right-6 md:right-10">
              <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary mb-2">
                Visualized Intelligence
              </div>
              <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight max-w-xl">
                Every path, <em className="italic font-normal text-gradient-primary">illuminated.</em>
              </h2>
            </div>
          </div>
        </motion.div>
      </section>

      {/* How it works */}
      <HowItWorks />

      {/* Visual demo */}
      <section className="relative z-10 px-6 md:px-10 pb-20 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4">
            See it in action
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            A live canvas, <em className="italic font-normal text-gradient-primary">not a static plan.</em>
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

      {/* How to use */}
      <HowToUse />

      {/* Features */}
      <section className="relative z-10 px-6 md:px-10 pb-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4">
            Why PathIq
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
            Built for the <em className="italic font-normal text-gradient-primary">ambitious.</em>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
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
                className="glass rounded-3xl p-7 hover:shadow-glow transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 rounded-2xl bg-gradient-primary flex items-center justify-center mb-5 shadow-glow">
                  <Icon className="w-5 h-5 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2 tracking-tight">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.body}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Final CTA banner */}
      <section className="relative z-10 px-6 md:px-10 pb-24 max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9 }}
          className="relative overflow-hidden rounded-[2rem] border border-border shadow-elevated"
        >
          <img
            src={ctaBanner}
            alt="A path forward"
            loading="lazy"
            width={1920}
            height={800}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/70 to-background/40" />
          <div className="relative px-8 md:px-16 py-20 md:py-28">
            <div className="max-w-2xl">
              <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4">
                The only step that matters
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-[1.05] mb-5">
                Begin <em className="italic font-normal text-gradient-primary">your path</em> tonight.
              </h2>
              <p className="text-base md:text-lg text-muted-foreground mb-7 max-w-xl">
                In ten seconds you'll have a roadmap a career coach would charge $300 to draft. Then you'll have the rest of your life to walk it.
              </p>
              <a
                href="#generate"
                className="inline-flex items-center gap-3 px-7 py-4 rounded-full bg-gradient-primary text-primary-foreground font-mono uppercase text-sm tracking-[0.2em] shadow-glow hover:shadow-violet-glow transition-all duration-300 hover:scale-105"
              >
                Build your path
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      <footer className="relative z-10 border-t border-border py-10 text-center">
        <div className="font-display text-2xl mb-2">
          Path<em className="italic text-gradient-primary">Iq</em>
        </div>
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
          AI Career GPS · Crafted with intent
        </div>
      </footer>
    </div>
  );
}
