import type { Project } from "@/lib/projects";
import { projectThumbnailSrc } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

/** Real medium per piece, not a generic category — matches the reference's per-item "type" label. */
const MEDIUM: Record<string, string> = {
  "mundos-mejores": "Sculpture",
  jabberwocky: "Illustrated Book",
  "akko-fringe-festival": "Branding",
  facettes: "Generative",
  "the-burial": "Sculpture",
};

/** Slow ambient drift cycled per item — the same drift/driftVertical keyframes the hero's
 *  background blobs use, so the background field feels like it belongs to the same site
 *  language rather than introducing new motion. */
const DRIFT = ["animate-drift-slow", "animate-drift-medium", "animate-drift-vertical"] as const;

/** Explicit grid placement per item, on a 4-column/3-row grid — two on top, one centered in
 *  the middle row, two on the bottom, each spanning 2 of the 4 columns. */
const PLACEMENT = [
  "col-start-1 row-start-1",
  "col-start-3 row-start-1",
  "col-start-2 row-start-2",
  "col-start-1 row-start-3",
  "col-start-3 row-start-3",
] as const;

function IllustrationItem({ project, index }: { project: Project; index: number }) {
  const thumb = projectThumbnailSrc(project);
  const drift = DRIFT[index % DRIFT.length];
  const placement = PLACEMENT[index % PLACEMENT.length];

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative col-span-2 overflow-hidden bg-surface will-change-transform ${drift} ${placement}`}
    >
      {thumb ? (
        <Image
          src={thumb}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="50vw"
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
  return (
    <div>
      {/* Title — sits in normal flow above the grid, not over the images, sized to match
          the "Selected Work" section's heading exactly. */}
      <div className="mx-auto mb-10 max-w-content px-6 sm:px-10 md:mb-14 md:px-14 lg:px-16">
        <p className="font-display text-3xl font-semibold leading-[1.1] text-accent sm:text-4xl">
          Illustration
        </p>
      </div>

      {/* Background field — a 2/1/2 diamond: two on top, one centered in the middle, two on
          the bottom — big, clearly separated tiles, each drifting slowly and independently */}
      <div className="relative h-[860px] overflow-hidden sm:h-[1000px] md:h-[1300px] lg:h-[1500px]">
        <div className="grid h-full grid-cols-4 grid-rows-3 gap-4 p-4 sm:gap-8 sm:p-8 md:gap-10 md:p-12 lg:gap-14 lg:p-16">
          {projects.map((project, i) => (
            <IllustrationItem key={project.slug} project={project} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
