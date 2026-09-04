"use client";

import { pictureSrc } from "@/lib/pictures";
import type { ProjectImage } from "@/lib/projects";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

type ProjectGalleryProps = {
  /** Thumbnails shown in the page grid */
  images: ProjectImage[];
  /** Full set navigable in the lightbox (defaults to `images`) */
  lightboxImages?: ProjectImage[];
  lightboxFeatured?: string[];
  heroFile?: string;
};

export function ProjectGallery({
  images,
  lightboxImages,
  lightboxFeatured = [],
  heroFile,
}: ProjectGalleryProps) {
  const lightboxSet = lightboxImages ?? images;
  const ordered = orderGallery(lightboxSet, lightboxFeatured, heroFile);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const close = useCallback(() => setLightboxIndex(null), []);
  const showPrev = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i - 1 + ordered.length) % ordered.length));
  }, [ordered.length]);
  const showNext = useCallback(() => {
    setLightboxIndex((i) => (i === null ? null : (i + 1) % ordered.length));
  }, [ordered.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") showPrev();
      if (e.key === "ArrowRight") showNext();
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, close, showPrev, showNext]);

  return (
    <>
      <ul className="grid gap-4 sm:grid-cols-2 lg:gap-6">
        {images.map((img, index) => (
          <li key={img.file} className={index === 0 && heroFile === img.file ? "sm:col-span-2" : ""}>
            <button
              type="button"
              onClick={() =>
                setLightboxIndex(ordered.findIndex((o) => o.file === img.file))
              }
              className="group relative block aspect-[4/3] w-full overflow-hidden border border-line bg-surface-raised text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <Image
                src={pictureSrc(img.file)}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                sizes="(max-width: 768px) 100vw, 600px"
              />
            </button>
          </li>
        ))}
      </ul>

      {lightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/88 p-4 backdrop-blur-sm sm:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            className="absolute right-4 top-4 z-10 rounded border border-white/20 px-3 py-1.5 text-sm text-white/90 transition-colors hover:bg-white/10 sm:right-8 sm:top-8"
          >
            Close
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrev();
            }}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 p-3 text-white/90 transition-colors hover:bg-white/10 sm:left-6"
            aria-label="Previous image"
          >
            ←
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 p-3 text-white/90 transition-colors hover:bg-white/10 sm:right-6"
            aria-label="Next image"
          >
            →
          </button>
          <figure
            className="relative max-h-[85vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] max-h-[85vh] w-full">
              <Image
                src={pictureSrc(ordered[lightboxIndex]!.file)}
                alt={ordered[lightboxIndex]!.alt}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>
            <figcaption className="mt-4 text-center text-sm text-white/70">
              {ordered[lightboxIndex]!.alt}
              <span className="ml-2 text-white/40">
                {lightboxIndex + 1} / {ordered.length}
              </span>
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}

function orderGallery(
  images: ProjectImage[],
  featured: string[],
  heroFile?: string,
): ProjectImage[] {
  const byFile = new Map(images.map((img) => [img.file, img]));
  const seen = new Set<string>();
  const ordered: ProjectImage[] = [];

  for (const file of featured) {
    const img = byFile.get(file);
    if (img && !seen.has(file)) {
      ordered.push(img);
      seen.add(file);
    }
  }

  if (heroFile) {
    const hero = byFile.get(heroFile);
    if (hero && !seen.has(heroFile)) {
      ordered.unshift(hero);
      seen.add(heroFile);
    }
  }

  for (const img of images) {
    if (!seen.has(img.file)) ordered.push(img);
  }

  return ordered;
}
