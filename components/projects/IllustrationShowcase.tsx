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

function IllustrationItem({ project, index }: { project: Project; index: number }) {
  const thumb = projectThumbnailSrc(project);
  const drift = DRIFT[index % DRIFT.length];

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative overflow-hidden bg-surface will-change-transform ${drift}`}
    >
      {thumb ? (
        <Image
          src={thumb}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 33vw"
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
    <div className="relative h-[820px] overflow-hidden sm:h-[760px] md:h-[940px] lg:h-[1080px]">
      {/* Title, plain — no box, no background, just the label sitting over the imagery.
          Sized and colored to match the "Selected Work" eyebrow treatment, scaled up. */}
      <p className="absolute left-6 top-6 z-10 font-display text-3xl font-semibold uppercase tracking-[0.06em] text-accent drop-shadow-[0_1px_16px_rgba(245,243,239,0.95)] sm:left-10 sm:top-10 sm:text-4xl md:left-14 md:top-12 md:text-5xl">
        Illustration
      </p>

      {/* Background field — big, clearly separated tiles, each drifting slowly and independently */}
      <div className="grid h-full grid-cols-2 gap-4 p-4 sm:gap-8 sm:p-8 md:grid-cols-3 md:gap-10 md:p-12 lg:gap-14 lg:p-16">
        {projects.map((project, i) => (
          <IllustrationItem key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
