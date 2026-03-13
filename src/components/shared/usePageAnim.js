import { useEffect, useState } from "react";

/**
 * Per-element page animation hook.
 * Returns `anim(enterDelay, exitDelay?)` that produces inline transition styles
 * for each element individually — no whole-page movement.
 *
 * @param {boolean} isExiting  — pass the `isExiting` prop from App
 * @param {"forward"|"backward"} navDir  — navigation direction
 */
export function usePageAnim(isExiting, navDir = "forward") {
  const [entered, setEntered] = useState(false);
  const [exiting, setExiting] = useState(false);

  // enter: trigger shortly after mount
  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60);
    return () => clearTimeout(t);
  }, []);

  // exit: when parent signals this page is leaving
  useEffect(() => {
    if (isExiting) setExiting(true);
  }, [isExiting]);

  const enterFrom = navDir === "backward" ? "translateY(-16px)" : "translateY(16px)";
  const exitTo    = navDir === "backward" ? "translateY(14px)"  : "translateY(-14px)";

  /**
   * @param {number} enterDelay  ms delay for enter animation
   * @param {number} [exitDelay] ms delay for exit animation (default: stagger-reversed)
   * @param {string} [extraTransformIn] extra transform on top of translateY (e.g. rotate)
   */
  const anim = (enterDelay, exitDelay, extraTransformIn = "") => {
    const ed = exitDelay ?? Math.max(0, enterDelay * 0.25);
    const sep = extraTransformIn ? " " : "";

    if (exiting) {
      return {
        opacity: 0,
        transform: `${exitTo}${sep}${extraTransformIn}`,
        transition: `opacity 0.22s ease ${ed}ms, transform 0.22s ease ${ed}ms`,
        pointerEvents: "none",
      };
    }
    return {
      opacity: entered ? 1 : 0,
      transform: entered
        ? `translateY(0)${sep}${extraTransformIn}`
        : `${enterFrom}${sep}${extraTransformIn}`,
      transition: `opacity 0.5s ease ${enterDelay}ms, transform 0.5s cubic-bezier(0.22,1,0.36,1) ${enterDelay}ms`,
    };
  };

  return { entered, exiting, anim };
}
