"use client";

import type { AccentColor, Project } from "@/lib/projects";
import { projectThumbnailSrc } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const ACCENT_TEXT: Record<AccentColor, string> = {
  coral: "text-coral",
  teal: "text-teal",
  indigo: "text-indigo",
  gold: "text-gold",
};

/**
 * A flush row of project images with no card chrome. On hover (desktop), the hovered tile's
 * caption slides up over it and its siblings squeeze narrower to make room — a horizontal
 * accordion instead of a grid of bounding boxes. On touch, there's no hover to borrow for a
 * preview state, so a tap goes straight to the project and the caption sits below the image
 * at all times.
 */
export function AccordionRow({ projects }: { projects: Project[] }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <>
      {/* Desktop / hover-capable */}
      <div className="hidden md:flex md:h-[56vh] md:max-h-[620px] md:min-h-[360px] md:w-full md:gap-[3px]">
        {projects.map((project, i) => {
          const thumb = projectThumbnailSrc(project);
          const isHovered = hovered === i;
          const isSqueezed = hovered !== null && !isHovered;
          const accent = project.accentColor;

          return (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              onFocus={() => setHovered(i)}
              onBlur={() => setHovered(null)}
              className="group relative block overflow-hidden bg-surface-raised transition-[flex-grow] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
              style={{ flexGrow: isHovered ? 2.2 : isSqueezed ? 0.68 : 1, flexBasis: 0, flexShrink: 1 }}
            >
              {thumb ? (
                <Image
                  src={thumb}
                  alt={project.title}
                  fill
                  className={`object-cover transition-transform duration-700 ease-out ${
                    isHovered ? "scale-[1.04]" : "scale-100"
                  }`}
                  sizes="40vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center p-8">
                  <span className="text-center text-xs font-medium uppercase tracking-[0.2em] text-mist-subtle">
                    Image coming soon
                  </span>
                </div>
              )}

              <div
                className={`absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent transition-opacity duration-500 ${
                  isHovered ? "opacity-95" : "opacity-0"
                }`}
              />

              <div
                className={`absolute inset-x-0 bottom-0 p-6 transition-all duration-500 md:p-7 ${
                  isHovered ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                <p
                  className={`text-[0.68rem] font-medium uppercase tracking-[0.2em] ${
                    accent ? ACCENT_TEXT[accent] : "text-mist-subtle"
                  }`}
                >
                  {project.title}
                </p>
                <p className="mt-2 max-w-[22rem] text-sm leading-relaxed text-mist-muted">
                  {project.summary}
                </p>
              </div>

              {/* Minimal always-visible label, corner-anchored, fades out once the hover caption takes over */}
              <div
                className={`absolute left-5 top-5 transition-opacity duration-300 ${
                  isHovered ? "opacity-0" : "opacity-100"
                }`}
              >
                <span className="rounded-full bg-surface/70 px-3 py-1 text-xs font-medium tracking-tight text-mist backdrop-blur-sm">
                  {project.title}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Mobile / touch — stacked, caption always visible, tap goes straight to the project */}
      <div className="flex flex-col gap-8 md:hidden">
        {projects.map((project) => {
          const thumb = projectThumbnailSrc(project);
          const accent = project.accentColor;
          return (
            <Link key={project.slug} href={`/work/${project.slug}`} className="block">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface-raised">
                {thumb ? (
                  <Image src={thumb} alt={project.title} fill className="object-cover" sizes="100vw" />
                ) : (
                  <div className="flex h-full items-center justify-center p-8">
                    <span className="text-center text-xs font-medium uppercase tracking-[0.2em] text-mist-subtle">
                      Image coming soon
                    </span>
                  </div>
                )}
              </div>
              <div className="mt-3">
                <p
                  className={`text-xs font-medium uppercase tracking-[0.2em] ${
                    accent ? ACCENT_TEXT[accent] : "text-mist-subtle"
                  }`}
                >
                  {project.title}
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-mist-muted">{project.summary}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
}
