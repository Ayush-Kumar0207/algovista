"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart } from "lucide-react";
import SortingVisualizer from "@/components/visualizers/SortingVisualizer";
import GraphVisualizer from "@/components/visualizers/GraphVisualizer";
import TreeVisualizer from "@/components/visualizers/TreeVisualizer";

// Typed algorithm arrays (as const for literal types)
const sortingAlgorithms = ["Bubble Sort", "Selection Sort", "Insertion Sort", "Merge Sort"] as const;
const graphAlgorithms = ["BFS", "DFS", "Dijkstra"] as const;
const treeAlgorithms = ["Inorder", "Preorder", "Postorder"] as const;

type Category = "sorting" | "graphs" | "trees";
type SortingAlgo = typeof sortingAlgorithms[number];
type TreeAlgo = typeof treeAlgorithms[number];
type GraphAlgo = "bfs" | "dfs"; // lowercase internal codes
type AlgoType = SortingAlgo | TreeAlgo | GraphAlgo;

const visualizerOptions: Record<Category, readonly string[]> = {
  sorting: sortingAlgorithms,
  graphs: graphAlgorithms,
  trees: treeAlgorithms,
};

const graphAlgoMap: Record<string, GraphAlgo> = {
  BFS: "bfs",
  DFS: "dfs",
  Dijkstra: "bfs", // fallback for unsupported
};

const Visualizer = () => {
  const [category, setCategory] = useState<Category>("sorting");
  const [algorithm, setAlgorithm] = useState<AlgoType>(visualizerOptions["sorting"][0] as SortingAlgo);
  const [speed, setSpeed] = useState(50);

  const renderVisualizer = () => {
    switch (category) {
      case "sorting":
        return <SortingVisualizer algorithm={algorithm as SortingAlgo} speed={speed} />;
      case "graphs":
        return <GraphVisualizer algorithm={graphAlgoMap[algorithm] ?? "bfs"} speed={speed} />;
      case "trees":
        return <TreeVisualizer algorithm={algorithm as TreeAlgo} speed={speed} />;
      default:
        return <div className="text-gray-500">⚠️ Invalid category selected</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-indigo-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-extrabold text-indigo-700 flex items-center gap-2">
            <BarChart /> DSA Visualizer
          </h1>
          <Button variant="outline" onClick={() => window.history.back()}>
            ← Back
          </Button>
        </div>

        {/* Control Panel */}
        <motion.div
          className="bg-white rounded-xl p-6 shadow-sm border space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="grid md:grid-cols-3 gap-4">
            {/* Category Select */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">🧭 Category</label>
              <Select
                value={category}
                onValueChange={(val) => {
                  const selected = val as Category;
                  setCategory(selected);
                  setAlgorithm(visualizerOptions[selected][0] as AlgoType);
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sorting">Sorting</SelectItem>
                  <SelectItem value="graphs">Graphs</SelectItem>
                  <SelectItem value="trees">Trees</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Algorithm Select */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">⚙️ Algorithm</label>
              <Select value={algorithm} onValueChange={(val) => setAlgorithm(val as AlgoType)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {visualizerOptions[category].map((algo) => (
                    <SelectItem key={algo} value={algo}>
                      {algo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Speed Slider */}
            <div>
              <label className="block font-medium text-gray-700 mb-1">🚀 Speed</label>
              <Slider
                defaultValue={[speed]}
                min={10}
                max={100}
                step={10}
                onValueChange={(val) => setSpeed(val[0])}
              />
            </div>
          </div>
        </motion.div>

        {/* Visualizer Canvas */}
        <Card className="p-4">
          <CardContent className="min-h-[400px]">{renderVisualizer()}</CardContent>
        </Card>

        {/* Footer Quote */}
        <div className="mt-6 bg-indigo-100 rounded-lg p-4 text-center">
          <p className="text-indigo-700 font-medium italic">
            "Visualizing algorithms turns theory into understanding!"
          </p>
        </div>
      </div>
    </div>
  );
};

export default Visualizer;
