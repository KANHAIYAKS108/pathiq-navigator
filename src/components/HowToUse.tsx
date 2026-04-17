import { motion } from "framer-motion";
import { PenLine, Wand2, Compass, Trophy } from "lucide-react";
import featurePersonalize from "@/assets/feature-personalize.jpg";
import featurePlan from "@/assets/feature-plan.jpg";
import ambientRoadmap from "@/assets/ambient-roadmap.mp4.asset.json";

const items = [
  {
    icon: PenLine,
    title: "Write your goal",
    body: "Type any role: 'Senior ML Engineer', 'Indie game designer', 'Product manager at a fintech.'",
  },
  {
    icon: Wand2,
    title: "Set the cadence",
    body: "Pick beginner, intermediate, or advanced — and the realistic hours you can commit per day.",
  },
  {
    icon: Compass,
    title: "Walk the canvas",
    body: "Open the live roadmap. Tap nodes to reveal skills, courses, books, and projects worth your time.",
  },
  {
    icon: Trophy,
    title: "Compound the wins",
    body: "Check off milestones. The roadmap remembers. Momentum becomes mastery.",
  },
];

export function HowToUse() {
  return (
    <section id="how-to-use" className="relative z-10 px-6 md:px-10 py-24 md:py-32 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <div className="text-xs font-mono uppercase tracking-[0.3em] text-primary mb-4">
          The user manual
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
          How to <em className="italic font-normal text-gradient-primary">use it</em>
        </h2>
        <p className="mt-5 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
          Four small actions. One large transformation.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-5 gap-6">
        {/* Left collage */}
        <div className="lg:col-span-2 grid grid-cols-2 gap-4 lg:sticky lg:top-8 lg:self-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="col-span-2 relative overflow-hidden rounded-3xl border border-border shadow-elevated aspect-[4/3]"
          >
            <video
              src={ambientRoadmap.url}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/10 to-transparent" />
            <div className="absolute bottom-4 left-5 right-5">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-1">
                Live preview
              </div>
              <div className="font-display text-xl italic">Your map, breathing.</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative overflow-hidden rounded-2xl border border-border aspect-square"
          >
            <img
              src={featurePersonalize}
              alt="Personalized to you"
              loading="lazy"
              width={640}
              height={640}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-3 left-3 font-display italic text-sm">
              Personal
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative overflow-hidden rounded-2xl border border-border aspect-square"
          >
            <img
              src={featurePlan}
              alt="A studied plan"
              loading="lazy"
              width={640}
              height={640}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
            <div className="absolute bottom-3 left-3 font-display italic text-sm">
              Studied
            </div>
          </motion.div>
        </div>

        {/* Right: numbered steps */}
        <div className="lg:col-span-3 space-y-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass rounded-2xl p-6 md:p-7 flex gap-5 hover:shadow-glow transition-all duration-300 group"
              >
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-primary-foreground" strokeWidth={2} />
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-baseline gap-3 mb-1.5">
                    <span className="font-mono text-xs text-primary tracking-[0.25em]">
                      0{i + 1}
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold tracking-tight">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {item.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
