"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const WORDS = ["research", "design", "prototypes", "shipped products"] as const;

// Longer pause on the last word — it's the crescendo.
const DELAY_MS = 1900;
const LAST_DELAY_MS = 3000;

// Spring feel — smooth, no hard bounce.
const SPRING = { type: "spring" as const, stiffness: 200, damping: 26 };

// Soft top fade (15%) + smaller bottom fade (10%). The slot also gets a
// pb-[0.15em] on the outer, which pushes the descender line well INTO the
// opaque middle zone so p/g/y stay fully visible at rest. Only the entering
// and exiting words meet the fade — the resting word never does.
const MASK_GRADIENT =
  "linear-gradient(to bottom, transparent 0%, black 15%, black 90%, transparent 100%)";

export default function CyclingStatement() {
  const reduceMotion = useReducedMotion() ?? false;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const isLast = index === WORDS.length - 1;
    const delay = isLast ? LAST_DELAY_MS : DELAY_MS;
    const timeoutId = window.setTimeout(() => {
      setIndex((i) => (i + 1) % WORDS.length);
    }, delay);
    return () => window.clearTimeout(timeoutId);
  }, [index, reduceMotion]);

  // Reduced-motion: static, last word only, no animation at all.
  if (reduceMotion) {
    return (
      <section className="border-t border-border py-32 sm:py-40">
        <h2 className="text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[3.25rem]">
          I turn ideas into{" "}
          <span className="text-accent">{WORDS[WORDS.length - 1]}</span>.
        </h2>
      </section>
    );
  }

  const currentWord = WORDS[index];

  return (
    <section className="border-t border-border py-32 sm:py-40">
      <h2 className="text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[3.25rem]">
        I turn ideas into{" "}
        {/*
          Nested structure to keep baseline correct AND get a soft-edge mask:

          - OUTER motion.span (inline-block, NO overflow-hidden): stays a
            normal inline-block so its baseline is the ghost's baseline,
            which aligns with the surrounding text. If we put overflow-hidden
            here, CSS shifts the inline-block's baseline to the box bottom
            (per spec) — that pushed the cycling word visibly too high.
          - GHOST: sets width, line-height, and the outer's baseline.
          - INNER MASK (absolute inset-0, overflow-hidden + mask-image):
            fills the outer without affecting its baseline. Contains the
            animating words and clips them vertically with a soft gradient
            fade instead of a hard edge.
          - Animating words: absolute inside the mask, sliding vertically.
            Both entering and exiting live inside the same clipped rect;
            AnimatePresence default mode (sync) runs their transitions in
            parallel.
        */}
        <motion.span
          layout
          transition={{ layout: SPRING }}
          className="relative inline-block align-baseline pb-[0.15em]"
        >
          <span className="invisible whitespace-nowrap" aria-hidden="true">
            {currentWord}
          </span>
          <span
            className="absolute inset-0 overflow-hidden"
            style={{
              maskImage: MASK_GRADIENT,
              WebkitMaskImage: MASK_GRADIENT,
            }}
          >
            <AnimatePresence initial={false}>
              <motion.span
                key={currentWord}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                transition={SPRING}
                className="absolute left-0 top-0 whitespace-nowrap text-accent"
              >
                {currentWord}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.span>
        .
      </h2>
    </section>
  );
}
