"use client";

import { ProjectCard } from "@/components/projects/ProjectCard";
import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import type { Project } from "@/lib/projects";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/** Varied thumbnail aspect ratios, cycled per card — gives the grid a real masonry rhythm
 *  instead of a uniform block grid. */
const ASPECTS = ["aspect-[4/3]", "aspect-[3/4]", "aspect-square", "aspect-[4/5]"] as const;

function ParallaxColumn({
  projects,
  aspectStart,
  speed,
}: {
  projects: Project[];
  aspectStart: number;
  speed: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useHydrationSafeReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [speed * -32, speed * 32]);

  return (
    <div ref={ref} className="flex-1">
      <motion.div className="flex flex-col gap-6 lg:gap-8" style={reduce ? undefined : { y }}>
        {projects.map((project, i) => (
          <ProjectCard
            key={project.slug}
            project={project}
            // UI-screenshot thumbnails (thumbnailFit: "contain") keep a fixed landscape aspect —
            // the masonry portrait ratios would crop nav bars and labels out of the frame.
            imageAspectClassName={
              project.thumbnailFit === "contain"
                ? "aspect-[4/3]"
                : ASPECTS[(aspectStart + i) % ASPECTS.length]
            }
          />
        ))}
      </motion.div>
    </div>
  );
}

/** Splits projects into columns with independent, gentle scroll parallax — the "cards drift
 *  past each other" effect, kept subtle rather than dramatic. */
export function MasonryProjectGrid({ projects }: { projects: Project[] }) {
  const columnCount = projects.length >= 3 ? 2 : Math.max(projects.length, 1);
  const columns: Project[][] = Array.from({ length: columnCount }, () => []);
  projects.forEach((p, i) => columns[i % columnCount]!.push(p));

  const speeds = [1, -1, 0.6];

  return (
    <div className="flex flex-col gap-6 sm:flex-row lg:gap-8">
      {columns.map((columnProjects, colIndex) => (
        <ParallaxColumn
          key={colIndex}
          projects={columnProjects}
          aspectStart={colIndex}
          speed={speeds[colIndex % speeds.length]!}
        />
      ))}
    </div>
  );
}
