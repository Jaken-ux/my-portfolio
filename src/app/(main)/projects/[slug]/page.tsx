import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projectContent } from "@/content/projects";
import FadeIn from "@/components/FadeIn";

export function generateStaticParams() {
  return projectContent.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectContent.find((p) => p.slug === slug);
  if (!project) return {};
  const ogImage = project.heroImage || project.galleryImages[0]?.src;
  return {
    title: project.title,
    description: project.intro,
    openGraph: {
      title: `${project.title} — Jacob Jansson`,
      description: project.intro,
      ...(ogImage ? { images: [{ url: ogImage }] } : {}),
    },
  };
}

function GalleryGrid({ images }: { images: { src: string; caption: string; width: number; height: number }[] }) {
  if (images.length === 0) return null;
  return (
    <FadeIn>
      <div className={`mt-14 grid gap-8 ${images.length > 1 ? "sm:grid-cols-2 items-start" : ""}`}>
        {images.map((img, i) => (
          <figure key={i}>
            <Image
              src={img.src}
              alt={img.caption}
              width={img.width}
              height={img.height}
              className="img-shadow w-full rounded-xl"
              sizes={images.length === 1 ? "100vw" : "(max-width: 640px) 100vw, 50vw"}
            />
            <figcaption className="mt-3 text-xs italic text-muted">
              {img.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </FadeIn>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectContent.find((p) => p.slug === slug);

  if (!project) notFound();

  const hasGroups = project.galleryImages.some((img) => img.group != null);
  const galleryGroup = (g: number) =>
    project.galleryImages.filter((img) => img.group === g);
  const ungrouped = project.galleryImages.filter((img) => img.group == null);

  return (
    <article className="py-20 sm:py-28">
      {/* Back link */}
      <Link
        href="/#work"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-all duration-200 hover:gap-2.5 hover:text-foreground"
      >
        <span aria-hidden="true">&larr;</span>
        Back to projects
      </Link>

      {/* Case Header */}
      <FadeIn>
        <header className="mt-12">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#f3f4f6] px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-5 text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-foreground sm:text-5xl">
            {project.title}
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
            {project.intro}
          </p>

          {/* Demo link */}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex h-11 items-center rounded-full bg-foreground px-6 text-sm font-medium text-background transition-all duration-200 hover:bg-[#333] hover:shadow-md"
            >
              Play the Prototype &rarr;
            </a>
          )}

          {/* Quick Facts or Role/Timeline */}
          {project.quickFacts ? (
            <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-5 border-t border-border pt-7 text-sm sm:grid-cols-3 md:grid-cols-5">
              {project.quickFacts.map((fact) => (
                <div key={fact.label}>
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                    {fact.label}
                  </span>
                  <p className="mt-1.5 font-medium text-foreground">
                    {fact.value}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-10 flex flex-wrap gap-x-12 gap-y-4 border-t border-border pt-7 text-sm">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Role
                </span>
                <p className="mt-1.5 font-medium text-foreground">
                  {project.role}
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                  Timeline
                </span>
                <p className="mt-1.5 font-medium text-foreground">
                  {project.timeline}
                </p>
              </div>
            </div>
          )}
        </header>
      </FadeIn>

      {/* Hero image */}
      {project.heroImage && (
        <FadeIn>
          <div className="img-shadow relative mt-14 aspect-[16/9] overflow-hidden rounded-2xl bg-[#e5e7eb]">
            <Image
              src={project.heroImage}
              alt={project.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority
            />
          </div>
        </FadeIn>
      )}

      {/* The Challenge — side-by-side when group 0 has exactly 1 image, gallery above text when multiple */}
      {hasGroups && galleryGroup(0).length > 1 ? (
        <>
          <GalleryGrid images={galleryGroup(0)} />
          <FadeIn>
            <section className="mt-20">
              <h2 className="text-[1.75rem] font-bold tracking-tight text-foreground">
                {project.problemPoints ? "The Situation" : "Problem"}
              </h2>
              <p className="mt-5 max-w-2xl text-base leading-[1.75] text-muted">
                {project.problem}
              </p>
              {project.problemPoints && (
                <ul className="mt-5 max-w-2xl space-y-3">
                  {project.problemPoints.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-base leading-[1.75] text-muted"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </FadeIn>
        </>
      ) : hasGroups && galleryGroup(0).length === 1 ? (
        <FadeIn>
          <section className="mt-24 grid items-center gap-10 md:grid-cols-2 md:gap-14">
            {/* Image left */}
            <figure>
              <Image
                src={galleryGroup(0)[0].src}
                alt={galleryGroup(0)[0].caption}
                width={galleryGroup(0)[0].width}
                height={galleryGroup(0)[0].height}
                className="img-shadow w-full rounded-2xl"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <figcaption className="mt-3 text-xs italic text-muted">
                {galleryGroup(0)[0].caption}
              </figcaption>
            </figure>

            {/* Text right */}
            <div>
              <h2 className="text-[1.75rem] font-bold tracking-tight text-foreground">
                {project.problemPoints ? "The Challenge" : "Problem"}
              </h2>
              <p className="mt-5 text-base leading-[1.75] text-muted">
                {project.problem}
              </p>
              {project.problemPoints && (
                <ul className="mt-5 space-y-3">
                  {project.problemPoints.map((point, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-base leading-[1.75] text-muted"
                    >
                      <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </section>
        </FadeIn>
      ) : (
        <FadeIn>
          <section className="mt-24">
            <h2 className="text-[1.75rem] font-bold tracking-tight text-foreground">
              {project.problemPoints ? "The Challenge" : "Problem"}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.75] text-muted">
              {project.problem}
            </p>
            {project.problemPoints && (
              <ul className="mt-5 max-w-2xl space-y-3">
                {project.problemPoints.map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-base leading-[1.75] text-muted"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </section>
        </FadeIn>
      )}

      {/* What I Built / Approach */}
      <FadeIn>
        <section className="mt-20">
          <h2 className="text-[1.75rem] font-bold tracking-tight text-foreground">
            {project.approachHeading ?? (project.features ? "What I Built" : "Approach")}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-[1.75] text-muted">
            {project.approach}
          </p>
          {project.approachExtra && (
            <p className="mt-4 max-w-2xl text-base leading-[1.75] text-muted">
              {project.approachExtra}
            </p>
          )}
          {project.features && (
            <ul className="mt-6 max-w-2xl space-y-3">
              {project.features.map((feature, i) => (
                <li
                  key={i}
                  className={`flex items-start gap-3 text-base leading-[1.75] ${project.approachHeading ? "text-muted" : "text-foreground"}`}
                >
                  {project.approachHeading ? (
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                  ) : (
                    <span className="mt-1 text-accent">&#10003;</span>
                  )}
                  {feature}
                </li>
              ))}
            </ul>
          )}
        </section>
      </FadeIn>

      {/* Gallery group 1 (after What I Built) */}
      {hasGroups ? (
        <GalleryGrid images={galleryGroup(1)} />
      ) : ungrouped.length > 0 ? (
        <GalleryGrid images={ungrouped.slice(0, 2)} />
      ) : null}

      {/* Key Decisions — card grid */}
      <FadeIn>
        <section className="mt-20">
          <h2 className="text-[1.75rem] font-bold tracking-tight text-foreground">
            {project.decisionsHeading ?? "Key Architectural Decisions"}
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {project.decisions.map((decision, i) =>
              typeof decision === "string" ? (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-[#fafafa] p-6"
                >
                  <p className="text-base leading-[1.75] text-muted">
                    {decision}
                  </p>
                </div>
              ) : (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-[#fafafa] p-6"
                >
                  <span className="text-[2rem] font-extrabold leading-none text-border">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 text-base font-semibold text-foreground">
                    {decision.title}
                  </h3>
                  <p className="mt-2 text-[15px] leading-[1.75] text-muted">
                    {decision.description}
                  </p>
                </div>
              )
            )}
          </div>
        </section>
      </FadeIn>

      {/* Solution (only if present) */}
      {project.solution && (
        <FadeIn>
          <section className="mt-20">
            <h2 className="text-[1.75rem] font-bold tracking-tight text-foreground">
              Solution
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-[1.75] text-muted">
              {project.solution}
            </p>
          </section>
        </FadeIn>
      )}

      {/* Gallery group 2 (after Key Decisions / Solution) */}
      {hasGroups ? (
        <GalleryGrid images={galleryGroup(2)} />
      ) : ungrouped.length > 2 ? (
        <GalleryGrid images={ungrouped.slice(2)} />
      ) : null}

      {/* Gallery group 3 (after group 2, before outcome) */}
      {hasGroups && galleryGroup(3).length > 0 && (
        <GalleryGrid images={galleryGroup(3)} />
      )}

      {/* Outcome + Learnings — two-column layout */}
      <FadeIn>
        <section className="mt-20 grid gap-12 border-t border-border pt-16 md:grid-cols-2 md:gap-16">
          {/* Outcome */}
          <div>
            <h2 className="text-[1.75rem] font-bold tracking-tight text-foreground">
              Outcome
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-muted">
              {project.outcome}
            </p>
            {project.outcomePoints && (
              <ul className="mt-5 space-y-3">
                {project.outcomePoints.map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-base leading-[1.75] text-muted"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Learnings */}
          <div>
            <h2 className="text-[1.75rem] font-bold tracking-tight text-foreground">
              What I Learned
            </h2>
            <p className="mt-5 text-base leading-[1.75] text-muted">
              {project.learnings}
            </p>
            {project.learningPoints && (
              <ul className="mt-5 space-y-3">
                {project.learningPoints.map((point, i) => (
                  <li
                    key={i}
                    className="flex gap-3 text-base leading-[1.75] text-muted"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      </FadeIn>

      {/* Closing statement — highlight block */}
      {project.closingStatement && (
        <FadeIn>
          <section className="mt-20 rounded-2xl bg-foreground px-8 py-12 sm:px-12 sm:py-16">
            <p className="max-w-2xl text-xl font-semibold leading-relaxed text-background sm:text-2xl">
              &ldquo;{project.closingStatement}&rdquo;
            </p>
          </section>
        </FadeIn>
      )}

      {/* Bottom nav */}
      <FadeIn>
        <div className="mt-24 border-t border-border pt-10">
          <Link
            href="/#work"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-all duration-200 hover:gap-2.5 hover:text-foreground"
          >
            <span aria-hidden="true">&larr;</span>
            Back to projects
          </Link>
        </div>
      </FadeIn>
    </article>
  );
}
