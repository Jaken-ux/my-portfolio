import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/FadeIn";
import HeroAndSelectedWork from "@/components/HeroAndSelectedWork";
import CyclingStatement from "@/components/CyclingStatement";

export default function Home() {
  return (
    <>
      {/* Hero + Proof row + Selected Work morph (client-wrapped because they share heroRef) */}
      <HeroAndSelectedWork />

      {/* Availability */}
      <FadeIn>
        <section className="py-16">
          <div className="rounded-2xl border border-border bg-white p-8 sm:p-10">
            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between md:gap-12">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-widest text-muted">
                  <span
                    className="relative flex h-2 w-2 items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#10b981] opacity-60" />
                    <span className="relative h-2 w-2 rounded-full bg-[#10b981]" />
                  </span>
                  Currently available
                </span>
                <p className="mt-4 text-lg leading-relaxed text-foreground">
                  Senior UX, AI prototyping, and discovery work — open for
                  contract, fractional, or under-consultant roles. Remote or
                  Stockholm-based.
                </p>
              </div>
              <Link
                href="/contact"
                className="inline-flex h-11 shrink-0 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all duration-200 hover:bg-[#333] hover:shadow-md"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </section>
      </FadeIn>

      {/* Featured Projects */}
      <section id="work" className="py-24">
        <FadeIn>
          <h2 className="text-[1.75rem] font-bold tracking-tight text-foreground">
            Featured Projects
          </h2>
        </FadeIn>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {projects.map((project) => (
            <FadeIn key={project.slug}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Writing teaser */}
      <section className="border-t border-border py-24">
        <FadeIn>
          <h2 className="text-[1.75rem] font-bold tracking-tight text-foreground">
            Writing
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Builder logs on AI-augmented development, decentralized
            infrastructure, and what becomes possible when the gap between
            idea and execution shrinks.
          </p>
          <div className="mt-6">
            <Link
              href="/writing"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-all duration-200 hover:gap-2 hover:text-accent-hover"
            >
              Read the journal
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </FadeIn>
      </section>

      {/* Cycling statement — last before footer */}
      <CyclingStatement />
    </>
  );
}
