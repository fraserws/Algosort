import { useRouter } from "next/router";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import { HiMenu, HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import { config } from "../utils/config";

import type { Algorithm } from "../utils/algorithms";

const { algorithms } = config;

export const Navbar: React.FC<{
  startVisualization: (algorithm: Algorithm) => void;
  isAnimating: boolean;
  speed: number;
  generateArray: () => void;
  numBars: number;
  setNumBars: Dispatch<SetStateAction<number>>;
}> = ({
  startVisualization,
  speed,
  generateArray,
  numBars,
  isAnimating,
  setNumBars,
}) => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(algorithms[0]);

  const selectAlgorithm = (name: string) => {
    const entry = algorithms.find((alg) => alg.displayName === name);
    if (entry) setSelectedAlgorithm(entry);
  };
  const visualize = () => {
    const { algorithm } = selectedAlgorithm;
    startVisualization(algorithm);
  };

  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const router = useRouter();
  return (
    <div className="navbar bg-base-200 pb-2">
      <div className="navbar-start w-4/5 mx-auto flex gap-16 justify-evenly ">
        {/** Desktop Tab Menu */}
        <ul className="menu menu-horizontal flex gap- px-5 pt-2 underline">
          <div className="dropdown">
            <label
              tabIndex={0}
              className="btn m-1 w-max btn p-2 mx-2 shadow btn-primary-focus"
            >
              {selectedAlgorithm.displayName || "Select Algorithm"}
            </label>
            <ul
              tabIndex={0}
              className="dropdown-content menu p-2 shadow bg-secondary rounded-box w-52"
            >
              {algorithms.map((algorithm, idx) => {
                return (
                  <li
                    key={idx}
                    onClick={() => selectAlgorithm(algorithm.displayName)}
                  >
                    <a>{algorithm.displayName}</a>
                  </li>
                );
              })}
            </ul>
          </div>
        </ul>

        <div className="form-control flex-1">
          <input
            name="bar-count-slider"
            className="range range-xs range-secondary"
            type="range"
            min={5}
            max={22}
            value={numBars}
            disabled={isAnimating}
            onChange={(e) => setNumBars(e.target.valueAsNumber)}
          />
        </div>

        {/** End Desktop Tab Menu */}
      </div>

      <div className="navbar-end gap-4">
        <div>
          <button
            onClick={generateArray}
            disabled={isAnimating}
            className="btn p-2 mx-2 shadow btn-primary-focus"
          >
            Generate New Array
          </button>
          <button
            onClick={visualize}
            disabled={isAnimating}
            className="btn p-2 shadow btn-primary-focus"
          >
            Sort!
          </button>
        </div>
        {/** Theme Toggle */}

        <label className="swap swap-rotate items-center">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />

          <HiOutlineSun className="swap-on h-10 w-10 stroke-current" />
          <HiOutlineMoon className="swap-off h-10 w-10 stroke-current" />
        </label>

        {/** End Theme Toggle */}
      </div>
    </div>
  );
};

const useDarkMode = () => {
  const [usingDarkMode, setUsingDarkMode] = React.useState(true);

  const darkTheme = "night";
  const lightTheme = "cmyk";

  React.useEffect(() => {
    const mediaMatch = window.matchMedia("(prefers-color-scheme: dark)");

    const colorSchemeChangeListener = (e: MediaQueryListEvent) => {
      setUsingDarkMode(!e.matches);
      const newTheme = e.matches ? darkTheme : lightTheme;
      window.document.documentElement.setAttribute("data-theme", newTheme);
    };

    mediaMatch.addEventListener("change", colorSchemeChangeListener);

    setUsingDarkMode(mediaMatch.matches);
    toggleDarkMode();

    return () => {
      mediaMatch.removeEventListener("change", colorSchemeChangeListener);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggleDarkMode = () => {
    setUsingDarkMode(!usingDarkMode);
    const newTheme = usingDarkMode ? darkTheme : lightTheme;
    window.document.documentElement.setAttribute("data-theme", newTheme);
  };

  return [usingDarkMode, toggleDarkMode] as const;
};
