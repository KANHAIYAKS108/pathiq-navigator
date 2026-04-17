export type PhaseIcon =
  | "rocket"
  | "code"
  | "brain"
  | "zap"
  | "target"
  | "trophy"
  | "book"
  | "globe";

export interface Resource {
  title: string;
  type: "course" | "book" | "project" | "video" | "article";
  url: string;
}

export interface Phase {
  id: string;
  title: string;
  duration: string;
  icon: PhaseIcon;
  description: string;
  skills: string[];
  resources: Resource[];
}

export interface RoadmapData {
  title: string;
  summary: string;
  totalWeeks: number;
  phases: Phase[];
  edges: { from: string; to: string }[];
}
