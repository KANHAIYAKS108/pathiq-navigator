import { motion, AnimatePresence } from "framer-motion";
import { X, Check, ExternalLink, Clock } from "lucide-react";
import { phaseIconMap } from "@/lib/phaseIcons";
import type { Phase } from "@/lib/ai/types";

interface NodeModalProps {
  phase: Phase | null;
  index: number;
  completed: boolean;
  onToggle: () => void;
  onClose: () => void;
}

export function NodeModal({ phase, index, completed, onToggle, onClose }: NodeModalProps) {
  return (
    <AnimatePresence>
      {phase && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          />
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 40 }}
            transition={{ type: "spring", damping: 28, stiffness: 260 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-card/95 backdrop-blur-xl border-l border-border z-50 overflow-y-auto shadow-elevated"
          >
            <div className="sticky top-0 bg-card/95 backdrop-blur-xl border-b border-border p-5 flex items-center justify-between z-10">
              <div className="text-xs font-mono uppercase tracking-wider text-muted-foreground">
                Phase {index + 1}
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-primary flex items-center justify-center shadow-glow shrink-0">
                  {(() => {
                    const Icon = phaseIconMap[phase.icon] ?? phaseIconMap.rocket;
                    return <Icon className="w-7 h-7 text-primary-foreground" strokeWidth={2.2} />;
                  })()}
                </div>
                <div className="flex-1 min-w-0">
                  <h2 className="text-2xl font-bold leading-tight">{phase.title}</h2>
                  <div className="flex items-center gap-1.5 mt-2 text-xs font-mono text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {phase.duration}
                  </div>
                </div>
              </div>

              <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                {phase.description}
              </p>

              <div className="mb-6">
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                  Skills you'll gain
                </h3>
                <div className="flex flex-wrap gap-2">
                  {phase.skills.map((s) => (
                    <span
                      key={s}
                      className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3">
                  Resources
                </h3>
                <div className="space-y-2">
                  {phase.resources.map((r) => (
                    <a
                      key={r.url + r.title}
                      href={r.url}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between p-3 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all"
                    >
                      <div className="min-w-0">
                        <div className="text-sm font-semibold truncate">{r.title}</div>
                        <div className="text-[11px] font-mono uppercase text-muted-foreground mt-0.5">
                          {r.type}
                        </div>
                      </div>
                      <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 ml-3" />
                    </a>
                  ))}
                </div>
              </div>

              <button
                onClick={onToggle}
                className={`w-full py-3.5 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${
                  completed
                    ? "bg-success/15 text-success border border-success/30"
                    : "bg-gradient-primary text-primary-foreground shadow-glow hover:shadow-violet-glow"
                }`}
              >
                <Check className="w-5 h-5" strokeWidth={3} />
                {completed ? "Completed — undo" : "Mark as complete"}
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
