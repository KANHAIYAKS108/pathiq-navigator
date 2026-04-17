import { Handle, Position, type NodeProps } from "@xyflow/react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { phaseIconMap } from "@/lib/phaseIcons";
import type { PhaseIcon } from "@/lib/ai/types";

export interface CustomNodeData {
  title: string;
  duration: string;
  icon: PhaseIcon;
  index: number;
  completed: boolean;
  [key: string]: unknown;
}

export function CustomNode({ data, selected }: NodeProps) {
  const d = data as CustomNodeData;
  const Icon = phaseIconMap[d.icon] ?? phaseIconMap.rocket;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: d.index * 0.05, type: "spring", stiffness: 200, damping: 20 }}
      className={`group relative w-[220px] rounded-2xl border-2 backdrop-blur-xl transition-all duration-300 cursor-pointer ${
        d.completed
          ? "border-success bg-success/10"
          : selected
            ? "border-primary bg-primary/10 shadow-glow"
            : "border-border bg-card/80 hover:border-primary/50 hover:shadow-glow"
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!w-3 !h-3 !bg-primary !border-2 !border-background"
      />

      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div
            className={`inline-flex items-center justify-center w-10 h-10 rounded-xl transition-all ${
              d.completed
                ? "bg-success/20 text-success"
                : "bg-gradient-primary text-primary-foreground"
            }`}
          >
            {d.completed ? <Check className="w-5 h-5" strokeWidth={3} /> : <Icon className="w-5 h-5" strokeWidth={2.2} />}
          </div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground bg-muted/60 px-2 py-1 rounded-md">
            {d.duration}
          </span>
        </div>
        <div className="text-xs font-mono text-muted-foreground mb-1">
          Phase {d.index + 1}
        </div>
        <div className="text-base font-bold leading-tight text-foreground">{d.title}</div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!w-3 !h-3 !bg-primary !border-2 !border-background"
      />
    </motion.div>
  );
}
