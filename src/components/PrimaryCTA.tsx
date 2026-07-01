"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";

// --- Tuneables ---
const STROKE_WIDTH = 1.5;
const OUTSET = 2; // pixels the outline sits outside the button
const LINE_DURATION_S = 0.45; // draw + retract time
const LINE_EASE: [number, number, number, number] = [0.5, 0, 0.15, 1];

interface PrimaryCTAProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  /**
   * Extra classes appended to the outer button element. Use for spacing/
   * positioning overrides (mt-5, shrink-0, etc.) — the primary CTA visual
   * (h-11, rounded-full, bg-foreground, text sizing) is fixed inside.
   */
  className?: string;
}

function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
}

/**
 * Primary CTA — a black pill button with a scroll-drawn accent outline.
 *
 * Hover effect: a thin (1.5px) accent-blue line, positioned 2px outside the
 * button, animates from left → clockwise → back on pointer enter and reverses
 * on pointer leave. Uses ResizeObserver on the button element to size an
 * absolutely-positioned SVG overlay pixel-perfect to whatever text the button
 * holds and whatever breakpoint the viewport is at. The SVG's path is a
 * hand-traced pill (radius = height/2) so it always matches rounded-full.
 *
 * The button itself doesn't change on hover — no bg shift, no shadow. The
 * outline is the entire effect.
 *
 * Touch-safe: pointerType === "mouse" filter, so a tap never sticks the
 * hovered state. Reduced-motion: the line snaps in/out instantly instead of
 * animating.
 */
export default function PrimaryCTA({
  href,
  onClick,
  children,
  className = "",
}: PrimaryCTAProps) {
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  const [hovered, setHovered] = useState(false);
  const observerRef = useRef<ResizeObserver | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  // Callback ref: works uniformly for Link, <a> and <button>. Attaches a
  // ResizeObserver so the SVG stays in sync with the button's actual
  // rendered dimensions (text/viewport changes update the outline pill).
  const setElement = useCallback((node: HTMLElement | null) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (!node) return;
    const ro = new ResizeObserver(([entry]) => {
      setSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      });
    });
    ro.observe(node);
    observerRef.current = ro;
  }, []);

  // Final cleanup on unmount.
  useEffect(() => {
    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(true);
  };
  const handlePointerLeave = () => setHovered(false);

  const buttonClasses = [
    "relative inline-flex h-11 items-center rounded-full",
    "bg-foreground px-6 text-sm font-medium text-background",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  let svgOverlay: React.ReactNode = null;
  if (size) {
    const svgW = size.width + OUTSET * 2;
    const svgH = size.height + OUTSET * 2;
    const r = svgH / 2; // pill radius = half of height, matches rounded-full
    // Path: start at 9 o'clock, trace clockwise around the pill.
    const pillPath = [
      `M 0 ${r}`,
      `A ${r} ${r} 0 0 1 ${r} 0`,
      `L ${svgW - r} 0`,
      `A ${r} ${r} 0 0 1 ${svgW} ${r}`,
      `A ${r} ${r} 0 0 1 ${svgW - r} ${svgH}`,
      `L ${r} ${svgH}`,
      `A ${r} ${r} 0 0 1 0 ${r}`,
      "Z",
    ].join(" ");

    svgOverlay = (
      <svg
        className="pointer-events-none absolute"
        style={{
          top: -OUTSET,
          left: -OUTSET,
          width: svgW,
          height: svgH,
          overflow: "visible",
        }}
        aria-hidden="true"
      >
        <motion.path
          d={pillPath}
          stroke="var(--color-accent)"
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray="1 1"
          initial={{ strokeDashoffset: 1 }}
          animate={{ strokeDashoffset: hovered ? 0 : 1 }}
          transition={{
            duration: reduceMotion ? 0 : LINE_DURATION_S,
            ease: LINE_EASE,
          }}
        />
      </svg>
    );
  }

  const content = (
    <>
      {svgOverlay}
      {children}
    </>
  );

  // http/https → external <a target="_blank">
  if (href && isExternalHref(href)) {
    return (
      <a
        ref={setElement}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClasses}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {content}
      </a>
    );
  }

  // internal (/, /#hash, mailto:, tel:) → Next Link
  if (href) {
    return (
      <Link
        ref={setElement}
        href={href}
        className={buttonClasses}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {content}
      </Link>
    );
  }

  // no href → <button>
  return (
    <button
      ref={setElement}
      type="button"
      onClick={onClick}
      className={buttonClasses}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {content}
    </button>
  );
}
