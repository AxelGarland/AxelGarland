"use client";

import { HalftoneArrowDot } from "@/components/projects/HalftoneArrowDot";
import { LoadingLoop } from "@/components/projects/LoadingLoop";
import { CROP } from "@/lib/workCrops";
import { getOrderedProjects, projectThumbnailSrc } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

/** The row of project circles at the bottom of every case study: the other projects, starting with
 *  the one after this, in a strip that scrolls sideways (swipe, trackpad, or the arrows). */
export function MoreProjects({ current }: { current: string }) {
  const track = useRef<HTMLDivElement>(null);
  const all = getOrderedProjects();
  const at = all.findIndex((p) => p.slug === current);
  const others = at < 0 ? all : [...all.slice(at + 1), ...all.slice(0, at)];

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.8, behavior: "smooth" });
  };

  return (
    <section aria-label="More projects" className="border-t border-line bg-paper py-16 md:py-24">
      <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <div
          ref={track}
          className="-mx-6 flex snap-x snap-mandatory scroll-pl-6 gap-8 overflow-x-auto px-6 pb-2 sm:scroll-pl-10 md:scroll-pl-14 lg:scroll-pl-16 [scrollbar-width:none] sm:-mx-10 sm:px-10 md:-mx-14 md:gap-10 md:px-14 lg:-mx-16 lg:px-16 [&::-webkit-scrollbar]:hidden"
        >
          {others.map((project) => {
            const crop = CROP[project.slug] ?? { fit: "cover" as const };
            const thumb = projectThumbnailSrc(project);
            return (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group w-[10.5rem] shrink-0 snap-start focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-[12.5rem] lg:w-[14rem]"
              >
                <div className="relative aspect-square w-full">
                  <div className={`absolute inset-0 overflow-hidden rounded-full ${crop.backdrop ?? "bg-surface-raised"}`}>
                    {project.circleLoop ? (
                      <LoadingLoop frames={project.circleLoop} still={project.circleLoopStill} fill />
                    ) : thumb ? (
                      <Image
                        src={thumb}
                        alt=""
                        fill
                        className={`transition-transform duration-[900ms] ease-out group-hover:scale-[1.05] ${
                          crop.fit === "cover" ? "object-cover" : `object-contain ${crop.scale ?? ""}`
                        } ${project.thumbnailBlend ? "mix-blend-multiply" : ""}`}
                        style={crop.position ? { objectPosition: crop.position } : undefined}
                        sizes="(max-width: 640px) 168px, 224px"
                      />
                    ) : null}
                  </div>
                </div>
                <p className="mt-4 font-display text-lg font-semibold leading-tight text-ink transition-colors duration-300 group-hover:text-accent">
                  {project.title}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="mt-8 hidden justify-end gap-3 md:flex">
          <button type="button" onClick={() => scroll(-1)} aria-label="Scroll to earlier projects" className="h-12 w-12 rounded-full transition-transform duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            <HalftoneArrowDot tone="ink" flip className="h-full w-full" />
          </button>
          <button type="button" onClick={() => scroll(1)} aria-label="Scroll to more projects" className="h-12 w-12 rounded-full transition-transform duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
            <HalftoneArrowDot tone="ink" className="h-full w-full" />
          </button>
        </div>
      </div>
    </section>
  );
}
