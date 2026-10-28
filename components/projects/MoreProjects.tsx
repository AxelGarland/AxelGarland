import { DriftingStrip } from "@/components/projects/DriftingStrip";
import { HalftoneText } from "@/components/projects/HalftoneText";
import { LoadingLoop } from "@/components/projects/LoadingLoop";
import { StripViewport } from "@/components/projects/StripViewport";
import { CROP } from "@/lib/workCrops";
import { getOrderedProjects, projectThumbnailSrc } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

/** The strip of project circles at the bottom of every case study: the other projects, starting with
 *  the one after this, on black, drifting slowly from right to left, easing down to a crawl under the pointer, with a red dot above the circle being pointed at.
 *  The list is laid out twice, back to back, and the strip slides by exactly one copy, so it never
 *  ends. Only the first copy is reachable by keyboard and screen readers. On a touch screen it is a
 *  row you swipe, which also keeps drifting by itself (see StripViewport). With reduced motion it
 *  holds still and scrolls by hand instead. Each item is as wide as its name when that is wider than
 *  its circle, so long names (Mundos Mejores) never run into their neighbours. */
export function MoreProjects({ current }: { current: string }) {
  const all = getOrderedProjects();
  const at = all.findIndex((p) => p.slug === current);
  const others = at < 0 ? all : [...all.slice(at + 1), ...all.slice(0, at)];
  // Each copy holds the list twice so a copy is always wider than the screen.
  const half = [...others, ...others];

  return (
    <StripViewport
      label="More projects"
      className="overflow-hidden bg-black py-16 motion-reduce:overflow-x-auto md:py-24 [@media(pointer:coarse)]:overflow-x-auto [@media(pointer:coarse)]:overscroll-x-contain [@media(pointer:coarse)]:[scrollbar-width:none] [@media(pointer:coarse)]:[&::-webkit-scrollbar]:hidden"
    >
      <DriftingStrip className="flex w-max animate-marquee motion-reduce:animate-none [@media(pointer:coarse)]:animate-none">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-10 pr-10 md:gap-14 md:pr-14">
            {half.map((project, i) => {
              const crop = CROP[project.slug] ?? { fit: "cover" as const };
              const thumb = projectThumbnailSrc(project);
              const first = copy === 0 && i < others.length;
              return (
                <Link
                  key={`${project.slug}-${i}`}
                  href={`/work/${project.slug}`}
                  aria-hidden={first ? undefined : true}
                  tabIndex={first ? undefined : -1}
                  className="group flex shrink-0 flex-col items-center"
                >
                  <div className="relative aspect-square w-[10.5rem] sm:w-[12.5rem] lg:w-[14rem]">
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
                    <span
                      aria-hidden
                      className="pointer-events-none absolute bottom-full left-1/2 mb-4 h-3.5 w-3.5 -translate-x-1/2 scale-0 rounded-full bg-accent transition-transform duration-300 group-hover:scale-100"
                    />
                  </div>
                  <span className="mt-5">
                    <HalftoneText text={project.title} />
                  </span>
                </Link>
              );
            })}
          </div>
        ))}
      </DriftingStrip>
    </StripViewport>
  );
}
