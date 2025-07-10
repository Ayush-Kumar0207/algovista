import * as d3 from "d3";
import type { SimulationNodeDatum, SimulationLinkDatum } from "d3";

// Type Definitions
export interface NodeType extends SimulationNodeDatum {
  id: number;
}

export interface LinkType extends SimulationLinkDatum<NodeType> {
  source: number;
  target: number;
}

// BFS Traversal Function
export const runBFS = async (
  nodes: NodeType[],
  links: LinkType[],
  addLog: (msg: string) => void,
  svgRef: React.RefObject<SVGSVGElement | null>,
  speed: number // ✅ Add speed parameter
) => {
  if (!svgRef.current) {
    console.warn("SVG reference is null");
    return;
  }

  const svg = d3.select(svgRef.current);

  // 🔧 Build adjacency list
  const adjacency: Record<number, number[]> = {};
  links.forEach((link) => {
    const sourceId =
      typeof link.source === "number"
        ? link.source
        : (link.source as NodeType).id;

    const targetId =
      typeof link.target === "number"
        ? link.target
        : (link.target as NodeType).id;

    if (!adjacency[sourceId]) adjacency[sourceId] = [];
    if (!adjacency[targetId]) adjacency[targetId] = [];

    adjacency[sourceId].push(targetId);
    adjacency[targetId].push(sourceId); // undirected
  });

  const visited = new Set<number>();
  const queue: number[] = [];

  const startNode = nodes[0]?.id;
  if (startNode == null) {
    addLog("❌ No start node for BFS");
    return;
  }

  visited.add(startNode);
  queue.push(startNode);
  addLog(`🚀 Starting BFS from node ${startNode}`);

  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel: number[] = [];

    for (let i = 0; i < levelSize; i++) {
      const current = queue.shift()!;
      currentLevel.push(current);
      addLog(`🔍 Visiting node ${current}`);
    }

    // 🟠 Highlight entire level at once
    currentLevel.forEach((nodeId) => {
      svg.select(`#node-${nodeId}`)
        .transition()
        .duration(300)
        .attr("fill", "#f59e0b"); // orange
    });

    await new Promise((res) => setTimeout(res, speed)); // ⏳ Use speed for delay

    // Enqueue unvisited neighbors
    for (const current of currentLevel) {
      for (const neighbor of adjacency[current] || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
          addLog(`📥 Queued node ${neighbor}`);

          // 🔵 Show queued node
          svg.select(`#node-${neighbor}`)
            .transition()
            .duration(300)
            .attr("fill", "#38bdf8"); // sky blue
        }
      }
    }

    await new Promise((res) => setTimeout(res, speed / 2)); // Optional short pause
  }

  addLog("✅ BFS complete");

  // 🧼 Reset node colors after traversal
  await new Promise((res) => setTimeout(res, 500));
  nodes.forEach((node) => {
    svg.select(`#node-${node.id}`)
      .transition()
      .duration(300)
      .attr("fill", "#60a5fa"); // original blue
  });
};
