"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import { useRef, useState } from "react";

type Slide = { file: string; alt: string; portrait?: boolean };

/** A row of photos that snaps one at a time, with dots to jump and arrows to step. Swipes on touch
 *  screens and scrolls with the arrow keys when focused. Portrait photos sit whole on a quiet
 *  backdrop instead of being cropped to the landscape frame. */
export function ImageCarousel({ slides, label, className = "" }: { slides: Slide[]; label: string; className?: string }) {
  const reduce = useHydrationSafeReducedMotion();
  const scroller = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const go = (n: number) => {
    const el = scroller.current;
    if (!el) return;
    const target = (n + slides.length) % slides.length;
    el.scrollTo({ left: target * el.clientWidth, behavior: reduce ? "auto" : "smooth" });
  };

  const arrow = (dir: -1 | 1) => (
    <button
      type="button"
      onClick={() => go(active + dir)}
      aria-label={dir === 1 ? "Next photo" : "Previous photo"}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden className={dir === -1 ? "rotate-180" : ""}>
        <path d="M4 10h11M10.5 5l5 5-5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );

  return (
    <div className={className} role="region" aria-roledescription="carousel" aria-label={label}>
      <div
        ref={scroller}
        tabIndex={0}
        onScroll={(e) => {
          const el = e.currentTarget;
          setActive(Math.round(el.scrollLeft / el.clientWidth));
        }}
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: "none" }}
      >
        {slides.map((slide, i) => (
          <div key={slide.file} className="relative aspect-[4/3] w-full shrink-0 snap-center bg-surface-raised">
            <Image
              src={pictureSrc(slide.file)}
              alt={slide.alt}
              fill
              priority={i === 0}
              className={slide.portrait ? "object-contain" : "object-cover"}
              sizes="(max-width: 768px) 100vw, 58vw"
            />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between gap-4">
        <div className="flex items-center" role="group" aria-label="Choose a photo">
          {slides.map((slide, i) => (
            <button
              key={slide.file}
              type="button"
              onClick={() => go(i)}
              aria-label={`Photo ${i + 1} of ${slides.length}`}
              aria-current={i === active}
              className="group flex h-6 w-6 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-accent"
            >
              <span className={`block h-2 w-2 rounded-full transition-colors duration-200 ${i === active ? "bg-accent" : "bg-ink/20 group-hover:bg-ink/40"}`} />
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          {arrow(-1)}
          {arrow(1)}
        </div>
      </div>
    </div>
  );
}
