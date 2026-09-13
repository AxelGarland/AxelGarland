"use client";

import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import { useState } from "react";

type CollageImage = { file: string; alt: string; caption: string };

/** A row of small thumbnails on the left, one large preview on the right — hovering (or
 *  focusing, for keyboard users) a thumbnail swaps the big preview instead of navigating
 *  anywhere. Defaults to the first image. */
export function HoverCollage({ images }: { images: CollageImage[] }) {
  const [active, setActive] = useState(0);
  const current = images[active];

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-[1fr_2fr] md:gap-8">
      <div className="grid grid-cols-5 gap-2 md:grid-cols-2">
        {images.map((img, i) => (
          <button
            key={img.file}
            type="button"
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            className={`relative aspect-square w-full overflow-hidden bg-surface/10 transition-colors duration-300 ${
              i === active ? "ring-2 ring-indigo" : "ring-1 ring-surface/15 hover:ring-surface/40"
            }`}
            aria-label={img.caption}
            aria-pressed={i === active}
          >
            <Image
              src={pictureSrc(img.file)}
              alt={img.alt}
              fill
              className="object-contain p-1.5"
              sizes="120px"
            />
          </button>
        ))}
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden bg-surface/10 md:aspect-[3/2]">
        <Image
          key={current.file}
          src={pictureSrc(current.file)}
          alt={current.alt}
          fill
          className="object-contain p-6"
          sizes="(max-width: 768px) 90vw, 45vw"
        />
        <span className="absolute bottom-3 left-3 text-xs uppercase tracking-[0.08em] text-surface/60">
          {current.caption}
        </span>
      </div>
    </div>
  );
}
