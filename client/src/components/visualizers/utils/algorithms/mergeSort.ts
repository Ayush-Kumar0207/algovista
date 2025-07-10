import delay from "../delay";

export async function mergeSort(
  array: number[],
  setArray: (arr: number[]) => void,
  setCurrentIndices: (pair: [number, number] | null) => void,
  delayTime: number,
  setExplanation: (text: string) => void
) {
  async function merge(arr: number[], l: number, m: number, r: number) {
    const left = arr.slice(l, m + 1);
    const right = arr.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;

    while (i < left.length && j < right.length) {
      setCurrentIndices([k, k]);
      setExplanation(`Comparing ${left[i]} and ${right[j]}`);
      await delay(delayTime);

      if (left[i] <= right[j]) {
        setExplanation(`Inserting ${left[i]} from left`);
        arr[k++] = left[i++];
      } else {
        setExplanation(`Inserting ${right[j]} from right`);
        arr[k++] = right[j++];
      }

      setArray([...arr]);
      await delay(delayTime);
    }

    while (i < left.length) {
      setCurrentIndices([k, k]);
      setExplanation(`Inserting ${left[i]} from left`);
      await delay(delayTime);
      arr[k++] = left[i++];
      setArray([...arr]);
    }

    while (j < right.length) {
      setCurrentIndices([k, k]);
      setExplanation(`Inserting ${right[j]} from right`);
      await delay(delayTime);
      arr[k++] = right[j++];
      setArray([...arr]);
    }
  }

  async function divide(arr: number[], l: number, r: number) {
    if (l >= r) return;
    const m = Math.floor((l + r) / 2);
    await divide(arr, l, m);
    await divide(arr, m + 1, r);
    await merge(arr, l, m, r);
  }

  const arr = [...array];
  await divide(arr, 0, arr.length - 1);
  setCurrentIndices(null);
  setExplanation("Sorting complete!");
}
