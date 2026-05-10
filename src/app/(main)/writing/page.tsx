import FadeIn from "@/components/FadeIn";

export const metadata = {
  title: "Writing — Jacob Jansson",
  description:
    "Builder logs on AI-augmented development, decentralized infrastructure, and the workflows emerging when one person with the right tools can build what used to take a team.",
};

const posts: {
  title: string;
  date: string;
  readTime: string;
  description: string;
  url: string;
}[] = [
  {
    title:
      "Calling Theta EdgeCloud directly from Claude — a working MCP setup",
    date: "May 2026",
    readTime: "4 min read",
    description:
      "Connecting Claude to a decentralized GPU network through MCP. The result: the conversation itself becomes the integration layer.",
    url: "https://thetasimplified.com/journal/claude-edgecloud-mcp",
  },
  {
    title: "Running a multi-step AI pipeline on Theta — text, image, vision",
    date: "May 2026",
    readTime: "5 min read",
    description:
      "Three different models, three modalities, all routed through a single conversational prompt. No glue code, no API juggling.",
    url: "https://thetasimplified.com/journal/multi-step-pipeline-on-theta",
  },
  {
    title: "Teaching my chatbot what’s actually true",
    date: "May 2026",
    readTime: "2 min read",
    description:
      "Fluent isn’t correct. Why structural guardrails beat correcting individual hallucinations.",
    url: "https://thetasimplified.com/journal/teaching-my-chatbot-what-is-true",
  },
  {
    title: "Transcribing Theta’s own AMA on Theta’s own Whisper",
    date: "May 2026",
    readTime: "5 min read",
    description:
      "An hour of audio in 5 minutes for less than half a cent. What it means when inference becomes a side project, not a procurement decision.",
    url: "https://thetasimplified.com/journal/transcribing-theta-ama-with-whisper",
  },
  {
    title: "Late night thoughts on TFUEL, the utility token",
    date: "May 2026",
    readTime: "3 min read",
    description:
      "Notes on a small economic loop: tokens earned by participating, spent on inference for an actual application.",
    url: "https://thetasimplified.com/journal/tfuel-the-utility-token",
  },
  {
    title: "Four numbers I actually watch to read Theta’s trajectory",
    date: "May 2026",
    readTime: "4 min read",
    description:
      "Most Theta dashboards point at one number and call it a trend. These four — boring, slow-moving — actually tell you where the network is going.",
    url: "https://thetasimplified.com/journal/four-numbers-theta-trajectory",
  },
];

export default function WritingPage() {
  return (
    <>
      {/* Hero */}
      <section className="pb-16 pt-28 sm:pt-36">
        <FadeIn>
          <h1 className="max-w-3xl text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-[3.25rem]">
            Writing
          </h1>
        </FadeIn>
        <FadeIn>
          <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-muted">
            <p>
              Builder logs on AI-augmented development, decentralized
              infrastructure, and the workflows emerging when one person with
              the right tools can build what used to take a team.
            </p>
            <p>
              Most posts originate on the Theta Simplified Journal — collected
              here for context.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Posts */}
      <section className="pb-16">
        <div className="grid gap-6">
          {posts.map((post) => (
            <FadeIn key={post.url}>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground hover:shadow-lg sm:p-8"
              >
                <p className="text-xs font-semibold uppercase tracking-widest text-muted">
                  {post.date} · {post.readTime}
                </p>
                <h2 className="mt-3 text-[1.35rem] font-bold tracking-tight text-foreground sm:text-[1.5rem]">
                  {post.title}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
                  {post.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-accent transition-all duration-200 group-hover:gap-2 group-hover:text-accent-hover">
                  Read full post
                  <span aria-hidden="true">&rarr;</span>
                </span>
              </a>
            </FadeIn>
          ))}
        </div>
      </section>

      {/* All posts link */}
      <FadeIn>
        <section className="mb-24 border-t border-border pt-10">
          <a
            href="https://thetasimplified.com/journal"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm font-medium text-accent transition-all duration-200 hover:gap-2 hover:text-accent-hover"
          >
            All posts in their original form on Theta Simplified Journal
            <span aria-hidden="true">&rarr;</span>
          </a>
        </section>
      </FadeIn>
    </>
  );
}
