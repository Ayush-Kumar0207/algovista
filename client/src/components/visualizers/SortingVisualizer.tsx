import { useEffect, useState } from "react";
import Sketch from "react-p5";
import { bubbleSort } from "./utils/algorithms/bubbleSort";
import { mergeSort } from "./utils/algorithms/mergeSort";

const canvasWidth = 500;
const canvasHeight = 400;

interface SortingVisualizerProps {
  algorithm: string;
  speed: number;
}

const SortingVisualizer = ({ algorithm, speed }: SortingVisualizerProps) => {
  const [originalArray, setOriginalArray] = useState<number[]>([]);
  const [array, setArray] = useState<number[]>([]);
  const [currentIndices, setCurrentIndices] = useState<[number, number] | null>(null);
  const [isSorting, setIsSorting] = useState(false);
  const [history, setHistory] = useState<string[]>([]);

  const updateExplanation = (text: string) => {
    setHistory((prev) => [...prev, text]);
  };

  const generateArray = () => {
    const arr = Array.from({ length: 10 }, () => Math.floor(Math.random() * 300) + 50);
    setOriginalArray(arr);
    setArray([...arr]);
    setCurrentIndices(null);
    setHistory([]);
  };

  const startSorting = async () => {
    setIsSorting(true);
    const workingCopy = [...originalArray];

    const delay = 1000 - speed * 8; // Speed logic (adjust as needed)

    if (algorithm.toLowerCase().includes("bubble")) {
      await bubbleSort(workingCopy, setArray, setCurrentIndices, delay, updateExplanation);
    } else if (algorithm.toLowerCase().includes("merge")) {
      await mergeSort(workingCopy, setArray, setCurrentIndices, delay, updateExplanation);
    } else {
      updateExplanation(`❌ Algorithm "${algorithm}" not implemented yet.`);
    }

    setCurrentIndices(null);
    setIsSorting(false);
  };

  useEffect(() => {
    generateArray();
  }, [algorithm]);

  const drawBars = (
    p5: any,
    arr: number[],
    highlightIndices: [number, number] | null = null
  ) => {
    p5.background(245);
    const barWidth = canvasWidth / arr.length;

    for (let i = 0; i < arr.length; i++) {
      const isHighlighted =
        highlightIndices && (i === highlightIndices[0] || i === highlightIndices[1]);
      p5.fill(isHighlighted ? "#ef4444" : "#3b82f6");

      const x = i * barWidth;
      const y = canvasHeight - arr[i];
      p5.rect(x, y, barWidth - 2, arr[i]);

      p5.fill(30);
      p5.textAlign(p5.CENTER);
      p5.textSize(12);
      p5.text(arr[i], x + barWidth / 2, y - 5);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center px-4 py-6">
      <h1 className="text-3xl font-bold text-center text-blue-600 mb-4">
        📊 Sorting Visualizer
      </h1>

      {/* Visuals */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
        {/* Original Array */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 text-center mb-2">
            🔒 Original Array
          </h3>
          <Sketch
            setup={(p5, canvasParentRef) =>
              p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef)
            }
            draw={(p5) => drawBars(p5, originalArray)}
          />
        </div>

        {/* Sorting Animation */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 text-center mb-2">
            🎯 Sorting Animation
          </h3>
          <Sketch
            setup={(p5, canvasParentRef) =>
              p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef)
            }
            draw={(p5) => drawBars(p5, array, currentIndices)}
          />
        </div>
      </div>

      {/* Explanation */}
      <div className="w-full max-w-4xl mt-6 p-4 bg-white shadow rounded h-48 overflow-y-auto border border-gray-300">
        <h3 className="text-md font-semibold mb-2 text-blue-700">
          📝 Explanation History
        </h3>
        {history.length > 0 ? (
          <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm">
            {history.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No steps yet. Click visualize!</p>
        )}
      </div>

      {/* Controls */}
      <div className="mt-6 flex gap-4 flex-wrap justify-center">
        <button
          onClick={generateArray}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
          disabled={isSorting}
        >
          🔄 New Array
        </button>

        <button
          onClick={startSorting}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          disabled={isSorting}
        >
          ▶️ Visualize {algorithm}
        </button>
      </div>
    </div>
  );
};

export default SortingVisualizer;
