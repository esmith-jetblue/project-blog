"use client";

import React from "react";
import clsx from "clsx";
import { Play, Pause, RotateCcw } from "react-feather";
import { motion } from "motion/react";

import Card from "@/components/Card";
import VisuallyHidden from "@/components/VisuallyHidden";

import styles from "./CircularColorsDemo.module.css";

const COLORS = [
  { label: "red", value: "hsl(348deg 100% 60%)" },
  { label: "yellow", value: "hsl(50deg 100% 55%)" },
  { label: "blue", value: "hsl(235deg 100% 65%)" },
];

function reducer(state, action) {
  switch (action) {
    case "play": {
      return {
        ...state,
        status: "playing",
      };
    }
    case "pause": {
      return {
        ...state,
        status: "stopped",
      };
    }
    case "increment": {
      return {
        ...state,
        timeElapsed: state.timeElapsed + 1,
      };
    }
    case "reset": {
      return {
        ...state,
        status: "stopped",
        timeElapsed: 0,
      };
    }
    default: {
      // Do nothing
    }
  }
}

function CircularColorsDemo() {
  const id = React.useId();
  const [state, dispatch] = React.useReducer(reducer, {
    status: "stopped",
    timeElapsed: 0,
  });

  React.useEffect(() => {
    if (state.status !== "playing") {
      return;
    }

    const intervalId = setInterval(() => dispatch("increment"), 1000);

    return () => clearInterval(intervalId);
  }, [state.status]);

  // This value should cycle through the colors in the
  // COLORS array:
  const selectedColor = COLORS[state.timeElapsed % COLORS.length];

  return (
    <Card as="section" className={styles.wrapper}>
      <ul className={styles.colorsWrapper}>
        {COLORS.map((color, index) => {
          const isSelected = color.value === selectedColor.value;

          return (
            <li className={styles.color} key={index}>
              {isSelected && (
                <motion.div
                  layoutId={`${id}-selected-color-outline`}
                  className={styles.selectedColorOutline}
                />
              )}
              <div
                className={clsx(
                  styles.colorBox,
                  isSelected && styles.selectedColorBox
                )}
                style={{
                  backgroundColor: color.value,
                }}
              >
                <VisuallyHidden>{color.label}</VisuallyHidden>
              </div>
            </li>
          );
        })}
      </ul>

      <div className={styles.timeWrapper}>
        <dl className={styles.timeDisplay}>
          <dt>Time Elapsed</dt>
          <dd>{state.timeElapsed}</dd>
        </dl>
        <div className={styles.actions}>
          <button
            onClick={() =>
              state.status === "playing" ? dispatch("pause") : dispatch("play")
            }
          >
            {state.status === "playing" ? <Pause /> : <Play />}
            <VisuallyHidden>
              {state.status === "playing" ? "Pause" : "Play"}
            </VisuallyHidden>
          </button>
          <button onClick={() => dispatch("reset")}>
            <RotateCcw />
            <VisuallyHidden>Reset</VisuallyHidden>
          </button>
        </div>
      </div>
    </Card>
  );
}

export default CircularColorsDemo;
