import Link from "next/link";
import { projects, buildingNow } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/FadeIn";
import CVDownload from "@/components/CVDownload";

const highlights = [
  "13+ years experience",
  "Complex products & B2B systems",
  "UX strategy & product thinking",
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="pb-20 pt-28 sm:pt-36">
        <FadeIn>
          <h1 className="max-w-2xl text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[3.25rem]">
            UX Designer who leads projects from insight to implementation.
          </h1>
        </FadeIn>
        <FadeIn>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
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

      {/* Building Now */}
      <section className="border-t border-border py-24">
        <FadeIn>
          <h2 className="text-[1.75rem] font-bold tracking-tight text-foreground">
            Building Now
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">
            Side projects exploring what AI-augmented development makes
            possible. Working products, not concepts.
          </p>
        </FadeIn>

        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {buildingNow.map((project) => (
            <FadeIn key={project.slug}>
              <ProjectCard project={project} />
            </FadeIn>
          ))}
        </div>

        <FadeIn>
          <div className="mt-10">
            <Link
              href="/ai-builds"
              className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-all duration-200 hover:gap-2 hover:text-accent-hover"
            >
              See all AI builds
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </FadeIn>
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
    </>
  );
}
