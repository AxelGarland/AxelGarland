import { LoadingLoop } from "@/components/projects/LoadingLoop";
import { CROP } from "@/lib/workCrops";
import { projectThumbnailSrc, type Project } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

/** The projects that follow the featured case studies on the home page: smaller, in a grid, each a
 *  round picture with its name and what kind of work it is. Quieter than the featured rows so the
 *  product case studies lead. */
export function MoreWorkGrid({ projects }: { projects: Project[] }) {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-12 sm:gap-x-8 md:grid-cols-5">
      {projects.map((project) => {
        const crop = CROP[project.slug] ?? { fit: "cover" as const };
        const thumb = projectThumbnailSrc(project);
        return (
          <li key={project.slug}>
            <Link
              href={`/work/${project.slug}`}
              className="group block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
            >
              <div className={`relative aspect-square w-full overflow-hidden rounded-full ${crop.backdrop ?? "bg-surface-raised"}`}>
                {project.circleLoop ? (
                  <LoadingLoop frames={project.circleLoop} still={project.circleLoopStill} fill />
                ) : thumb ? (
                  <Image
                    src={thumb}
                    alt=""
                    fill
                    className={`transition-transform duration-[900ms] ease-out group-hover:scale-[1.05] ${
                      crop.fit === "cover" ? "object-cover" : `object-contain ${crop.scale ?? ""}`
                    } ${project.thumbnailBlend ? "mix-blend-multiply" : ""}`}
                    style={crop.position ? { objectPosition: crop.position } : undefined}
                    sizes="(max-width: 768px) 45vw, 20vw"
                  />
                ) : null}
              </div>
              <h3 className="mt-5 inline-block border-b border-transparent pb-1 font-display text-lg leading-tight tracking-tight text-ink transition-colors duration-300 group-hover:border-accent">
                {project.title}
              </h3>
              <p className="mt-1.5 text-sm text-ink-muted">{project.discipline}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
