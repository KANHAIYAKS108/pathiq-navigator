import { motion } from "framer-motion";
import { Rocket, Code2, Brain, Zap, Target, Trophy } from "lucide-react";
import { useEffect, useState } from "react";

const demoNodes = [
  { id: 1, title: "Foundations", duration: "2 weeks", icon: Rocket },
  { id: 2, title: "Core Skills", duration: "3 weeks", icon: Code2 },
  { id: 3, title: "Deep Concepts", duration: "4 weeks", icon: Brain },
  { id: 4, title: "Advanced", duration: "3 weeks", icon: Zap },
  { id: 5, title: "Specialization", duration: "4 weeks", icon: Target },
  { id: 6, title: "Portfolio", duration: "2 weeks", icon: Trophy },
];

export function VisualDemo() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((i) => (i + 1) % demoNodes.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[420px] glass rounded-3xl p-6 overflow-hidden shadow-elevated">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-accent/30 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col h-full">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-warning/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-success/70" />
          </div>
          <div className="text-xs font-mono text-muted-foreground">
            pathiq.app/roadmap/<span className="text-primary">live</span>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-3 gap-4 content-center">
          {demoNodes.map((n, i) => {
            const Icon = n.icon;
            const isActive = i === active;
            const isDone = i < active;
            return (
              <motion.div
                key={n.id}
                animate={{
                  scale: isActive ? 1.05 : 1,
                  opacity: isActive || isDone ? 1 : 0.55,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 22 }}
                className={`relative rounded-2xl p-4 border transition-colors ${
                  isActive
                    ? "border-primary bg-primary/10 shadow-glow"
                    : isDone
                      ? "border-success/40 bg-success/5"
                      : "border-border bg-card/40"
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center w-9 h-9 rounded-xl mb-2 ${
                    isActive
                      ? "bg-gradient-primary text-primary-foreground"
                      : isDone
                        ? "bg-success/20 text-success"
                        : "bg-muted text-muted-foreground"
                  }`}
                >
                  <Icon className="w-4.5 h-4.5" strokeWidth={2.2} />
                </div>
                <div className="text-sm font-semibold">{n.title}</div>
                <div className="text-[11px] font-mono text-muted-foreground mt-0.5">
                  {n.duration}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs font-mono text-muted-foreground">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
          AI generating step {active + 1} of {demoNodes.length}…
        </div>
      </div>
    </div>
  );
}
