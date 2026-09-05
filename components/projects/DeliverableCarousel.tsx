"use client";

import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import { useState } from "react";

type CarouselImage = { file: string; alt: string; caption?: string };

/** A fixed-size image slot for a deliverable card — one image if that's all there is, or a
 *  same-sized carousel with prev/next arrows when there's more than one, so every card in the
 *  grid reads as the same size regardless of how many images it holds. */
export function DeliverableCarousel({ images }: { images: CarouselImage[] }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;
  const current = images[index];

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface/10">
      <Image
        key={current.file}
        src={pictureSrc(current.file)}
        alt={current.alt}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />

      {images.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous image"
            onClick={(e) => {
              e.preventDefault();
              setIndex((i) => (i - 1 + images.length) % images.length);
            }}
            className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center bg-ink/60 text-surface backdrop-blur-sm transition-colors duration-300 hover:bg-ink/80"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="M9 2 4 7l5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next image"
            onClick={(e) => {
              e.preventDefault();
              setIndex((i) => (i + 1) % images.length);
            }}
            className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center bg-ink/60 text-surface backdrop-blur-sm transition-colors duration-300 hover:bg-ink/80"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
              <path
                d="m5 2 5 5-5 5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((img, i) => (
              <span
                key={img.file}
                className={`h-1.5 w-1.5 ${i === index ? "bg-surface" : "bg-surface/30"}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}
