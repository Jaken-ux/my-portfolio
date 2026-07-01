"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";

/**
 * Page-transition fade-in for all /(main)/ routes.
 *
 * - First mount per session (cold visit) is skipped via `hasLoadedOnce` so the
 *   initial LCP candidate renders at opacity 1 with no delay.
 * - Subsequent client-side navigations animate opacity 0 → 1 over `DURATION`.
 * - Reduced-motion users get instant navigation (no animation, ever).
 * - Server components are untouched — this wrapper just receives their
 *   rendered children as a prop.
 *
 * Tune `DURATION_S` to taste (200ms is the starting point — try 250 or 300
 * if 200 feels too brisk).
 */
const DURATION_S = 0.2;

let hasLoadedOnce = false;

export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion() ?? false;
  const [skipInitial] = useState(() => {
    const skip = !hasLoadedOnce || reduceMotion;
    hasLoadedOnce = true;
    return skip;
  });

  return (
    <motion.div
      initial={skipInitial ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: DURATION_S, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
