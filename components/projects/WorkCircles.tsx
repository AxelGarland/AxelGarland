"use client";

import { CardPreview } from "@/components/projects/CardPreview";
import { LoadingLoop } from "@/components/projects/LoadingLoop";
import { pictureSrc } from "@/lib/pictures";
import { projectThumbnailSrc, type Project } from "@/lib/projects";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { TagLine } from "@/components/projects/TagLine";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

/** How each project's picture sits inside its circle. `contain` shows a whole picture on a soft
 *  backdrop; `cover` fills the circle and crops the edges. */
const CROP: Record<string, { fit: "cover" | "contain"; position?: string; backdrop?: string; scale?: string; previewBg?: string }> = {
  kindred: { fit: "cover", position: "50% 50%", previewBg: "#06090A" },
  giuson: { fit: "cover", position: "50% 55%" },
  "mundos-mejores": { fit: "cover", position: "50% 42%" },
  "better-eater": { fit: "contain", backdrop: "bg-surface-raised", scale: "scale-[1.12]" },
  alutit: { fit: "cover", position: "50% 38%" },
  afterlife: { fit: "cover", position: "50% 50%", backdrop: "bg-black" },
  jabberwocky: { fit: "contain", backdrop: "bg-surface-raised", scale: "scale-[1.04]" },
};

/** Each row is driven by how far it has travelled through the screen: 0 as it enters at the bottom,
 *  1 as it leaves at the top. Scrolling down fades in the picture, then the title with its underline,
 *  then the description; scrolling back up undoes them in reverse. They hold while the row is
 *  mid-screen. */
const IN = { image: [0.04, 0.16], title: [0.2, 0.3], description: [0.28, 0.37] } as const;
const OUT = { description: [0.7, 0.76], title: [0.74, 0.8], image: [0.86, 0.95] } as const;

/** Rises from 0 to 1 across `inn`, holds at 1, then falls back to 0 across `out`. With reduced
 *  motion it is simply 1 the whole way, so everything shows finished and nothing moves. */
function useFade(p: MotionValue<number>, inn: readonly [number, number], out: readonly [number, number], reduce: boolean) {
  return useTransform(p, [inn[0], inn[1], out[0], out[1]], reduce ? [1, 1, 1, 1] : [0, 1, 1, 0]);
}

function useShift(p: MotionValue<number>, inn: readonly [number, number], out: readonly [number, number], from: number, to: number, reduce: boolean) {
  return useTransform(p, [inn[0], inn[1], out[0], out[1]], reduce ? [0, 0, 0, 0] : [from, 0, 0, to]);
}

function Row({ project, index, reduce }: { project: Project; index: number; reduce: boolean }) {
  const left = index % 2 === 0;
  const thumb = projectThumbnailSrc(project);
  const crop = CROP[project.slug] ?? { fit: "cover" as const };
  const ref = useRef<HTMLAnchorElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const image = useFade(p, IN.image, OUT.image, reduce);
  const titleOpacity = useFade(p, IN.title, OUT.title, reduce);
  const titleY = useShift(p, IN.title, OUT.title, 14, -10, reduce);
  const underline = useFade(p, IN.title, OUT.title, reduce);
  const descOpacity = useFade(p, IN.description, OUT.description, reduce);
  const descY = useShift(p, IN.description, OUT.description, 10, -8, reduce);

  return (
    <Link
      ref={ref}
      href={`/work/${project.slug}`}
      className={`group flex flex-col gap-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent md:items-center md:gap-14 lg:gap-24 ${
        left ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className={`relative aspect-square w-[66%] shrink-0 md:w-[min(39vw,30.6rem)] ${left ? "self-start" : "self-end"}`}>
        <motion.div
          style={{ opacity: image }}
          className={`absolute inset-0 overflow-hidden rounded-full ${crop.backdrop ?? "bg-surface-raised"}`}
        >
          {project.circleLoop ? (
            <LoadingLoop frames={project.circleLoop} still={project.circleLoopStill} fill />
          ) : thumb ? (
            <Image
              src={thumb}
              alt={project.title}
              fill
              className={`transition-transform duration-[900ms] ease-out group-hover:scale-[1.04] ${
                crop.fit === "cover" ? "object-cover" : `object-contain ${crop.scale ?? ""}`
              } ${project.thumbnailBlend ? "mix-blend-multiply" : ""}`}
              style={crop.position ? { objectPosition: crop.position } : undefined}
              sizes="(max-width: 768px) 66vw, 31rem"
            />
          ) : null}
          {project.previewVideo ? <CardPreview src={project.previewVideo} background={crop.previewBg} /> : null}
          {project.clientLogo ? (
            <div className="absolute bottom-[17%] left-[17%] flex h-11 w-11 items-center justify-center rounded-md bg-surface/95 p-1.5 shadow-sm sm:h-12 sm:w-12">
              <Image
                src={pictureSrc(project.clientLogo)}
                alt={`${project.title}: real client work`}
                width={80}
                height={80}
                className="h-full w-full object-contain"
              />
            </div>
          ) : null}
        </motion.div>
      </div>

      <div className={`min-w-0 flex-1 ${left ? "self-start text-left md:self-center" : "self-end text-left md:self-center md:text-right"}`}>
        <div className={`mb-3 flex items-center gap-5 ${left ? "" : "md:flex-row-reverse"}`}>
          <motion.h3
            style={{ opacity: titleOpacity, y: titleY }}
            className="font-display text-[clamp(1.76rem,3.9vw,3.31rem)] font-light leading-[1.02] tracking-tight text-ink"
          >
            <span className="relative inline-block pb-2">
              {project.title}
              <motion.span
                aria-hidden
                style={{ scaleX: underline }}
                className="absolute bottom-0 left-0 h-px w-full origin-left bg-accent"
              />
            </span>
          </motion.h3>
          {/* The mark that says "open this project". The whole row is the link; this is its visible cue. */}
          <motion.span aria-hidden style={{ opacity: titleOpacity, y: titleY }} className="shrink-0">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent text-white transition-transform duration-300 group-hover:scale-110 sm:h-12 sm:w-12">
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                className="transition-transform duration-300 group-hover:translate-x-0.5"
              >
                <path d="M4 10h11M10.5 5l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </motion.span>
        </div>
        <motion.div style={{ opacity: descOpacity, y: descY }}>
          <p className={`max-w-[38ch] text-base leading-relaxed text-ink-muted ${left ? "" : "md:ml-auto"}`}>
            {project.summary}
          </p>
          {project.tags ? <TagLine tags={project.tags} className="mt-5" /> : null}
        </motion.div>
      </div>
    </Link>
  );
}

export function WorkCircles({ projects }: { projects: Project[] }) {
  // The reduced-motion preference is only known after hydration, so rows are rebuilt (keyed) once it is.
  const reduce = Boolean(useReducedMotion());
  return (
    <div className="flex flex-col gap-20 md:gap-28">
      {projects.map((project, i) => (
        <Row key={`${project.slug}-${reduce}`} project={project} index={i} reduce={reduce} />
      ))}
    </div>
  );
}
