import Image from "next/image";
import FadeIn from "@/components/FadeIn";

const workBlockNumbers = ["01", "02", "03"];

export const metadata = {
  title: "About – Jacob Jansson",
  description:
    "Senior UX Designer with 13+ years of experience in B2B and public sector.",
};

const workBlocks = [
  {
    title: "System-first thinking",
    text: "I approach design as part of a larger system \u2014 technical, organizational and human. Before solving a screen, I map structure, dependencies and long-term consequences.",
  },
  {
    title: "Clarity through structure",
    text: "Complexity doesn\u2019t scare me \u2014 but unmanaged complexity does. I focus on hierarchy, architecture and decision clarity before refining the surface.",
  },
  {
    title: "AI-augmented execution",
    text: "I treat AI as a structured collaborator. By framing problems precisely and iterating systematically, I translate design thinking into working systems \u2014 not just concepts.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="pb-24 pt-28 sm:pt-32">
        <div className="grid items-start gap-12 md:grid-cols-[380px_1fr] md:gap-16 lg:grid-cols-[420px_1fr]">
          {/* Portrait */}
          <FadeIn>
            <div className="relative mx-auto aspect-[3/4] w-full max-w-[420px] overflow-hidden rounded-2xl bg-[#e5e7eb] shadow-[0_8px_30px_rgba(0,0,0,0.08)]">
              <Image
                src="/images/about/profilbild.jpg"
                alt="Jacob Jansson"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 420px"
                priority
              />
            </div>
          </FadeIn>

          {/* Headline + intro */}
          <div className="flex flex-col justify-center">
            <FadeIn>
              <h1 className="text-[2.25rem] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-[2.75rem]">
                About Jacob
              </h1>
            </FadeIn>

            <FadeIn>
              <div className="mt-8 max-w-[580px] space-y-5 text-[17px] leading-[1.75] text-muted">
                <p>
                  With over 13 years of experience in UX, I&rsquo;ve worked
                  across medtech, public sector and large B2B organizations
                  &mdash; designing everything from safety-critical medical
                  interfaces to complex financial and telecom systems.
                </p>
                <p>
                  I began my career designing interfaces for ventilators and
                  anesthesia machines, where clarity and precision were not just
                  usability concerns &mdash; but safety requirements. That
                  foundation shaped how I think about structure, hierarchy and
                  responsibility in design.
                </p>
                <p>
                  At the Swedish Pensions Agency, I combined UX with business
                  development, working closely with stakeholders to align user
                  needs with organizational goals. Since then, I&rsquo;ve worked
                  as a consultant across diverse domains, taking on roles ranging
                  from hands-on UX design to UX lead and strategy.
                </p>
                <p>
                  I thrive in roles where I can zoom out, understand the full
                  system, and guide teams toward clear, practical solutions. My
                  strength lies in bridging research, structure and
                  implementation &mdash; ensuring ideas don&rsquo;t stop at
                  wireframes but move into real products.
                </p>
                <p>
                  More recently, I&rsquo;ve expanded my work into AI-augmented
                  product development &mdash; building and architecting full
                  systems in collaboration with AI tools. This has deepened my
                  technical understanding and sharpened my ability to think in
                  terms of architecture, state, and scalability.
                </p>
              </div>
            </FadeIn>

            <FadeIn>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="mailto:Jansson.jacob@gmail.com"
                  className="inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all duration-200 hover:bg-[#333] hover:shadow-md"
                >
                  Get in touch
                </a>
                <a
                  href="/cv/Jacob_Jansson_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-background"
                >
                  Download CV
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── How I Work ── */}
      <section className="border-t border-border py-24">
        <FadeIn>
          <h2 className="text-[1.75rem] font-bold tracking-tight text-foreground">
            How I Work
          </h2>
          <p className="mt-4 max-w-lg text-base leading-relaxed text-muted">
            Principles that guide how I build products.
          </p>
        </FadeIn>

        <div className="mt-16 grid gap-12 sm:grid-cols-3 sm:gap-10">
          {workBlocks.map((block, i) => (
            <FadeIn key={block.title}>
              <div>
                <span className="text-[2rem] font-extrabold leading-none text-border">
                  {workBlockNumbers[i]}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-foreground">
                  {block.title}
                </h3>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">
                  {block.text}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>
    </>
  );
}
