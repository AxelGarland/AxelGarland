"use client";

import { pictureSrc } from "@/lib/pictures";
import type { Project } from "@/lib/projects";
import { WORK_IMAGES } from "@/lib/workCrops";
import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { PixelatedPicture } from "@/components/projects/PixelatedPicture";

/** The work as 3:2 pictures, two on the first row, three on the second, two on the third. On a phone
 *  they fall into two columns with the last one centred. Pointing at one grows it a little, shows the
 *  project's name over it, and turns all the others into halftone dots until the pointer leaves. */
const ROWS = [2, 3, 2];

function Tile({ project, halftone, onEnter, onLeave }: { project: Project; halftone: boolean; onEnter: () => void; onLeave: () => void }) {
  const image = WORK_IMAGES[project.slug];
  return (
    <Link
      href={`/work/${project.slug}`}
      aria-label={`${project.title}. ${project.discipline}`}
      onPointerEnter={(e) => e.pointerType === "mouse" && onEnter()}
      onPointerLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="group relative z-0 block aspect-[3/2] w-full focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent [@media(hover:hover)]:hover:z-10 md:w-[calc((100%-1.5rem)/3)]"
    >
      <span className="absolute inset-0 transition-transform duration-500 ease-out group-focus-visible:scale-[1.04] [@media(hover:hover)]:group-hover:scale-[1.04]">
        <span className="absolute inset-0 overflow-hidden bg-surface-raised" style={image.backdrop ? { background: image.backdrop } : undefined}>
          <Image
            src={pictureSrc(image.file)}
            alt=""
            fill
            className={image.fit === "contain" ? "object-contain" : "object-cover"}
            style={image.position ? { objectPosition: image.position } : undefined}
            sizes="(max-width: 768px) 46vw, 380px"
          />
          <PixelatedPicture
            src={`/_next/image?url=${encodeURIComponent(pictureSrc(image.file))}&w=768&q=75`}
            fit={image.fit}
            position={image.position}
            backdrop={image.backdrop}
            halftone={halftone}
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
              <Tile project={project} halftone={active !== null && active !== project.slug} onEnter={() => enter(project.slug)} onLeave={leave} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
