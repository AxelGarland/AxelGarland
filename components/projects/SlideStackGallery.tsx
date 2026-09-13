"use client";

import { pictureSrc } from "@/lib/pictures";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";

export type SlideStackImage = { file: string; alt: string; verse?: string };

/** A page-turning image switcher: the front image slides in/out on top of a small stack of
 *  static "peeking" cards behind it, showing the next couple of pages waiting their turn. Only
 *  the front card animates (a standard AnimatePresence enter/exit) — the peek cards are plain,
 *  fixed-position layers whose image swaps instantly, which avoids the bugs that come from
 *  trying to keep several persistent elements smoothly morphing between stack positions. */
export function SlideStackGallery({ images }: { images: SlideStackImage[] }) {
  const [index, setIndex] = useState(0);

  if (images.length === 0) return null;

  const current = images[index];
  const peek1 = images.length > 1 ? images[(index + 1) % images.length] : null;
  const peek2 = images.length > 2 ? images[(index + 2) % images.length] : null;

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div>
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[3fr_2fr] md:gap-12">
        <div className="relative mx-auto aspect-[8/5] w-full max-w-3xl">
          {peek2 ? (
            <div
              aria-hidden
              className="absolute inset-0 z-10 translate-x-9 translate-y-7 scale-[0.92] rotate-3 overflow-hidden border border-line bg-paper opacity-40 shadow-lg"
            >
              <Image src={pictureSrc(peek2.file)} alt="" fill className="object-contain" />
            </div>
          ) : null}

          {peek1 ? (
            <div
              aria-hidden
              className="absolute inset-0 z-20 translate-x-[18px] translate-y-[14px] scale-[0.96] rotate-1 overflow-hidden border border-line bg-paper opacity-70 shadow-lg"
            >
              <Image src={pictureSrc(peek1.file)} alt="" fill className="object-contain" />
            </div>
          ) : null}

          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              key={current.file}
              className="absolute inset-0 z-30 overflow-hidden border border-line bg-paper shadow-lg"
              initial={{ x: 60, opacity: 0, rotate: 3 }}
              animate={{ x: 0, opacity: 1, rotate: 0 }}
              exit={{ x: -60, opacity: 0, rotate: -3 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <Image
                src={pictureSrc(current.file)}
                alt={current.alt}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {current.verse ? (
          <div className="relative min-h-[120px] border border-line bg-paper p-6 sm:p-8">
            <AnimatePresence initial={false} mode="wait">
              <motion.p
                key={current.file}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="whitespace-pre-line font-display text-lg leading-relaxed text-ink sm:text-xl"
              >
                {current.verse}
              </motion.p>
            </AnimatePresence>
          </div>
        ) : null}
      </div>

      <div className="mt-8 flex items-center justify-center gap-6">
        <button
          type="button"
          aria-label="Previous page"
          onClick={prev}
          className="flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors duration-300 hover:border-ink"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="M9 2 4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        <span className="min-w-[4ch] text-center text-sm text-ink-subtle">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          aria-label="Next page"
          onClick={next}
          className="flex h-10 w-10 items-center justify-center border border-line text-ink transition-colors duration-300 hover:border-ink"
        >
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none" aria-hidden>
            <path d="m5 2 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}
