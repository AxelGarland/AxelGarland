"use client";

import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import { useRef, useState } from "react";

type Photo = { file: string; alt: string };

/** One photo at a time, whole and uncropped, with an arrow on each side to move through them. The
 *  arrow keys work when the photo is focused, and a swipe moves on touch screens. It wraps around. */
export function PhotoCarousel({ photos, label }: { photos: Photo[]; label: string }) {
  const [index, setIndex] = useState(0);
  const start = useRef<number | null>(null);
  const count = photos.length;
  const go = (n: number) => setIndex((n + count) % count);

  const arrow = (dir: -1 | 1) => (
    <button
      type="button"
      onClick={() => go(index + dir)}
      aria-label={dir === 1 ? "Next photo" : "Previous photo"}
      className={`absolute top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-line bg-surface/90 text-ink shadow-sm transition-colors duration-200 hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent lg:h-12 lg:w-12 ${
        dir === 1 ? "right-2 lg:-right-16" : "left-2 lg:-left-16"
      }`}
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden className={dir === -1 ? "rotate-180" : ""}>
        <path d="M4 10h11M10.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  return (
    <div role="region" aria-roledescription="carousel" aria-label={label} className="relative mx-auto w-full max-w-[44rem]">
      <div
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(index + 1);
          else if (e.key === "ArrowLeft") go(index - 1);
          else return;
          e.preventDefault();
        }}
        onPointerDown={(e) => {
          start.current = e.clientX;
        }}
        onPointerUp={(e) => {
          if (start.current === null) return;
          const dx = e.clientX - start.current;
          start.current = null;
          if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        }}
        className="relative h-[min(21rem,56vh)] w-full sm:h-[min(30rem,62vh)] touch-pan-y select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        {photos.map((photo, i) => (
          <Image
            key={photo.file}
            src={pictureSrc(photo.file)}
            alt={i === index ? photo.alt : ""}
            aria-hidden={i !== index}
            fill
            priority={i === 0}
            draggable={false}
            className={`object-contain transition-opacity duration-200 ${i === index ? "opacity-100" : "opacity-0"}`}
            sizes="(max-width: 768px) 100vw, 704px"
          />
        ))}
      </div>
      {count > 1 ? (
        <>
          {arrow(-1)}
          {arrow(1)}
        </>
      ) : null}
      {count > 1 ? (
        <div className="mt-5 flex justify-center" role="group" aria-label="Choose a photo">
          {photos.map((photo, i) => (
            <button
              key={photo.file}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Photo ${i + 1} of ${count}`}
              aria-current={i === index}
              className="group flex h-6 w-6 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span className={`block h-2 w-2 rounded-full transition-colors duration-200 ${i === index ? "bg-accent" : "bg-ink/20 group-hover:bg-ink/40"}`} />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
