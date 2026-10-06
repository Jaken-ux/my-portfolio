"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  type MotionValue,
} from "motion/react";
import FadeIn from "@/components/FadeIn";

// Flowscan now points at its internal case study page rather than the live
// product. External URLs (http/https) still open in a new tab; internal paths
// use Next's Link for client-side routing and MUST NOT get target="_blank".
function isExternalHref(href: string): boolean {
  return href.startsWith("http://") || href.startsWith("https://");
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
      "Launched SaaS for UX and accessibility audits. AI surfaces problems, code decides what matters.",
    image: "/images/ai-builds/flowscan.webp",
    tags: ["UX & Accessibility", "Multi-engine", "SaaS"],
    href: "/projects/flowscan",
  },
  {
    title: "Spelporten — Curated board game store",
    description: "A curated board game store, designed, built and launched end to end, from brand to shipping.",
    image: "/images/spelporten/spelporten-hero.webp",
    tags: ["E-commerce", "Product Design", "Shopify"],
    href: "/projects/spelporten",
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
  const external = isExternalHref(card.href);

  // pointerType === "mouse" filter prevents touch taps from sticking in hover.
  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") setHovered(true);
  };
  const handlePointerLeave = () => setHovered(false);

  const cardInner = (
    <>
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
              className="object-cover object-top"
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
          {external ? "View live" : "View case"}
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
    </>
  );

  // External URL → plain anchor opening in a new tab.
  // Internal path → Next Link for client-side routing, no target="_blank".
  if (external) {
    return (
      <a
        href={card.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block"
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        {cardInner}
      </a>
    );
  }
  return (
    <Link
      href={card.href}
      className="group block"
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
    >
      {cardInner}
    </Link>
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
      // Next.js App Router doesn't reliably scroll to the hash on cross-page
      // navigation (e.g. /ai-builds → /#work). Do it explicitly on mount.
      // requestAnimationFrame lets the section layout settle before scrolling,
      // and is a no-op if the browser already jumped there synchronously.
      requestAnimationFrame(() => {
        document
          .getElementById("work")
          ?.scrollIntoView({ behavior: "smooth" });
      });
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
        <h2 className="text-[1.75rem] font-display font-semibold tracking-[-0.015em] text-foreground">
          Products I&apos;ve launched
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
          I founded both and took them from idea to live business: product
          design, AI-assisted development, hosting, payments and terms, and for
          Spelporten also suppliers and shipping.
        </p>
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
