"use client";

import { HalftoneArrowDot } from "@/components/projects/HalftoneArrowDot";
import { LoadingLoop } from "@/components/projects/LoadingLoop";
import { CROP } from "@/lib/workCrops";
import { getOrderedProjects, projectThumbnailSrc } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";

/** The strip is drawn five times over, back to back, and kept parked in the middle copy: whenever it
 *  drifts toward either end it is moved by exactly one copy, which looks identical, so it never runs
 *  out. Going left from the first project reaches the last, and going right from the last wraps to
 *  the first. Only the middle copy is reachable by keyboard and screen readers. */
const COPIES = 5;
const MIDDLE = 2;

/** The row of project circles at the bottom of every case study: the other projects, starting with
 *  the one after this, in a strip that loops sideways (swipe, trackpad, or the arrows). */
export function MoreProjects({ current }: { current: string }) {
  const track = useRef<HTMLDivElement>(null);
  const settle = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const all = getOrderedProjects();
  const at = all.findIndex((p) => p.slug === current);
  const others = at < 0 ? all : [...all.slice(at + 1), ...all.slice(0, at)];
  const n = others.length;

  /** The width of one copy of the strip. */
  const copyWidth = () => {
    const kids = track.current?.children;
    if (!kids || kids.length < n * 2) return 0;
    return (kids[n] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft;
  };

  /** Moves the strip by whole copies until it sits inside the middle one. Invisible, since every copy is the same. */
  const recenter = () => {
    const el = track.current;
    const w = copyWidth();
    if (!el || !w) return;
    let x = el.scrollLeft;
    while (x < (MIDDLE - 0.5) * w) x += w;
    while (x >= (MIDDLE + 0.5) * w) x -= w;
    if (x !== el.scrollLeft) el.scrollLeft = x;
  };

  useEffect(() => {
    const w = copyWidth();
    if (track.current && w) track.current.scrollLeft = MIDDLE * w;
    return () => clearTimeout(settle.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [n]);

  const onScroll = () => {
    clearTimeout(settle.current);
    settle.current = setTimeout(recenter, 160);
  };

  const scroll = (dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    recenter();
    const kids = el.children;
    const step = (kids[1] as HTMLElement).offsetLeft - (kids[0] as HTMLElement).offsetLeft;
    const count = Math.max(1, Math.floor((el.clientWidth * 0.8) / step));
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * count * step, behavior: calm ? "auto" : "smooth" });
  };

  const arrow =
    "hidden h-12 w-12 shrink-0 rounded-full transition-transform duration-300 hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:block md:mt-[4.75rem] lg:mt-[5.5rem]";

  return (
    <section aria-label="More projects" className="border-t border-line bg-paper py-16 md:py-24">
      <div className="mx-auto flex max-w-content items-start gap-4 px-6 sm:px-10 md:gap-6 md:px-14 lg:px-16">
        <button type="button" onClick={() => scroll(-1)} aria-label="Scroll to earlier projects" className={arrow}>
          <HalftoneArrowDot tone="ink" flip className="h-full w-full" />
        </button>
        <div
          ref={track}
          onScroll={onScroll}
          className="-mx-6 flex min-w-0 flex-1 snap-x snap-mandatory scroll-pl-6 gap-8 sm:scroll-pl-10 md:scroll-pl-0 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:-mx-10 sm:px-10 md:mx-0 md:gap-10 md:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {Array.from({ length: COPIES }, (_, copy) => others.map((project) => ({ project, copy }))).flat().map(({ project, copy }) => {
            const live = copy === MIDDLE;
            const crop = CROP[project.slug] ?? { fit: "cover" as const };
            const thumb = projectThumbnailSrc(project);
            return (
              <Link
                key={`${copy}-${project.slug}`}
                aria-hidden={live ? undefined : true}
                tabIndex={live ? undefined : -1}
                href={`/work/${project.slug}`}
                className="group w-[10.5rem] shrink-0 snap-start text-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:w-[12.5rem] lg:w-[14rem]"
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
        <button type="button" onClick={() => scroll(1)} aria-label="Scroll to more projects" className={arrow}>
          <HalftoneArrowDot tone="ink" className="h-full w-full" />
        </button>
      </div>
    </section>
  );
}
