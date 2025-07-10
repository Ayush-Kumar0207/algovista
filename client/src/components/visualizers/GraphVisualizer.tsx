import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { runBFS } from "./utils/bfs";
import { runDFS } from "./utils/dfs";
import type { SimulationNodeDatum } from "d3";

// Props
interface GraphVisualizerProps {
  algorithm: "bfs" | "dfs";
  speed: number; // in ms
}

// Types
export interface NodeType extends SimulationNodeDatum {
  id: number;
}
export interface LinkType {
  source: number;
  target: number;
}

const GraphVisualizer = ({ algorithm, speed }: GraphVisualizerProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<NodeType[]>([]);
  const [links, setLinks] = useState<LinkType[]>([]);
  const [log, setLog] = useState<string[]>([]);

  const width = 800;
  const height = 500;

  const addLog = (msg: string) =>
    setLog((prev) => [...prev, `[${new Date().toLocaleTimeString()}] ${msg}`]);

  const addNode = () => {
    const newNode = { id: nodes.length };
    setNodes((prev) => [...prev, newNode]);
    addLog(`🟢 Added node ${newNode.id}`);
  };

  const addEdge = () => {
    if (nodes.length < 2) return alert("Add at least two nodes first!");
    const source = prompt("Enter Source Node ID:");
    const target = prompt("Enter Target Node ID:");

    const s = Number(source);
    const t = Number(target);

    if (isNaN(s) || isNaN(t) || s === t || !nodes[s] || !nodes[t]) {
      alert("❌ Invalid node IDs");
      return;
    }

    setLinks((prev) => [...prev, { source: s, target: t }]);
    addLog(`🔗 Added edge from ${s} to ${t}`);
  };

  const clearGraph = () => {
    setNodes([]);
    setLinks([]);
    setLog([]);
  };

  const runAlgo = () => {
    if (!nodes.length) return alert("Add some nodes first!");

    if (algorithm === "bfs") {
      runBFS(nodes, links, addLog, svgRef, speed);
    } else {
      runDFS(nodes, links, addLog, svgRef, speed);
    }
  };

  // D3 drawing
  useEffect(() => {
    const svg = d3.select(svgRef.current as SVGSVGElement);
    svg.selectAll("*").remove();

    const g = svg.append("g");

    svg.call(
      d3.zoom<SVGSVGElement, unknown>().scaleExtent([0.5, 2]).on("zoom", (event) => {
        g.attr("transform", event.transform);
      })
    );

    const simulation = d3
      .forceSimulation<NodeType>(nodes)
      .force("link", d3.forceLink<NodeType, LinkType>(links).id((d) => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collide", d3.forceCollide(40))
      .on("tick", ticked);

    function ticked() {
      const link = g
        .selectAll("line")
        .data(links)
        .join("line")
        .attr("stroke", "#cbd5e1")
        .attr("stroke-width", 2);

      const node = g
        .selectAll("circle")
        .data(nodes, (d: any) => d.id)
        .join("circle")
        .attr("r", 20)
        .attr("fill", "#3b82f6")
        .attr("stroke", "#1e40af")
        .attr("stroke-width", 2)
        .attr("id", (d) => `node-${d.id}`);

      const label = g
        .selectAll("text")
        .data(nodes, (d: any) => d.id)
        .join("text")
        .text((d) => d.id)
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .style("font-size", "14px");

      node.attr("cx", (d: any) => (d.x = Math.max(30, Math.min(width - 30, d.x))));
      node.attr("cy", (d: any) => (d.y = Math.max(30, Math.min(height - 30, d.y))));
      label.attr("x", (d: any) => d.x).attr("y", (d: any) => d.y + 5);

      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);
    }

    simulation.alpha(1).restart();
  }, [nodes, links]);

  return (
    <div className="p-6 flex flex-col items-center bg-gradient-to-br from-sky-50 to-indigo-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-indigo-700">
        🌐 Graph Visualizer ({algorithm.toUpperCase()} - {speed}ms)
      </h2>

      <div className="flex flex-wrap gap-3 mb-6 justify-center">
        <button onClick={addNode} className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600 transition">
          ➕ Add Node
        </button>
        <button onClick={addEdge} className="bg-yellow-500 text-white px-4 py-2 rounded shadow hover:bg-yellow-600 transition">
          🔗 Add Edge
        </button>
        <button onClick={clearGraph} className="bg-red-500 text-white px-4 py-2 rounded shadow hover:bg-red-600 transition">
          🧹 Clear Graph
        </button>
        <button onClick={runAlgo} className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition">
          ▶️ Run {algorithm.toUpperCase()}
        </button>
      </div>

      <svg ref={svgRef} width={width} height={height} className="rounded border shadow bg-white" />

      <div className="mt-8 w-full max-w-2xl bg-white p-4 rounded shadow border border-gray-300 h-52 overflow-y-auto">
        <h3 className="font-semibold text-indigo-700 mb-2">📜 Traversal Log</h3>
        {log.length ? (
          <ul className="list-disc pl-4 text-gray-800 space-y-1 text-sm">
            {log.map((entry, idx) => (
              <li key={idx}>{entry}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No traversal log yet.</p>
        )}
      </div>
    </div>
  );
};

export default GraphVisualizer;
