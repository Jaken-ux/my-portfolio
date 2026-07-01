"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  type MotionValue,
} from "motion/react";
import FadeIn from "@/components/FadeIn";

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
  // Always a stable MotionValue (or undefined pre-hydration). NEVER a literal
  // number — motion v12 breaks its opacity subscription when the style prop
  // transitions from a literal to a motion value. See parent for the pattern.
  metaOpacity?: MotionValue<number>;
}) {
  const reduceMotion = useReducedMotion() ?? false;
  const [hovered, setHovered] = useState(false);

  // pointerType === "mouse" filter prevents touch taps from sticking in hover.
  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(true);
  };
  const handlePointerLeave = () => setHovered(false);

  return (
    <a
      href={card.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      <BrowserFrame>
        {/* overflow-hidden on this container is critical — clips the scaled
            image so the browser-frame chrome (3 dots) stays still and only
            the image content visually grows. */}
        <div className="relative aspect-[16/9] overflow-hidden">
          <motion.div
            className="absolute inset-0"
            animate={{ scale: hovered && !reduceMotion ? 1.07 : 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <Image
              src={card.image}
              alt={card.title}
              fill
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1100px) 50vw, 540px"
              className="object-cover"
            />
          </motion.div>
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
        <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-accent">
          View live
          <motion.span
            aria-hidden="true"
            className="inline-block"
            animate={{ x: hovered && !reduceMotion ? 4 : 0 }}
            transition={{ type: "spring", stiffness: 380, damping: 30 }}
          >
            &rarr;
          </motion.span>
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

  // Batched hydration + desktop detection in a single state atom so both
  // flags flip together after mount. Prevents an intermediate render where
  // hydrated=true but isDesktop=false, which would briefly pass literal
  // opacity=1 to motion.div for metadata — motion v12 sometimes doesn't
  // cleanly transition back to a motion-value binding from that state.
  const [{ hydrated, isDesktop }, setHydrationState] = useState({
    hydrated: false,
    isDesktop: false,
  });
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setHydrationState({ hydrated: true, isDesktop: mq.matches });
    const onChange = (e: MediaQueryListEvent) =>
      setHydrationState((s) => ({ ...s, isDesktop: e.matches }));
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  const shouldMorph = isDesktop && !reduceMotion;

  // Skip the scroll-driven morph during programmatic navigation (Case Studies
  // link) so the cards don't rush through their flight at smooth-scroll speed.
  // Released when scroll reaches the destination (progress >= 0.99) OR after
  // 1500ms fallback. Cards stay at row-pose throughout the smooth scroll.
  const [skipMorph, setSkipMorph] = useState(false);

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
  // stack reads as clean image-only frames mid-flight. Uses a stable
  // useMotionValue that we manually .set() based on scroll + state
  // (skipMorph, shouldMorph). The reference is fixed for the whole lifecycle;
  // motion.div's style prop points at the SAME motion value from hydration
  // onwards, so motion never has to re-subscribe (which is where motion v12
  // would drop updates after a literal-number transition).
  const scrollDerivedOpacity = useTransform(scrollYProgress, [0.6, 1], [0, 1]);
  const metaOpacityValue = useMotionValue(0);

  // Wire up skipMorph: arm via Header CustomEvent (same-page click) or via
  // window.location.hash at mount (cross-page nav with /#work URL).
  // Release early when scroll reaches destination, fallback timeout 1500ms.
  useEffect(() => {
    let timeoutId: number | undefined;
    let unsubscribe: (() => void) | undefined;

    const release = () => {
      setSkipMorph(false);
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
        timeoutId = undefined;
      }
      unsubscribe?.();
      unsubscribe = undefined;
    };

    const beginSkip = () => {
      setSkipMorph(true);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      unsubscribe?.();

      timeoutId = window.setTimeout(release, 1500);

      if (scrollYProgress.get() >= 0.99) {
        release();
        return;
      }
      unsubscribe = scrollYProgress.on("change", (value) => {
        if (value >= 0.99) release();
      });
    };

    if (window.location.hash === "#work") {
      beginSkip();
    }

    const handler = () => beginSkip();
    window.addEventListener("nav-skip-morph", handler);

    return () => {
      window.removeEventListener("nav-skip-morph", handler);
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
      unsubscribe?.();
    };
  }, [scrollYProgress]);

  const morphActive = shouldMorph && !skipMorph;

  // Drive the stable metaOpacityValue based on state + scroll. Never touches
  // the motion.div's style prop reference — only mutates the value inside.
  useEffect(() => {
    const update = () => {
      if (!hydrated) return;
      if (!shouldMorph || skipMorph) {
        metaOpacityValue.set(1);
      } else {
        metaOpacityValue.set(scrollDerivedOpacity.get());
      }
    };
    update();
    const unsub = scrollDerivedOpacity.on("change", update);
    return unsub;
  }, [hydrated, shouldMorph, skipMorph, scrollDerivedOpacity, metaOpacityValue]);
  const identityStyle = { y: 0, x: 0, rotate: 0, scale: 1 };

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
            morphActive
              ? { y: aY, x: aX, rotate: aRot, scale: aScale }
              : shouldMorph
                ? identityStyle
                : undefined
          }
        >
          <SelectedCard
            card={cards[0]}
            priority
            metaOpacity={hydrated ? metaOpacityValue : undefined}
          />
        </motion.div>
        <motion.div
          className="selected-card-stack-b"
          style={
            morphActive
              ? { y: bY, x: bX, rotate: bRot, scale: bScale }
              : shouldMorph
                ? identityStyle
                : undefined
          }
        >
          <SelectedCard
            card={cards[1]}
            priority
            metaOpacity={hydrated ? metaOpacityValue : undefined}
          />
        </motion.div>
      </div>
    </section>
  );
}
