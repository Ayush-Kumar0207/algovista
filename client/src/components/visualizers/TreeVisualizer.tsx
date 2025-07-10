"use client";
import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import type { HierarchyPointLink, HierarchyPointNode } from "d3";

interface TreeNode {
  id: string;
  name: string;
  children?: TreeNode[];
}

interface TreeVisualizerProps {
  algorithm: "Inorder" | "Preorder" | "Postorder";
  speed: number;
}

const TreeVisualizer = ({ algorithm, speed }: TreeVisualizerProps) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [root, setRoot] = useState<TreeNode | null>(null);
  const [log, setLog] = useState<string[]>([]);
  const [counter, setCounter] = useState(1);

  const addLog = (msg: string) => setLog((prev) => [...prev, msg]);

  const addNode = (parentId: string | null = null) => {
    const newNode: TreeNode = {
      id: `${counter}`,
      name: `${counter}`,
      children: [],
    };
    setCounter((prev) => prev + 1);

    if (!root) {
      setRoot(newNode);
      addLog("🌱 Root node created");
    } else {
      const insert = (node: TreeNode): boolean => {
        if (node.id === parentId) {
          node.children = node.children || [];
          node.children.push(newNode);
          return true;
        }
        return node.children?.some((child) => insert(child)) || false;
      };

      const cloned = structuredClone(root);
      if (insert(cloned)) {
        setRoot(cloned);
        addLog(`📥 Added ${newNode.name} under ${parentId}`);
      }
    }
  };

  const renderTree = () => {
    if (!root || !svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 800;
    const height = 500;
    const margin = { top: 40, right: 40, bottom: 40, left: 40 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const g = svg
      .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const rootHierarchy = d3.hierarchy(root);
    const treeLayout = d3.tree<TreeNode>().size([innerWidth, innerHeight]);
    const treeData = treeLayout(rootHierarchy);

    const linkGenerator = d3
      .linkVertical<HierarchyPointLink<TreeNode>, HierarchyPointNode<TreeNode>>()
      .x((d) => d.x)
      .y((d) => d.y);

    g.selectAll(".link")
      .data(treeData.links())
      .join("path")
      .attr("class", "link")
      .attr("d", (d) => linkGenerator(d))
      .attr("fill", "none")
      .attr("stroke", "#ccc")
      .attr("stroke-width", 2);

    const nodeGroup = g
      .selectAll("g.node")
      .data(treeData.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`);

    nodeGroup
      .append("circle")
      .attr("r", 20)
      .attr("fill", "#60a5fa")
      .attr("id", (d) => `circle-${d.data.id}`);

    nodeGroup
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 5)
      .attr("fill", "#fff")
      .style("font-size", "14px")
      .text((d) => d.data.name);
  };

  const animateTraversal = async (
    _nodes: HierarchyPointNode<TreeNode>[],
    order: "inorder" | "preorder" | "postorder"
  ) => {
    if (!svgRef.current || !root) return;

    const rootHierarchy = d3.hierarchy(root);
    const treeData = d3.tree<TreeNode>().size([800, 500])(rootHierarchy);
    const svg = d3.select(svgRef.current);

    const highlight = async (id: string) => {
      svg
        .select(`#circle-${id}`)
        .transition()
        .duration(300)
        .attr("fill", "#f59e0b");
      await new Promise((res) => setTimeout(res, 110 - speed));
    };

    const inorder = async (node: HierarchyPointNode<TreeNode> | null) => {
      if (!node) return;
      await inorder(node.children?.[0] || null);
      await highlight(node.data.id);
      addLog(`🔍 Inorder: Visited ${node.data.name}`);
      await inorder(node.children?.[1] || null);
    };

    const preorder = async (node: HierarchyPointNode<TreeNode> | null) => {
      if (!node) return;
      await highlight(node.data.id);
      addLog(`🔍 Preorder: Visited ${node.data.name}`);
      await preorder(node.children?.[0] || null);
      await preorder(node.children?.[1] || null);
    };

    const postorder = async (node: HierarchyPointNode<TreeNode> | null) => {
      if (!node) return;
      await postorder(node.children?.[0] || null);
      await postorder(node.children?.[1] || null);
      await highlight(node.data.id);
      addLog(`🔍 Postorder: Visited ${node.data.name}`);
    };

    setLog([]);

    if (order === "inorder") await inorder(treeData);
    else if (order === "preorder") await preorder(treeData);
    else await postorder(treeData);

    addLog(`✅ ${order.toUpperCase()} traversal complete`);
  };

  useEffect(() => {
    renderTree();
  }, [root]);

  useEffect(() => {
    const order = algorithm.toLowerCase() as "inorder" | "preorder" | "postorder";
    if (root) animateTraversal([], order);
  }, [algorithm, speed]);

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-2xl font-bold mb-4 text-blue-700">🌳 Tree Visualizer</h2>

      <div className="flex flex-wrap gap-3 mb-4">
        <button
          onClick={() => addNode(null)}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          ➕ Add Root
        </button>

        <button
          onClick={() => {
            const id = prompt("Enter parent node ID:");
            if (id) addNode(id);
          }}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          📌 Add Child
        </button>

        <button
          onClick={() => {
            setRoot(null);
            setLog([]);
            setCounter(1);
          }}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          🧹 Reset
        </button>
      </div>

      <svg
        ref={svgRef}
        width={800}
        height={500}
        className="border shadow rounded bg-white"
      />

      <div className="mt-4 w-full max-w-xl bg-white p-4 rounded shadow h-48 overflow-y-auto">
        <h3 className="font-semibold text-blue-700 mb-2">📜 Traversal Log</h3>
        {log.length === 0 ? (
          <p className="text-gray-500 italic">No traversal yet.</p>
        ) : (
          <ul className="list-disc pl-5 text-sm text-gray-800 space-y-1">
            {log.map((entry, idx) => (
              <li key={idx}>{entry}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TreeVisualizer;
