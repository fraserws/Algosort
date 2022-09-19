export type Animation =
  | { comparison: [number, number] }
  | { resetComparison: [number, number] }
  | { assign: [number, number] }
  | { resetAssign: number }
  | { min: number }
  | { resetMin: number }
  | { swap: [number, number, number, number] }
  | { resetSwap: [number, number] };

export type Algorithm = (array: number[]) => [number[], Animation[]];
export const insertionSort: Algorithm = (array) => {
  let arr = [...array];
  let animations: Animation[] = [];
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j;
    for (j = i - 1; j > -1; j--) {
      animations.push({ comparison: [j, i] });
      if (arr[j] > key) {
        arr[j + 1] = arr[j];
        animations.push({ assign: [j + 1, arr[j]] });
        animations.push({ resetAssign: j + 1 });

        animations.push({ resetComparison: [j, i] });
      } else {
        animations.push({ resetComparison: [j, i] });
        break;
      }
    }
    arr[j + 1] = key;
    animations.push({ assign: [j + 1, key] });
    animations.push({ resetAssign: j + 1 });
  }
  return [arr, animations];
};
