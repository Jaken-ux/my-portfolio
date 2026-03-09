import Link from "next/link";
import { projects } from "@/data/projects";
import ProjectCard from "@/components/ProjectCard";
import FadeIn from "@/components/FadeIn";

const highlights = [
  "13+ years experience",
  "B2B & Public sector",
  "Research, IA, Prototyping",
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
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">
            I help teams build clear, usable experiences through research,
            structure, prototyping and testing.
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
            <a
              href="/cv.pdf"
              download
              className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-background"
            >
              Download CV
            </a>
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
    </>
  );
}
