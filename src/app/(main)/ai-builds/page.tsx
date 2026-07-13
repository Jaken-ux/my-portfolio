import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import PrimaryCTA from "@/components/PrimaryCTA";
import AIBuildCard, { type Build } from "@/components/AIBuildCard";

export const metadata = {
  title: "AI Builds — Jacob Jansson",
  description:
    "Working prototypes, not mockups. AI-prototyped products built in days, not weeks.",
};

const proofPoints = [
  "BUILT WITH AI · NOT FIGMA",
  "INTERACTIVE FROM DAY ONE",
  "READY FOR USER TESTING",
];

const methodPoints = [
  {
    title: "From brief to clickable in days",
    body:
      "Skip the static-mockup phase. AI-assisted development means clients test the actual product, not an interpretation of it.",
  },
  {
    title: "Real data, real interactions",
    body:
      "Live APIs, real state, real edge cases. Decisions get made on how it actually behaves — not how it might.",
  },
  {
    title: "Built to evolve",
    body:
      "The prototype is the foundation, not throwaway work. What gets validated becomes what gets shipped.",
  },
];

const builds: Build[] = [
  {
    name: "Flowscan — Web UX & accessibility analysis",
    description:
      "A website analysis tool that runs several engines in parallel — performance, accessibility, computer vision and copy — and weighs the findings deterministically. AI surfaces the problems; code decides what matters most, the same way every time.",
    tags: ["UX & Accessibility", "Multi-engine", "SaaS"],
    status: "LIVE",
    beta: true,
    image: "/images/ai-builds/flowscan.webp",
    liveUrl: "https://flowscan.se",
  },
  {
    name: "Theta Simplified",
    description:
      "Live analytics platform for the Theta blockchain ecosystem. Composite indexes, on-chain data, integrated AI assistant — all running on decentralized GPU infrastructure.",
    tags: ["AI Product", "Web3", "Self-hosted"],
    status: "LIVE",
    image: "/images/ai-builds/thetasimplified.webp",
    liveUrl: "https://thetasimplified.com",
  },
  {
    name: "EdgeCloud AI Assistant",
    description:
      "Self-trained, domain-optimized AI chatbot running on Theta EdgeCloud. Tuned to answer live on-chain queries about the Theta ecosystem.",
    tags: ["AI Assistant", "Live Data", "Self-Hosted"],
    status: "LIVE",
    image: "/images/ai-builds/aibot.webp",
    liveUrl: "https://thetasimplified.com/use-edgecloud",
  },
  {
    name: "Manor Lords",
    description:
      "Real-time multiplayer strategy game built end-to-end through AI-augmented development. From mechanic design to deployment.",
    tags: ["Multiplayer Game", "AI-Augmented Build", "Real-time"],
    status: "LIVE",
    image: "/images/manor-lords/main.webp",
    liveUrl: "/projects/manor-lords",
  },
  {
    name: "Fagerhult Sustainability Calculator",
    description:
      "Interactive simulation showing customers how much CO₂ and energy they can save by switching luminaires.",
    tags: ["Sales Tool", "Real-time Calculation", "B2B"],
    status: "PROTOTYPE",
    image: "/images/ai-builds/Fagerhult.webp",
    liveUrl: "https://jaken-ux.github.io/fagerhultdemo/",
  },
  {
    name: "TLV Intranät “Atlas”",
    description:
      "Concept intranet for the Swedish Dental and Pharmaceutical Benefits Agency — built as a tender response.",
    tags: ["Public Sector", "IA", "Concept"],
    status: "CONCEPT",
    image: "/images/ai-builds/TLV.webp",
    liveUrl: "https://jaken-ux.github.io/TLV/index.html",
  },
  {
    name: "Klocktornet — B2B Event Service",
    description:
      "Launched a facilitated team-building service from idea to live product — positioning, branding, SEO, pricing, contracts, and booking flow. Built and deployed in days, not weeks.",
    tags: ["Service Design", "Brand Strategy", "SEO"],
    status: "LIVE",
    image: "/images/ai-builds/klocktornet.webp",
    liveUrl: "https://www.theclocktower.se",
  },
];

export default function AIBuildsPage() {
  return (
    <>
      {/* Hero */}
      <section className="pb-20 pt-28 sm:pt-36">
        <FadeIn>
          <h1 className="max-w-3xl text-[2.5rem] font-display font-semibold leading-[1.1] tracking-[-0.015em] text-foreground sm:text-5xl md:text-[3.25rem]">
            Working prototypes, not mockups.
          </h1>
        </FadeIn>
        <FadeIn>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            I build interactive AI-prototyped products instead of static Figma
            files. Real interactions, real data, real decisions — in days, not
            weeks.
          </p>
        </FadeIn>
        <FadeIn>
          <div className="mt-10 flex flex-wrap gap-4">
            <PrimaryCTA href="/contact">Get in touch</PrimaryCTA>
            <a
              href="#builds"
              className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-background"
            >
              See the builds ↓
            </a>
          </div>
        </FadeIn>
      </section>

      {/* Proof row */}
      <FadeIn>
        <section className="border-y border-border py-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between">
            {proofPoints.map((item) => (
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

      {/* How I work */}
      <section className="py-24">
        <FadeIn>
          <h2 className="text-[1.75rem] font-display font-semibold tracking-[-0.015em] text-foreground">
            How I work
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {methodPoints.map((point) => (
            <FadeIn key={point.title}>
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {point.title}
                </h3>
                <p className="mt-3 text-base leading-[1.75] text-muted">
                  {point.body}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* Builds */}
      <section id="builds" className="pb-24">
        <FadeIn>
          <h2 className="text-[1.75rem] font-display font-semibold tracking-[-0.015em] text-foreground">
            Builds
          </h2>
        </FadeIn>
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          {builds.map((build) => (
            <FadeIn key={build.name}>
              <AIBuildCard build={build} />
            </FadeIn>
          ))}
        </div>
      </section>

      {/* CTA */}
      <FadeIn>
        <section className="mb-24 rounded-2xl border border-border bg-white px-8 py-12 sm:px-12 sm:py-16">
          <h2 className="max-w-2xl text-[2rem] font-display font-semibold leading-[1.15] tracking-[-0.015em] text-foreground sm:text-[2.5rem]">
            Got an idea? Let’s prototype it.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted">
            I take on small AI prototyping projects alongside my consulting
            work. If you’ve got an internal tool, sales aid, or product concept
            that needs to become real fast — get in touch.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <PrimaryCTA href="/contact">Get in touch</PrimaryCTA>
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-full border border-border px-6 text-sm font-medium text-foreground transition-all duration-200 hover:border-foreground hover:bg-foreground hover:text-background"
            >
              See main portfolio
            </Link>
          </div>
        </section>
      </FadeIn>
    </>
  );
}
