import {
  Rocket,
  Code2,
  Brain,
  Zap,
  Target,
  Trophy,
  BookOpen,
  Globe,
  type LucideIcon,
} from "lucide-react";
import type { PhaseIcon } from "@/lib/ai/types";

export const phaseIconMap: Record<PhaseIcon, LucideIcon> = {
  rocket: Rocket,
  code: Code2,
  brain: Brain,
  zap: Zap,
  target: Target,
  trophy: Trophy,
  book: BookOpen,
  globe: Globe,
};
