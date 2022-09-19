import { type BarType } from "../components/Bar";
import { type Animation } from "./algorithms";

export const animateBars = (prev: BarType[], animation: Animation) => {
  const tmpBars = [...prev];
  if ("comparison" in animation) {
    console.log(animation);
    tmpBars[animation.comparison[0]].isCompared = true;
    tmpBars[animation.comparison[1]].isCompared = true;
  } else if ("resetComparison" in animation) {
    tmpBars[animation.resetComparison[0]].isCompared = false;
    tmpBars[animation.resetComparison[1]].isCompared = false;
  } else if ("assign" in animation) {
    tmpBars[animation.assign[0]].isSwapped = true;
    tmpBars[animation.assign[0]].value = animation.assign[1];
  } else if ("resetAssign" in animation) {
    tmpBars[animation.resetAssign].isSwapped = false;
  } else if ("swap" in animation) {
    tmpBars[animation.swap[0]].isSwapped = true;
    tmpBars[animation.swap[1]].isSwapped = true;
    tmpBars[animation.swap[0]].value = animation.swap[2];
    tmpBars[animation.swap[1]].value = animation.swap[3];
  } else if ("resetSwap" in animation) {
    tmpBars[animation.resetSwap[0]].isSwapped = false;
    tmpBars[animation.resetSwap[1]].isSwapped = false;
  } else if ("min" in animation) {
    tmpBars[animation.min].isMin = true;
  } else if ("resetMin" in animation) {
    tmpBars[animation.resetMin].isMin = false;
  }
  return tmpBars;
};
