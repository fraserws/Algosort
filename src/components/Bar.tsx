import React from "react";
import { number } from "zod";

export type BarType = {
  value: number;
  isCompared: boolean;
  isSwapped: boolean;
  isMin: boolean;
  barwidth: number;
};

export const Bar: React.FC<{ bar: BarType }> = ({ bar }) => {
  const { value, isCompared, isSwapped, isMin, barwidth } = bar;
  const color = isCompared
    ? "bg-pink-500"
    : isSwapped
    ? "bg-green-500"
    : isMin
    ? "bg-yellow-500"
    : `bg-secondary`;
  return (
    <div>
      <div
        className={`${color} w-20 full rounded-b-md `}
        style={{
          height: `${value}%`,
          backgroundColor: color,
        }}
      />
      <p className="text-center text-xs">{value}</p>
    </div>
  );
};
