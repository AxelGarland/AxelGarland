"use client";

import { HalftoneArrowBox } from "@/components/projects/HalftoneArrowBox";
import { pictureSrc } from "@/lib/pictures";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export type SlideStackImage = { file: string; alt: string; verse?: string };

/** A page-turning image switcher: the front image slides in/out on top of a small stack of
 *  static "peeking" cards behind it, showing the next couple of pages waiting their turn. Only
 *  the front card animates (a standard AnimatePresence enter/exit) — the peek cards are plain,
 *  fixed-position layers whose image swaps instantly, which avoids the bugs that come from
 *  trying to keep several persistent elements smoothly morphing between stack positions. */
export function SlideStackGallery({
  images,
  aspect = "aspect-[8/5]",
  maxWidth = "max-w-3xl",
  sizes = "(max-width: 768px) 100vw, 768px",
  expandOnMobile = false,
}: {
  images: SlideStackImage[];
  /** Tailwind aspect-ratio class for the image stack — defaults to the landscape ratio
   *  Jabberwocky's pages use; pass a portrait one (e.g. "aspect-[3/4]") for taller art. */
  aspect?: string;
  /** Tailwind max-width class for the stack, so tall posters can sit smaller than wide spreads. */
  maxWidth?: string;
  /** `sizes` hint for the front image. */
  sizes?: string;
  /** On touch screens, tapping the front image opens it full screen, turned sideways so a wide spread
   *  fills the screen's long edge. */
  expandOnMobile?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const hasVerse = images.some((img) => img.verse);

  const current = images[index];
  const peek1 = images.length > 1 ? images[(index + 1) % images.length] : null;
  const peek2 = images.length > 2 ? images[(index + 2) % images.length] : null;

  // The page behind must not scroll while the full-screen view is open.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const restore = () => {
      document.body.style.overflow = "";
    };
    d.addEventListener("close", restore);
    return () => {
      d.removeEventListener("close", restore);
      restore();
    };
  }, []);

  const openFull = () => {
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
  };
  const closeFull = () => dialog.current?.close();

  if (images.length === 0 || !current) return null;

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  return (
    <div>
      <div
        className={`grid grid-cols-1 items-center gap-8 ${
          hasVerse ? "md:grid-cols-[3fr_2fr] md:gap-12" : ""
        }`}
      >
        <div className={`relative mx-auto ${aspect} w-full ${maxWidth}`}>
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
                sizes={sizes}
              />
            </motion.div>
          </AnimatePresence>
          {expandOnMobile ? (
            <button
              type="button"
              onClick={openFull}
              aria-label={`Open full screen: ${current.alt}`}
              className="absolute inset-0 z-40 hidden [@media(pointer:coarse)]:block"
            />
          ) : null}
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
                className="whitespace-pre-line font-display text-lg leading-relaxed text-ink sm:text-lg"
              >
                {current.verse}
              </motion.p>
            </AnimatePresence>
          </div>
        ) : null}
      </div>

      <div className="mt-16 flex items-center justify-center gap-6">
        <button
          type="button"
          aria-label="Previous page"
          onClick={prev}
          className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <HalftoneArrowBox dir="left" />
        </button>
        <span className="min-w-[4ch] text-center text-sm text-ink-subtle">
          {index + 1} / {images.length}
        </span>
        <button
          type="button"
          aria-label="Next page"
          onClick={next}
          className="group focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <HalftoneArrowBox />
        </button>
      </div>

      {expandOnMobile ? (
        <dialog
          ref={dialog}
          aria-label={current.alt}
          onClick={closeFull}
          className="m-0 h-full max-h-none w-full max-w-none bg-black p-0 backdrop:bg-black"
        >
          <button
            type="button"
            onClick={closeFull}
            aria-label="Close"
            className="fixed right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-md"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          {/* Held upright the page is turned a quarter, to run along the screen's long edge; once the
              phone is turned sideways it sits as it is. */}
          <div className="fixed left-1/2 top-1/2 h-[100dvw] w-[100dvh] -translate-x-1/2 -translate-y-1/2 rotate-90 landscape:h-[100dvh] landscape:w-[100dvw] landscape:rotate-0">
            <div className="relative h-full w-full">
              <Image
                src={pictureSrc(current.file)}
                alt={current.alt}
                fill
                className="object-contain"
                sizes="100vh"
              />
            </div>
          </div>
        </dialog>
      ) : null}
    </div>
  );
}
