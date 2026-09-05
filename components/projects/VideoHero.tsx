"use client";

import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import { useState } from "react";

/** Pulls the numeric id out of a vimeo.com/<id> share URL so it can be pointed at the
 *  no-chrome player embed instead. */
function vimeoEmbedSrc(videoUrl: string): string | null {
  const match = videoUrl.match(/vimeo\.com\/(\d+)/);
  if (!match) return null;
  return `https://player.vimeo.com/video/${match[1]}?autoplay=1&loop=1&title=0&byline=0&portrait=0`;
}

/** Hero image that plays its video inline, in place, once clicked — a poster with a play
 *  button that swaps itself for an embedded player, rather than linking out. */
export function VideoHero({
  file,
  alt,
  videoUrl,
  priority = false,
  fit = "cover",
}: {
  file: string;
  alt: string;
  videoUrl: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}) {
  const [playing, setPlaying] = useState(false);
  const embedSrc = vimeoEmbedSrc(videoUrl);

  if (playing && embedSrc) {
    return (
      <iframe
        src={embedSrc}
        title={alt}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setPlaying(true)}
      className="group absolute inset-0 h-full w-full cursor-pointer"
      aria-label={`Play the ${alt}`}
    >
      <Image
        src={pictureSrc(file)}
        alt={alt}
        fill
        priority={priority}
        className={`${fit === "contain" ? "object-contain p-6" : "object-cover"} transition-transform duration-500 ease-out group-hover:scale-[1.03]`}
        sizes="(max-width: 768px) 100vw, 1200px"
      />
      <div className="absolute inset-0 flex items-center justify-center bg-ink/20 transition-colors duration-300 group-hover:bg-ink/35">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-surface/90 shadow-lg transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden>
            <path d="M7 4.5v13l11-6.5-11-6.5Z" fill="#1A1916" />
          </svg>
        </span>
      </div>
    </button>
  );
}
