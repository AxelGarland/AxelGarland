import { pictureSrc } from "@/lib/pictures";
import type { Project } from "@/lib/projects";
import { WORK_IMAGES } from "@/lib/workCrops";
import Image from "next/image";
import Link from "next/link";

/** The work as 3:2 pictures, two on the first row, three on the second, two on the third. On a phone
 *  they fall into two columns with the last one centred. Pointing at one makes it grow inside a white
 *  frame of black and red halftone dots, and shows the project's name over it. */
const ROWS = [2, 3, 2];

/** Black dots with a red set between them, on white: the site's halftone, as a flat texture. */
const HALFTONE_FRAME = {
  backgroundColor: "#FFFFFF",
  backgroundImage:
    "radial-gradient(circle at center, #1A1916 0 2.5px, transparent 2.9px), radial-gradient(circle at center, #D64040 0 1.6px, transparent 2px)",
  backgroundSize: "7px 7px, 7px 7px",
  backgroundPosition: "0 0, 3.5px 3.5px",
} as const;

function Tile({ project }: { project: Project }) {
  const image = WORK_IMAGES[project.slug];
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`${project.title}. ${project.discipline}`}
      className="group relative z-0 block aspect-[3/2] w-full focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent [@media(hover:hover)]:hover:z-10 md:w-[calc((100%-4rem)/3)]"
    >
      <span className="absolute inset-0 transition-transform duration-500 ease-out group-focus-visible:scale-[1.06] [@media(hover:hover)]:group-hover:scale-[1.06]">
        <span
          aria-hidden
          style={HALFTONE_FRAME}
          className="absolute -inset-[11px] opacity-0 transition-opacity duration-300 group-focus-visible:opacity-100 [@media(hover:hover)]:group-hover:opacity-100"
        />
        <span className="absolute inset-0 overflow-hidden bg-surface-raised" style={image.backdrop ? { background: image.backdrop } : undefined}>
          <Image
            src={pictureSrc(image.file)}
            alt=""
            fill
            className={image.fit === "contain" ? "object-contain" : "object-cover"}
            style={image.position ? { objectPosition: image.position } : undefined}
            sizes="(max-width: 768px) 46vw, 380px"
          />
          <span
            aria-hidden
            className="absolute inset-0 flex items-center justify-center bg-black/0 px-[10%] text-center opacity-0 transition duration-300 group-focus-visible:bg-black/55 group-focus-visible:opacity-100 [@media(hover:hover)]:group-hover:bg-black/55 [@media(hover:hover)]:group-hover:opacity-100"
          >
            <span className="font-display text-[clamp(1.1rem,2.1vw,1.9rem)] leading-[1.05] tracking-tight text-white">{project.title}</span>
          </span>
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
    <div className="grid grid-cols-2 gap-x-5 gap-y-9 md:flex md:flex-col md:gap-y-14">
      {rows.map((row, r) => (
        <div key={r} className="contents md:flex md:justify-center md:gap-8">
          {row.map((project, i) => (
            <div
              key={project.slug}
              className={
                r === rows.length - 1 && i === row.length - 1
                  ? "max-md:col-span-2 max-md:flex max-md:justify-center [&>a]:max-md:w-[calc(50%-0.625rem)]"
                  : "contents md:block md:contents"
              }
            >
              <Tile project={project} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
