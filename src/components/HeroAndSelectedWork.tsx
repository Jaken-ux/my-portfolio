"use client";

import { useRef } from "react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import CVDownload from "@/components/CVDownload";
import SelectedWorkMorph from "@/components/SelectedWorkMorph";

const highlights = [
  "13+ years experience",
  "Complex products & B2B systems",
  "UX strategy & product thinking",
];

/**
 * Client wrapper that owns heroRef and renders hero + proof row + SelectedWorkMorph
 * together so the scroll-linked morph can read the hero element via a ref without
 * forcing page.tsx to become a client component. Proof row sits inside because it
 * lives between hero and Selected Work in the visual flow, and FadeIn here is
 * already a client component anyway.
 */
export default function HeroAndSelectedWork() {
  const heroRef = useRef<HTMLElement | null>(null);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="pb-20 pt-28 sm:pt-36">
        <FadeIn>
          <h1 className="max-w-2xl text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[3.25rem]">
            UX Designer who leads projects from insight to implementation.
          </h1>
        </FadeIn>
        <FadeIn>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
            I help teams build clear, usable experiences through research,
            structure, and AI-augmented prototyping — taking ideas from brief
            to working product in days, not weeks.
          </p>
        </FadeIn>
        <FadeIn>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/#work"
              className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all duration-200 hover:bg-[#333] hover:shadow-md"
            >
              View Work
            </Link>
            <CVDownload />
          </div>
        </FadeIn>
      </section>

      {/* Proof row */}
      <FadeIn>
        <section className="border-y border-border py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
            {highlights.map((item) => (
              <p
                key={item}
                className="text-[13px] font-semibold uppercase tracking-widest text-muted"
              >
                {item}
              </p>
            ))}
          </div>
        </section>
      </FadeIn>

      {/* Selected Work — cards morph from stack-pose-in-hero into row on scroll */}
      <SelectedWorkMorph heroRef={heroRef} />
    </>
  );
}
