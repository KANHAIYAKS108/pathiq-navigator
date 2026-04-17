import { motion } from "framer-motion";
import stepInput from "@/assets/step-input.jpg";
import stepAi from "@/assets/step-ai.jpg";
import stepRoadmap from "@/assets/step-roadmap.jpg";
import stepProgress from "@/assets/step-progress.jpg";

const steps = [
  {
    n: "01",
    title: "Describe your ambition",
    body: "Tell PathIq the role you're chasing, your current level, and how many hours a day you can give. One sentence is enough.",
    image: stepInput,
  },
  {
    n: "02",
    title: "Gemini composes your map",
    body: "Our AI orchestrator reasons across thousands of paths and assembles a 6–9 phase roadmap tailored to you in seconds.",
    image: stepAi,
  },
  {
    n: "03",
    title: "Explore an interactive canvas",
    body: "Pan, zoom, and click any milestone to reveal the curated skills, projects, and resources behind it.",
    image: stepRoadmap,
  },
  {
    n: "04",
    title: "Track every breakthrough",
    body: "Mark phases complete. Watch the path light up. Return any time and pick up exactly where you stopped.",
    image: stepProgress,
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative z-10 px-6 md:px-10 py-24 md:py-32 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-20"
      >
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4">
          The mechanism
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          How <em className="italic font-normal text-gradient-primary">it works</em>
        </h2>
        <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          A four-step orchestration between you and a state-of-the-art AI. Quietly powerful.
        </p>
      </motion.div>

      <div className="space-y-24 md:space-y-32">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`grid md:grid-cols-2 gap-10 md:gap-16 items-center ${
              i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
            }`}
          >
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-primary opacity-20 blur-3xl group-hover:opacity-40 transition-opacity rounded-full" />
              <div className="relative overflow-hidden rounded-3xl shadow-elevated border border-border">
                <img
                  src={s.image}
                  alt={s.title}
                  loading="lazy"
                  width={1280}
                  height={960}
                  className="w-full h-[320px] md:h-[420px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>
            </div>

            <div>
              <div className="font-mono text-sm text-primary tracking-[0.3em] mb-4">
                STEP · {s.n}
              </div>
              <h3 className="text-3xl md:text-5xl font-bold tracking-tight leading-[1.05] mb-5">
                {s.title.split(" ").map((w, idx, arr) =>
                  idx === arr.length - 1 ? (
                    <em key={idx} className="italic font-normal text-gradient-primary">
                      {w}
                    </em>
                  ) : (
                    <span key={idx}>{w} </span>
                  ),
                )}
              </h3>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                {s.body}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
