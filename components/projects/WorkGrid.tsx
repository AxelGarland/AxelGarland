import type { Project } from "@/lib/projects";
import { projectThumbnailSrc, SECTION_LABELS } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

/** Asymmetric spans + aspect ratios cycled per card index — an editorial rhythm instead of a
 *  uniform grid, following the same alternating-width pattern as the reference layout. */
const LAYOUT = [
  { span: "md:col-span-8", aspect: "aspect-[16/9]" },
  { span: "md:col-span-4", aspect: "aspect-[4/3]" },
  { span: "md:col-span-12", aspect: "aspect-[16/9]" },
  { span: "md:col-span-6", aspect: "aspect-[4/3]" },
] as const;

function WorkCard({ project, layout }: { project: Project; layout: (typeof LAYOUT)[number] }) {
  const thumb = projectThumbnailSrc(project);
  const contain = project.thumbnailFit === "contain";

  return (
    <Link
      href={`/work/${project.slug}`}
      className={`group relative overflow-hidden bg-surface-raised ${layout.span}`}
    >
      <div aria-hidden className="absolute right-5 top-5 z-10 flex h-9 w-9 -translate-y-1 items-center justify-center bg-surface opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M2 7h10M8 3l4 4-4 4"
            stroke="currentColor"
            className="text-ink"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className={`relative w-full overflow-hidden ${layout.aspect}`}>
        {thumb ? (
          <Image
            src={thumb}
            alt={project.title}
            fill
            className={`transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
              contain ? "object-contain p-6" : "object-cover"
            }`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center p-8">
            <span className="text-xs font-medium uppercase tracking-[0.2em] text-ink-subtle">
              Image coming soon
            </span>
          </div>
        )}
      </div>

      <div className="border-t border-line p-6">
        <p className="mb-2 text-xs uppercase tracking-[0.1em] text-ink-subtle">
          {SECTION_LABELS[project.section]}
        </p>
        <h3 className="mb-1.5 font-display text-xl font-semibold leading-tight text-ink">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-ink-muted">{project.summary}</p>
      </div>
    </Link>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
      {projects.map((project, i) => (
        <WorkCard key={project.slug} project={project} layout={LAYOUT[i % LAYOUT.length]} />
      ))}
    </div>
  );
}
