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

function IllustrationItem({
  project,
  index,
  wide,
}: {
  project: Project;
  index: number;
  wide?: boolean;
}) {
  const thumb = projectThumbnailSrc(project);
  const drift = DRIFT[index % DRIFT.length];

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative overflow-hidden bg-surface will-change-transform ${drift} ${
        wide ? "sm:col-span-2" : ""
      }`}
    >
      {thumb ? (
        <Image
          src={thumb}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
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
  const [first, second, third, fourth, fifth] = projects;

  return (
    <div className="relative h-[760px] overflow-hidden sm:h-[860px] md:h-[960px] lg:h-[1040px]">
      {/* Background field — bigger boxes than before, each drifting slowly and independently */}
      <div className="grid h-full grid-cols-2 gap-3 p-3 sm:grid-cols-3 sm:gap-4 sm:p-4 md:gap-5 md:p-6">
        {first ? <IllustrationItem project={first} index={0} /> : null}
        {second ? <IllustrationItem project={second} index={1} /> : null}
        {third ? <IllustrationItem project={third} index={2} /> : null}
        {fourth ? <IllustrationItem project={fourth} index={3} /> : null}
        {fifth ? <IllustrationItem project={fifth} index={4} wide /> : null}
      </div>

      {/* Centered text banner, overlaid on top of the background field */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center p-6">
        <div className="pointer-events-auto w-full max-w-xl border border-line bg-surface px-8 py-10 text-center sm:px-12 sm:py-14">
          <p className="mb-3 text-sm uppercase tracking-[0.12em] text-accent">Illustration</p>
          <h2 className="mb-5 font-display text-3xl font-semibold leading-[1.1] text-ink sm:text-4xl">
            Images that
            <br />
            <em className="italic text-accent">hold their ground</em>
          </h2>
          <p className="mx-auto mb-8 max-w-[36ch] text-base leading-relaxed text-ink-muted">
            Drawn from a practice rooted in bold color and confident silhouette — book
            illustration, fictional branding, sculpture, and generative work, always carried
            through as one full visual world rather than a single image.
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
      </div>
    </div>
  );
}
