"use client";

import { pictureSrc } from "@/lib/pictures";
import type { Project } from "@/lib/projects";
import { WORK_IMAGES } from "@/lib/workCrops";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";

/** The work as 3:2 pictures, two on the first row, three on the second, two on the third. On a phone
 *  they fall into two columns with the last one centred. Pointing at one makes it bigger, with no
 *  overlay, while all the others shrink and take a light dark veil until the pointer leaves. */
const ROWS = [2, 3, 2];

function Tile({ project, dimmed, hovered, onEnter, onLeave }: { project: Project; dimmed: boolean; hovered: boolean; onEnter: () => void; onLeave: () => void }) {
  const image = WORK_IMAGES[project.slug];
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`${project.title}. ${project.discipline}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && onEnter()}
      onPointerLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className={`group relative block aspect-[3/2] w-full focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent md:w-[calc((100%-1.5rem)/3)] ${hovered ? "z-10" : "z-0"}`}
    >
      <span className={`absolute inset-0 transition-transform duration-500 ease-out ${hovered ? "scale-[1.08]" : dimmed ? "scale-[0.93]" : ""}`}>
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
            className={`pointer-events-none absolute inset-0 bg-black transition-opacity duration-300 ease-out ${dimmed ? "opacity-40" : "opacity-0"}`}
          />
        </span>
      </span>
    </Link>
  );
}

export function WorkGrid({ projects }: { projects: Project[] }) {
  // Which picture the pointer is on. Leaving waits a beat, so crossing the gap between two pictures
  // doesn't flash the others back to normal.
  const [active, setActive] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const enter = (slug: string) => {
    clearTimeout(timer.current);
    setActive(slug);
  };
  const leave = () => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setActive(null), 120);
  };
  let at = 0;
  const rows = ROWS.map((n) => {
    const row = projects.slice(at, at + n);
    at += n;
    return row;
  });
  return (
    <div className="grid grid-cols-2 gap-3 md:flex md:flex-col">
      {rows.map((row, r) => (
        <div key={r} className="contents md:flex md:justify-center md:gap-3">
          {row.map((project, i) => (
            <div
              key={project.slug}
              className={
                r === rows.length - 1 && i === row.length - 1
                  ? "max-md:col-span-2 max-md:flex max-md:justify-center [&>a]:max-md:w-[calc(50%-0.375rem)] md:contents"
                  : "contents"
              }
            >
              <Tile project={project} dimmed={active !== null && active !== project.slug} hovered={active === project.slug} onEnter={() => enter(project.slug)} onLeave={leave} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
