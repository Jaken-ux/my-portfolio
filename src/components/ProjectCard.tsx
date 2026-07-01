"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  const reduceMotion = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState(false);

  const isExternal = Boolean(project.externalUrl);
  const href = project.externalUrl ?? `/projects/${project.slug}`;
  const ctaLabel = project.cta ?? "View case";

  // Calm: no lift, no shadow swap, no image scale.
  // Only the border darkens slightly on hover (Tailwind's hover: is already
  // scoped to @media (hover: hover), so touch taps won't trigger it).
  const cardClasses =
    "group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-colors duration-300 hover:border-foreground/20";

  // Pointer enter only fires for mouse — touch taps don't set hovered state,
  // so the arrow nudge never sticks after a tap.
  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(true);
  };
  const handlePointerLeave = () => setHovered(false);

  const cardInner = (
    <>
      {/* Image — no scale on hover for either logos or photos */}
      <div
        className={`relative aspect-[16/10] overflow-hidden ${
          project.imageType === "logo" ? "bg-white" : "bg-[#e5e7eb]"
        }`}
      >
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={
            project.imageType === "logo"
              ? `object-contain ${project.slug === "husqvarna-dealer-portal" ? "p-10" : "p-6"}`
              : "object-cover"
          }
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#f3f4f6] px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA — arrow nudges right on hover, spring-soft, skipped on reduced-motion */}
        <span className="mt-auto inline-flex items-center gap-1 pt-5 text-sm font-medium text-accent">
          {ctaLabel}
          <motion.span
            aria-hidden="true"
            className="inline-block"
            animate={{ x: hovered && !reduceMotion ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          >
            &rarr;
          </motion.span>
        </span>
      </div>
    </>
  );

  return isExternal ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClasses}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {cardInner}
    </a>
  ) : (
    <Link
      href={href}
      className={cardClasses}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {cardInner}
    </Link>
  );
}
