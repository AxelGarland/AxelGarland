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
  "the-burial": "Sculpture",
};

function IllustrationItem({ project }: { project: Project }) {
  const thumb = projectThumbnailSrc(project);

  return (
    <Link
      href={`/work/${project.slug}`}
      className="group relative block aspect-[3/4] w-full overflow-hidden bg-surface"
    >
      {thumb ? (
        <Image
          src={thumb}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 90vw, 45vw"
        />
      ) : (
        <div className="flex h-full items-center justify-center p-6">
          <span className="text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-subtle">
            Image coming soon
          </span>
        </div>
      )}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent p-4 sm:p-5">
        <span className="block font-display text-base font-semibold text-surface sm:text-lg">
          {project.title}
        </span>
        <span className="block text-xs uppercase tracking-[0.08em] text-surface/70">
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
      {/* Title — sits in normal flow above the grid, not over the images, sized to match
          the "Selected Work" section's heading exactly. */}
      <div className="mx-auto mb-10 max-w-content px-6 sm:px-10 md:mb-14 md:px-14 lg:px-16">
        <p className="font-display text-3xl font-semibold leading-[1.1] text-accent sm:text-4xl">
          Illustration
        </p>
      </div>

      {/* Two offset columns — the right one starts lower, so no two pieces share a row —
          each parallaxing at its own rate while the section scrolls through view. */}
      <div
        ref={ref}
        className="mx-auto max-w-content px-6 pb-20 sm:px-10 md:px-14 md:pb-32 lg:px-16"
      >
        <div className="grid grid-cols-2 gap-5 sm:gap-8 md:gap-10">
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
