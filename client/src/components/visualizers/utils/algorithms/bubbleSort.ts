import delay from "../delay";
export async function bubbleSort(
  array: number[],
  setArray: (a: number[]) => void,
  setCurrentIndices: (pair: [number, number] | null) => void,
  delayTime: number,
  setExplanation: (text: string) => void
) {
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      setCurrentIndices([j, j + 1]);
      setExplanation(`Comparing ${arr[j]} and ${arr[j + 1]}`);
      await delay(delayTime);

      if (arr[j] > arr[j + 1]) {
        setExplanation(`Swapping ${arr[j]} and ${arr[j + 1]}`);
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
        await delay(delayTime);
      }
    }
  }

  setCurrentIndices(null);
  setExplanation("Sorting complete!");
}
