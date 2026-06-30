"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import FadeIn from "@/components/FadeIn";

// Detect desktop without flashing — initial value matches SSR (false).
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return isDesktop;
}

type Card = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  href: string;
};

const cards: Card[] = [
  {
    title: "Flowscan — Web UX & accessibility analysis",
    description:
      "Multi-engine UX & accessibility audit — AI surfaces problems, code decides what matters.",
    image: "/images/ai-builds/flowscan.webp",
    tags: ["UX & Accessibility", "Multi-engine", "SaaS"],
    href: "https://flowscan.se",
  },
  {
    title: "Theta Simplified",
    description:
      "Live analytics for the Theta blockchain — composite indexes, on-chain data, integrated AI.",
    image: "/images/ai-builds/theta-wide.webp",
    tags: ["AI Product", "Web3", "Self-hosted"],
    href: "https://thetasimplified.com",
  },
];

function BrowserFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="overflow-hidden rounded-xl border border-black/10 bg-white shadow-[0_20px_50px_-12px_rgba(0,0,0,0.25)]">
      <div className="flex items-center gap-1.5 border-b border-black/5 bg-[#f5f5f7] px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" aria-hidden />
      </div>
      {children}
    </div>
  );
}

function SelectedCard({
  card,
  priority = false,
  metaOpacity,
}: {
  card: Card;
  priority?: boolean;
  metaOpacity?: MotionValue<number> | number;
}) {
  return (
    <a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <BrowserFrame>
        <div className="relative aspect-[16/9]">
          <Image
            src={card.image}
            alt={card.title}
            fill
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 540px"
            className="object-cover"
          />
        </div>
      </BrowserFrame>
      <motion.div
        className="mt-5 px-1 md:motion-safe:opacity-0"
        style={metaOpacity !== undefined ? { opacity: metaOpacity } : undefined}
      >
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {card.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {card.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {card.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#f3f4f6] px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent transition-all duration-200 group-hover:gap-2 group-hover:text-accent-hover">
          View live
          <span aria-hidden="true">&rarr;</span>
        </span>
      </motion.div>
    </a>
  );
}

export default function SelectedWorkMorph({
  heroRef,
}: {
  heroRef: RefObject<HTMLElement | null>;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const isDesktop = useIsDesktop();
  const shouldMorph = isDesktop && !reduceMotion;

  // Track hydration so SSR/first-paint matches the no-style state.
  // After hydration we pass an explicit opacity (1 on mobile/reduced,
  // motion value on desktop+motion-safe) so nothing can hide metadata
  // by accident — inline style beats every CSS rule.
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => {
    setHydrated(true);
  }, []);

  // Scroll progress tracked against the hero section, NOT Selected Work,
  // so progress is guaranteed = 0 at scrollY=0 (page top, hero in view).
  // 0 = hero top at viewport top (page top, cards in stack-pose, visually in hero)
  // 1 = hero bottom at viewport top (hero just scrolled past, cards in row-pose)
  const { scrollYProgress } = useScroll({
    target: heroRef as RefObject<HTMLElement>,
    offset: ["start start", "end start"],
  });

  // Stack-pose values MUST match the CSS rule below in globals.css.
  // Card A (Flowscan, left in row → shifted into right half of hero in stack).
  const aY = useTransform(scrollYProgress, [0, 1], [-780, 0]);
  const aX = useTransform(scrollYProgress, [0, 1], [500, 0]);
  const aRot = useTransform(scrollYProgress, [0, 1], [-5, 0]);
  const aScale = useTransform(scrollYProgress, [0, 1], [0.62, 1]);

  // Card B (Theta, right in row → stays close to A in stack, slight stagger).
  const bY = useTransform(scrollYProgress, [0, 1], [-800, 0]);
  const bX = useTransform(scrollYProgress, [0, 1], [80, 0]);
  const bRot = useTransform(scrollYProgress, [0, 1], [6, 0]);
  const bScale = useTransform(scrollYProgress, [0, 1], [0.62, 1]);

  // Metadata opacity — text fades in toward the end of the flight, so the
  // stack reads as clean image-only frames mid-flight. CSS fallback below
  // matches the initial value (0) on desktop+motion-safe to avoid first-paint.
  const metaOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 border-t border-border py-24"
    >
      <FadeIn>
        <h2 className="text-[1.75rem] font-bold tracking-tight text-foreground">
          Selected Work
        </h2>
      </FadeIn>
      <div className="mt-12 grid gap-12 sm:grid-cols-2 sm:gap-8">
        <motion.div
          className="selected-card-stack-a"
          style={
            shouldMorph
              ? { y: aY, x: aX, rotate: aRot, scale: aScale }
              : undefined
          }
        >
          <SelectedCard
            card={cards[0]}
            priority
            metaOpacity={
              hydrated ? (shouldMorph ? metaOpacity : 1) : undefined
            }
          />
        </motion.div>
        <motion.div
          className="selected-card-stack-b"
          style={
            shouldMorph
              ? { y: bY, x: bX, rotate: bRot, scale: bScale }
              : undefined
          }
        >
          <SelectedCard
            card={cards[1]}
            metaOpacity={
              hydrated ? (shouldMorph ? metaOpacity : 1) : undefined
            }
          />
        </motion.div>
      </div>
    </section>
  );
}
