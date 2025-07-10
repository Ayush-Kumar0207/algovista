import * as d3 from "d3";
import type {
  SimulationNodeDatum,
  SimulationLinkDatum,
} from "d3";

// Define proper types for nodes and links
export interface NodeType extends SimulationNodeDatum {
  id: number;
}

export interface LinkType extends SimulationLinkDatum<NodeType> {
  source: number | NodeType;
  target: number | NodeType;
}

/**
 * Runs DFS on the graph and animates traversal on the SVG.
 */
export const runDFS = async (
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

  // ✅ Build adjacency list
  const graph: Record<number, number[]> = {};
  for (const node of nodes) {
    graph[node.id] = [];
  }

  for (const link of links) {
    const sourceId =
      typeof link.source === "number"
        ? link.source
        : (link.source as NodeType).id;
    const targetId =
      typeof link.target === "number"
        ? link.target
        : (link.target as NodeType).id;

    if (sourceId == null || targetId == null) continue;

    graph[sourceId].push(targetId);
    graph[targetId].push(sourceId); // undirected graph
  }

  const visited = new Set<number>();

  const dfs = async (node: number) => {
    visited.add(node);
    addLog(`🧭 Visiting node ${node}`);

    svg
      .select(`#node-${node}`)
      .transition()
      .duration(300)
      .attr("fill", "#f59e0b"); // amber

    await new Promise((res) => setTimeout(res, speed));

    for (const neighbor of graph[node]) {
      if (!visited.has(neighbor)) {
        addLog(`📥 Going deeper to node ${neighbor}`);
        await dfs(neighbor);
      }
    }
  };

  const startNode = nodes[0]?.id;
  if (startNode == null) {
    addLog("❌ No start node found.");
    return;
  }

  addLog(`🚀 Starting DFS from node ${startNode}`);
  await dfs(startNode);
  addLog("✅ DFS complete");

  // Reset node colors
  await new Promise((res) => setTimeout(res, 300));
  nodes.forEach((node) => {
    svg
      .select(`#node-${node.id}`)
      .transition()
      .duration(300)
      .attr("fill", "#60a5fa"); // blue-400
  });
};
