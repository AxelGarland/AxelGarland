"use client";

import type { Project } from "@/lib/projects";
import { projectThumbnailSrc } from "@/lib/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

/** Real medium per piece, not a generic category — matches the reference's per-item "type" label. */
const MEDIUM: Record<string, string> = {
  "mundos-mejores": "Sculpture",
  jabberwocky: "Illustrated Book",
  "akko-fringe-festival": "Branding",
  facettes: "Generative",
  afterlife: "Web & Illustration",
};

function IllustrationItem({ project }: { project: Project }) {
  const thumb = projectThumbnailSrc(project);

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block aspect-[3/4] w-full overflow-hidden bg-surface"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 z-0 bg-accent opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
      />
      {thumb ? (
        <Image
          src={thumb}
          alt={project.title}
          fill
          className="relative z-10 object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 640px) 90vw, 45vw"
        />
      ) : (
        <div className="relative z-10 flex h-full items-center justify-center p-6">
          <span className="text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-subtle">
            Image coming soon
          </span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 z-20 flex items-baseline justify-between gap-3 bg-ink/85 px-4 py-3 backdrop-blur-sm transition-colors duration-300 group-hover:bg-ink sm:px-5 sm:py-4">
        <span className="font-display text-base font-semibold text-surface sm:text-lg">
          {project.title}
        </span>
        <span className="whitespace-nowrap text-xs uppercase tracking-[0.08em] text-surface/60">
          {MEDIUM[project.slug] ?? "Illustration"}
        </span>
      </div>
    </Link>
  );
}

export function IllustrationShowcase({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  // Two columns drift at different rates and starting offsets as the section scrolls through
  // the viewport — a real scroll-linked parallax, not just an ambient animation.
  const yLeft = useTransform(scrollYProgress, [0, 1], [40, -60]);
  const yRight = useTransform(scrollYProgress, [0, 1], [-40, 80]);

  const left = projects.filter((_, i) => i % 2 === 0);
  const right = projects.filter((_, i) => i % 2 === 1);

  return (
    <div>
      {/* Title — sits in normal flow above the grid, not over the images. Two-tier header
          matching the "Selected Work" section: small eyebrow + big heading + a line of context. */}
      <div className="mx-auto mb-10 max-w-content px-6 sm:px-10 md:mb-14 md:px-14 lg:px-16">
        <div className="mx-auto max-w-[60rem]">
          <p className="mb-3 text-sm uppercase tracking-[0.12em] text-accent">Other Work</p>
          <h2 className="max-w-[24ch] font-display text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl">
            Illustration, <em className="italic text-accent">telling stories through different media</em>
          </h2>
          <p className="mt-4 max-w-[52ch] text-base leading-relaxed text-ink-muted">
            Book illustration, illustrated branding, sculpture, and generative work: different
            jobs carried by the same practice, bold color, confident silhouette.
          </p>
        </div>
      </div>

      {/* Two offset columns — the right one starts lower, so no two pieces share a row —
          each parallaxing at its own rate while the section scrolls through view. */}
      <div
        ref={ref}
        className="relative mx-auto max-w-content px-6 pb-20 sm:px-10 md:px-14 md:pb-32 lg:px-16"
      >
        <div className="mx-auto grid max-w-[60rem] grid-cols-2 gap-5 sm:gap-8 md:gap-10">
          <motion.div style={{ y: yLeft }} className="flex flex-col gap-5 sm:gap-8 md:gap-10">
            {left.map((project) => (
              <IllustrationItem key={project.slug} project={project} />
            ))}
          </motion.div>
          <motion.div
            style={{ y: yRight }}
            className="mt-16 flex flex-col gap-5 sm:mt-24 sm:gap-8 md:mt-28 md:gap-10"
          >
            {right.map((project) => (
              <IllustrationItem key={project.slug} project={project} />
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
