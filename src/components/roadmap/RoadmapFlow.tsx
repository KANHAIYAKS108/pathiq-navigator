import { useEffect, useMemo, useState, useCallback } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  type Node,
  type Edge,
  BackgroundVariant,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { CustomNode, type CustomNodeData } from "./CustomNode";
import { NodeModal } from "./NodeModal";
import { useRoadmapStore } from "@/store/useRoadmapStore";
import type { RoadmapData, Phase } from "@/lib/ai/types";

const nodeTypes = { custom: CustomNode };

interface RoadmapFlowProps {
  roadmapId: string;
  roadmap: RoadmapData;
}

export function RoadmapFlow({ roadmapId, roadmap }: RoadmapFlowProps) {
  const completed = useRoadmapStore((s) => s.completed);
  const hydrate = useRoadmapStore((s) => s.hydrate);
  const toggle = useRoadmapStore((s) => s.toggle);
  const [selected, setSelected] = useState<Phase | null>(null);

  useEffect(() => {
    hydrate(roadmapId);
  }, [roadmapId, hydrate]);

  const nodes: Node<CustomNodeData>[] = useMemo(() => {
    return roadmap.phases.map((p, i) => {
      const col = i % 3;
      const row = Math.floor(i / 3);
      const offsetX = row % 2 === 0 ? 0 : 140;
      return {
        id: p.id,
        type: "custom",
        position: { x: col * 320 + offsetX, y: row * 220 },
        data: {
          title: p.title,
          duration: p.duration,
          icon: p.icon,
          index: i,
          completed: !!completed[p.id],
        },
      };
    });
  }, [roadmap.phases, completed]);

  const edges: Edge[] = useMemo(() => {
    return roadmap.edges.map((e, i) => ({
      id: `e-${i}`,
      source: e.from,
      target: e.to,
      animated: true,
      style: { stroke: "oklch(0.78 0.18 200 / 0.6)", strokeWidth: 2 },
    }));
  }, [roadmap.edges]);

  const onNodeClick = useCallback(
    (_: unknown, node: Node) => {
      const phase = roadmap.phases.find((p) => p.id === node.id) ?? null;
      setSelected(phase);
    },
    [roadmap.phases],
  );

  const selectedIndex = selected ? roadmap.phases.findIndex((p) => p.id === selected.id) : -1;

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        onNodeClick={onNodeClick}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        proOptions={{ hideAttribution: true }}
        minZoom={0.4}
        maxZoom={1.5}
      >
        <Background variant={BackgroundVariant.Dots} gap={24} size={1.5} color="oklch(1 0 0 / 0.08)" />
        <Controls className="!bg-card !border-border [&>button]:!bg-card [&>button]:!border-border [&>button]:!text-foreground" />
        <MiniMap
          className="!bg-card/80 !border-border"
          nodeColor={(n) => {
            const d = n.data as CustomNodeData;
            return d.completed ? "oklch(0.72 0.18 155)" : "oklch(0.78 0.18 200)";
          }}
          maskColor="oklch(0.145 0.025 265 / 0.7)"
        />
      </ReactFlow>

      <NodeModal
        phase={selected}
        index={selectedIndex}
        completed={selected ? !!completed[selected.id] : false}
        onToggle={() => {
          if (selected) toggle(roadmapId, selected.id);
        }}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
