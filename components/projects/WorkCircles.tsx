"use client";

import { CardPreview } from "@/components/projects/CardPreview";
import { pictureSrc } from "@/lib/pictures";
import { projectThumbnailSrc, type Project } from "@/lib/projects";
import { motion, useInView, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

/** How each project's picture sits inside its circle. `contain` shows a whole picture on a soft
 *  backdrop; `cover` fills the circle and crops the edges. */
const CROP: Record<string, { fit: "cover" | "contain"; position?: string; backdrop?: string; scale?: string }> = {
  kindred: { fit: "cover", position: "50% 50%" },
  giuson: { fit: "cover", position: "50% 55%" },
  "mundos-mejores": { fit: "cover", position: "50% 42%" },
  "better-eater": { fit: "contain", backdrop: "bg-surface-raised", scale: "scale-[1.12]" },
  alutit: { fit: "cover", position: "50% 38%" },
  afterlife: { fit: "cover", position: "50% 50%", backdrop: "bg-black" },
  jabberwocky: { fit: "contain", backdrop: "bg-surface-raised", scale: "scale-[1.04]" },
};

const EASE = [0.22, 1, 0.36, 1] as const;
/** Seconds the ring takes to close. The underline and the words start the moment it finishes. */
const RING = 1.3;

function Row({ project, index }: { project: Project; index: number }) {
  const left = index % 2 === 0;
  const thumb = projectThumbnailSrc(project);
  const crop = CROP[project.slug] ?? { fit: "cover" as const };
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const seen = useInView(ref, { once: true, amount: 0.45 });
  // With reduced motion, everything is simply shown finished.
  const go = reduce || seen;
  const t = (delay: number, duration: number) => ({ duration: reduce ? 0 : duration, delay: reduce ? 0 : delay, ease: EASE });

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
          initial={{ opacity: 0 }}
          animate={{ opacity: go ? 1 : 0 }}
          transition={t(0, 0.7)}
          className={`absolute inset-0 overflow-hidden rounded-full ${crop.backdrop ?? "bg-surface-raised"}`}
        >
          {thumb ? (
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
          {project.previewVideo ? <CardPreview src={project.previewVideo} /> : null}
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

        {/* A fine red ring, just outside the picture, that draws itself clockwise from the top. */}
        <svg
          aria-hidden
          viewBox="0 0 100 100"
          className="pointer-events-none absolute -inset-[3%] h-[106%] w-[106%] overflow-visible"
        >
          <motion.circle
            cx={50}
            cy={50}
            r={49.6}
            fill="none"
            stroke="#D64040"
            strokeWidth={0.4}
            strokeLinecap="round"
            transform="rotate(-90 50 50)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: go ? 1 : 0 }}
            transition={t(0.15, RING)}
          />
        </svg>
      </div>

      <div className={`min-w-0 flex-1 ${left ? "self-start text-left md:self-center" : "self-end text-left md:self-center md:text-right"}`}>
        <motion.h3
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: go ? 1 : 0, y: go ? 0 : 14 }}
          transition={t(RING + 0.1, 0.6)}
          className="mb-3 font-display text-[clamp(2.25rem,5vw,4.25rem)] font-light leading-[1.02] tracking-tight text-ink"
        >
          <span className="relative inline-block pb-2">
            {project.title}
            <motion.span
              aria-hidden
              initial={{ scaleX: 0 }}
              animate={{ scaleX: go ? 1 : 0 }}
              transition={t(RING + 0.1, 0.6)}
              className="absolute bottom-0 left-0 h-px w-full origin-left bg-accent"
            />
          </span>
        </motion.h3>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: go ? 1 : 0, y: go ? 0 : 10 }}
          transition={t(RING + 0.5, 0.7)}
        >
          {project.discipline ? <p className="mb-4 text-sm text-ink-muted">{project.discipline}</p> : null}
          <p className={`max-w-[38ch] text-base leading-relaxed text-ink-muted ${left ? "" : "md:ml-auto"}`}>
            {project.summary}
          </p>
        </motion.div>
      </div>
    </Link>
  );
}

export function WorkCircles({ projects }: { projects: Project[] }) {
  return (
    <div className="flex flex-col gap-20 md:gap-28">
      {projects.map((project, i) => (
        <Row key={project.slug} project={project} index={i} />
      ))}
    </div>
  );
}
