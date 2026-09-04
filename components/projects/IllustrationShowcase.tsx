import type { Project } from "@/lib/projects";
import { projectThumbnailSrc } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

/** Cycled per item index — mirrors the reference's 5-up masonry rhythm (square, portrait, portrait,
 *  square, then one wide item spanning both columns). */
const ASPECTS = ["aspect-square", "aspect-[3/4]", "aspect-[3/4]", "aspect-square", "aspect-[16/9]"] as const;

/** Real medium per piece, not a generic category — matches the reference's per-item "type" label. */
const MEDIUM: Record<string, string> = {
  "mundos-mejores": "Sculpture",
  jabberwocky: "Illustrated Book",
  "akko-fringe-festival": "Branding",
  facettes: "Generative",
  "the-burial": "Sculpture",
};

function IllustrationItem({ project, index }: { project: Project; index: number }) {
  const thumb = projectThumbnailSrc(project);
  const aspect = ASPECTS[index % ASPECTS.length];
  const spanFull = index === 4;

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative overflow-hidden bg-surface ${spanFull ? "sm:col-span-2" : ""}`}
    >
      <div className={`relative w-full overflow-hidden ${aspect}`}>
        {thumb ? (
          <Image
            src={thumb}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-6">
            <span className="text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-subtle">
              Image coming soon
            </span>
          </div>
        )}
      </div>
      <div className="flex items-baseline justify-between gap-2 pt-3">
        <span className="font-display text-lg font-semibold text-ink">{project.title}</span>
        <span className="whitespace-nowrap text-xs uppercase tracking-[0.08em] text-ink-subtle">
          {MEDIUM[project.slug] ?? "Illustration"}
        </span>
      </div>
    </Link>
  );
}

export function IllustrationShowcase({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 items-start gap-12 md:grid-cols-[1fr_2fr] md:gap-16 lg:gap-28">
      <div className="md:sticky md:top-[calc(68px+2rem)]">
        <p className="mb-3 text-sm uppercase tracking-[0.12em] text-accent">Illustration</p>
        <h2 className="mb-5 font-display text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl">
          Images that
          <br />
          <em className="italic text-accent">hold their ground</em>
        </h2>
        <p className="mb-8 max-w-[36ch] text-base leading-relaxed text-ink-muted">
          Drawn from a practice rooted in bold color and confident silhouette — book illustration,
          fictional branding, sculpture, and generative work, always carried through as one full
          visual world rather than a single image.
        </p>
        <Link
          href="/contact"
          className="inline-flex min-h-[44px] items-center gap-2.5 bg-pencil px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-colors duration-300 hover:bg-ink hover:text-pencil"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path
              d="M2 7h10M8 3l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Get in Touch
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {projects.map((project, i) => (
          <IllustrationItem key={project.slug} project={project} index={i} />
        ))}
      </div>
    </div>
  );
}
