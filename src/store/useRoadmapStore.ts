import { create } from "zustand";
import { supabase } from "@/integrations/supabase/client";

function getSessionId(): string {
  if (typeof window === "undefined") return "ssr";
  let id = localStorage.getItem("pathiq_session");
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem("pathiq_session", id);
  }
  return id;
}

interface RoadmapState {
  completed: Record<string, boolean>;
  loading: boolean;
  hydrate: (roadmapId: string) => Promise<void>;
  toggle: (roadmapId: string, nodeId: string) => Promise<void>;
  reset: () => void;
}

export const useRoadmapStore = create<RoadmapState>((set, get) => ({
  completed: {},
  loading: false,
  hydrate: async (roadmapId) => {
    set({ loading: true });
    const sessionId = getSessionId();
    const { data } = await supabase
      .from("node_progress")
      .select("node_id, completed")
      .eq("roadmap_id", roadmapId)
      .eq("session_id", sessionId);
    const map: Record<string, boolean> = {};
    (data ?? []).forEach((r) => {
      map[r.node_id] = r.completed;
    });
    set({ completed: map, loading: false });
  },
  toggle: async (roadmapId, nodeId) => {
    const sessionId = getSessionId();
    const current = get().completed[nodeId] ?? false;
    const next = !current;
    set({ completed: { ...get().completed, [nodeId]: next } });
    await supabase.from("node_progress").upsert(
      {
        roadmap_id: roadmapId,
        session_id: sessionId,
        node_id: nodeId,
        completed: next,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "roadmap_id,session_id,node_id" },
    );
  },
  reset: () => set({ completed: {} }),
}));
