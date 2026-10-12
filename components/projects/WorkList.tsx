import { projectThumbnailSrc, type Project } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

/** The whole body of work as an index: one row per project, with a small preview that grows on
 *  hover. Quieter than the home page grid, and fast to scan. */
export function WorkList({ projects }: { projects: Project[] }) {
  return (
    <ul className="border-t border-line">
      {projects.map((project, i) => {
        const thumb = projectThumbnailSrc(project);
        return (
          <li key={project.slug} className="border-b border-line">
            <Link
              href={`/work/${project.slug}`}
              className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-1 py-6 transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-accent sm:grid-cols-[3.5rem_1.1fr_1fr_auto] sm:gap-x-8 sm:py-8"
            >
              <span className="text-sm tabular-nums text-ink-subtle">{String(i + 1).padStart(2, "0")}</span>
              <span className="font-display text-3xl font-medium leading-tight tracking-tight text-ink transition-transform duration-500 ease-out group-hover:translate-x-1 sm:text-4xl md:text-5xl">
                {project.title}
              </span>
              <span className="col-start-2 text-sm text-ink-muted sm:col-start-auto">
                {project.discipline}
                <span className="mt-1 hidden max-w-[48ch] text-[0.9rem] leading-relaxed text-ink-subtle lg:line-clamp-2 lg:block">
                  {project.summary}
                </span>
              </span>
              <span className="row-span-2 flex w-24 justify-end sm:row-span-1 sm:w-48">
                <span className="relative h-16 w-24 overflow-hidden bg-surface-raised transition-all duration-500 ease-out sm:h-20 sm:w-32 sm:group-hover:w-48">
                  {thumb ? (
                    <Image
                      src={thumb}
                      alt=""
                      fill
                      className={`object-cover ${project.thumbnailBlend ? "mix-blend-multiply" : ""}`}
                      sizes="192px"
                    />
                  ) : null}
                </span>
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
