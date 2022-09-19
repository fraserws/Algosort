import React from "react";
import { Navbar } from "./Navbar";
import { Bar } from "./Bar";
import { assignBars } from "../utils/assign-bars";
import type { Algorithm } from "../utils/algorithms";
import { animateBars } from "../utils/animatebars";

export const Visualizer: React.FC = () => {
  const [numBars, setNumBars] = React.useState(20);
  const [bars, setBars] = React.useState(assignBars(numBars));
  const [speed, setSpeed] = React.useState(50);
  const [isAnimating, setIsAnimating] = React.useState(false);

  const startViz = (algorithm: Algorithm) => {
    const barValues = Array.from(bars, (bar) => bar.value);

    const animations = algorithm(barValues)[1];

    setIsAnimating(true);
    animations.forEach((animation, i) => {
      setTimeout(() => {
        setBars((prev) => animateBars(prev, animation));
      }, speed * i);
    });

    setTimeout(() => {
      setIsAnimating(false);
    }, speed * animations.length);
  };
  React.useEffect(() => {
    setBars(assignBars(numBars));
  }, [numBars]);

  return (
    <div>
      <div className="w-full h-screen flex flex-col items-center">
        <Navbar
          startVisualization={startViz}
          isAnimating={isAnimating}
          speed={speed}
          setSpeed={setSpeed}
          generateArray={() => setBars(assignBars(numBars))}
          barCount={numBars}
          setNumBars={setNumBars}
        />
        <div className={`flex justify-center w-[80%] h-[90%] gap-[1px]`}>
          {bars.map((bar, i) => (
            <Bar key={i} bar={bar} />
          ))}
        </div>
      </div>
    </div>
  );
};
