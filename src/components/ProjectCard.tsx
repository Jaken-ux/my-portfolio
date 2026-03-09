import Link from "next/link";
import Image from "next/image";
import type { Project } from "@/data/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      {/* Image */}
      <div className={`relative aspect-[16/10] overflow-hidden ${
        project.imageType === "logo" ? "bg-white" : "bg-[#e5e7eb]"
      }`}>
        <Image
          src={project.image}
          alt={project.title}
          fill
          className={
            project.imageType === "logo"
              ? "object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-[1.05]"
              : "object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          }
          sizes="(max-width: 640px) 100vw, 50vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
        <h3 className="text-base font-semibold tracking-tight text-foreground">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          {project.description}
        </p>

        {/* Tags */}
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-[#f3f4f6] px-2.5 py-0.5 text-[11px] font-medium tracking-wide text-muted"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <span className="mt-auto inline-flex items-center pt-5 gap-1 text-sm font-medium text-accent transition-all duration-200 group-hover:gap-2 group-hover:text-accent-hover">
          View case
          <span aria-hidden="true">&rarr;</span>
        </span>
      </div>
    </Link>
  );
}
