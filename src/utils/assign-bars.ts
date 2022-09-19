import { config } from "process";
import { type BarType } from "../components/Bar";

export const assignBars = (len: number) => {
  console.log("assignment in progress...");
  const array: BarType[] = [];
  for (let i = 0; i < len; i++) {
    const value = Math.floor(Math.random() * 100 + 1);
    array[i] = {
      value,
      isCompared: false,
      isSwapped: false,
      isMin: false,
    };
  }
  return array;
};
