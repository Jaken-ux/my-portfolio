"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

type Status = "LIVE" | "PROTOTYPE" | "CONCEPT";

export type Build = {
  name: string;
  description: string;
  tags: string[];
  status: Status;
  image: string;
  liveUrl?: string;
  beta?: boolean;
};

const statusStyles: Record<Status, string> = {
  LIVE: "bg-accent text-white",
  PROTOTYPE: "bg-foreground text-background",
  CONCEPT: "bg-[#f3f4f6] text-muted",
};

// Match Selected Work-card values (SelectedWorkMorph.tsx) for cross-page
// hover-craft consistency.
const IMAGE_SPRING = { type: "spring" as const, stiffness: 200, damping: 25 };
const ARROW_SPRING = { type: "spring" as const, stiffness: 380, damping: 30 };
const HOVER_SCALE = 1.07;
const ARROW_NUDGE_PX = 4;

// The card wrapper class — no hover:-translate-y-1, no hover:shadow-xl.
// The hover effect is entirely inside the frame (image scale + arrow nudge).
const CARD_CLASSES =
  "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white";

export default function AIBuildCard({ build }: { build: Build }) {
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion() ?? false;

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(true);
  };
  const handlePointerLeave = () => setHovered(false);

  const isInternal = build.liveUrl?.startsWith("/") ?? false;
  const hasHover = Boolean(build.liveUrl);

  const cardInner = (
    <>
      {/* Image — overflow-hidden on this container is the mask; the inner
          motion.div scales so the frame/status pills stay perfectly still. */}
      <div className="relative aspect-[4/3] overflow-hidden bg-[#1a1a1a]">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered && !reduceMotion ? HOVER_SCALE : 1 }}
          transition={IMAGE_SPRING}
        >
          <Image
            src={build.image}
            alt={build.name}
            fill
            className="object-contain p-5"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        </motion.div>
        {/* Status + Beta pills — siblings of the scale wrapper so they don't
            grow with the image. */}
        <div className="absolute right-3 top-3 flex flex-row-reverse gap-1.5">
          <span
            className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest ${statusStyles[build.status]}`}
          >
            {build.status}
          </span>
          {build.beta && (
            <span className="rounded-full border border-white/30 bg-black/40 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-white backdrop-blur-sm">
              Beta
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <h3 className="text-[1.25rem] font-bold tracking-tight text-foreground">
          {build.name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {build.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {build.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#f3f4f6] px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* "View live/case →" — gap stays constant, arrow nudges via
            transform (no layout shift). Text color stays accent — no
            color shift on hover. */}
        {build.liveUrl && (
          <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-accent">
            {isInternal ? "View case" : "View live"}
            <motion.span
              aria-hidden="true"
              className="inline-block"
              animate={{
                x: hovered && !reduceMotion ? ARROW_NUDGE_PX : 0,
              }}
              transition={ARROW_SPRING}
            >
              &rarr;
            </motion.span>
          </span>
        )}
      </div>
    </>
  );

  // No liveUrl → non-interactive <article>, no hover state attached.
  if (!hasHover) {
    return <article className={CARD_CLASSES}>{cardInner}</article>;
  }

  // Internal path → Link. External URL → <a target="_blank">.
  if (isInternal) {
    return (
      <Link
        href={build.liveUrl!}
        className={CARD_CLASSES}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {cardInner}
      </Link>
    );
  }

  return (
    <a
      href={build.liveUrl!}
      target="_blank"
      rel="noopener noreferrer"
      className={CARD_CLASSES}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {cardInner}
    </a>
  );
}
