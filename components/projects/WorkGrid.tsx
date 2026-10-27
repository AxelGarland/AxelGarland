import { CROP } from "@/lib/workCrops";
import { projectThumbnailSrc, type Project } from "@/lib/projects";
import Image from "next/image";
import Link from "next/link";

/** The work as circles, two on the first row, three on the second, two on the third. On a phone they
 *  fall into two columns with the last one centred. Each circle is the project's picture; pointing at
 *  it dims the picture and shows the name. */
const ROWS = [2, 3, 2];

function Circle({ project }: { project: Project }) {
  const thumb = projectThumbnailSrc(project);
  const crop = CROP[project.slug] ?? { fit: "cover" as const };
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`${project.title}. ${project.discipline}`}
      className="group relative block aspect-square w-full max-w-[16rem] justify-self-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:w-[min(24vw,16.5rem)] md:max-w-none"
    >
      <span className={`absolute inset-0 overflow-hidden rounded-full ${crop.backdrop ?? "bg-surface-raised"}`}>
        {thumb ? (
          <Image
            src={thumb}
            alt=""
            fill
            className={`transition-transform duration-[900ms] ease-out group-hover:scale-[1.05] ${
              crop.fit === "cover" ? "object-cover" : `object-contain ${crop.scale ?? ""}`
            } ${project.thumbnailBlend ? "mix-blend-multiply" : ""}`}
            style={crop.position ? { objectPosition: crop.position } : undefined}
            sizes="(max-width: 768px) 45vw, 264px"
          />
        ) : null}
        <span
          aria-hidden
          className="absolute inset-0 flex items-center justify-center bg-ink/0 px-[12%] text-center opacity-0 transition duration-300 [@media(hover:hover)]:group-hover:bg-ink/60 [@media(hover:hover)]:group-hover:opacity-100"
        >
          <span className="font-display text-[clamp(1.1rem,2vw,1.7rem)] leading-[1.05] tracking-tight text-white">{project.title}</span>
        </span>
      </span>
    </Link>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  let at = 0;
  const rows = ROWS.map((n) => {
    const row = projects.slice(at, at + n);
    at += n;
    return row;
  });
  return (
    <div className="grid grid-cols-2 gap-x-5 gap-y-8 md:flex md:flex-col md:gap-y-12">
      {rows.map((row, r) => (
        <div key={r} className="contents md:flex md:justify-center md:gap-12 lg:gap-16">
          {row.map((project, i) => (
            <div
              key={project.slug}
              className={r === rows.length - 1 && i === row.length - 1 ? "max-md:col-span-2 max-md:flex max-md:justify-center [&>a]:max-md:w-[calc(50%-0.625rem)]" : "flex justify-center"}
            >
              <Circle project={project} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
