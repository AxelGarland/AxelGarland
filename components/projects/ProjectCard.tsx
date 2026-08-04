"use client";

import type { Project } from "@/lib/projects";
import { projectThumbnailSrc } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

type ProjectCardProps = {
  project: Project;
};

export function ProjectCard({ project }: ProjectCardProps) {
  const thumb = projectThumbnailSrc(project);

  if (project.awaitingAssets) {
    return (
      <article className="group flex flex-col overflow-hidden rounded-lg border border-dashed border-ink/15 bg-surface-raised/30">
        <div className="flex aspect-[4/3] items-center justify-center bg-surface-raised/60 p-8">
          <span className="text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-subtle">
            Image coming soon
          </span>
        </div>
        <div className="flex flex-1 flex-col gap-2 p-5 md:p-6">
          <h3 className="font-display text-xl font-medium tracking-tight text-ink md:text-2xl">
            {project.title}
          </h3>
          <p className="text-sm leading-relaxed text-ink-muted">{project.summary}</p>
          <p className="mt-auto pt-3 text-xs uppercase tracking-[0.16em] text-ink-subtle">
            Placeholder
          </p>
        </div>
      </article>
    );
  }

  return (
    <Link
      href={`/illustration/${project.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-ink/10 bg-white/70 shadow-[0_20px_60px_-40px_rgba(12,12,14,0.12)] transition-shadow duration-500 hover:shadow-[0_28px_80px_-36px_rgba(12,12,14,0.16)]"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-surface-raised">
        {thumb ? (
          <Image
            src={thumb}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : null}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5 md:p-6">
        <h3 className="font-display text-xl font-medium tracking-tight text-ink transition-colors duration-500 group-hover:text-ink/80 md:text-2xl">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink-muted">{project.summary}</p>
      </div>
    </Link>
  );
}
