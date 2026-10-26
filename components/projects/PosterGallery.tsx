"use client";

import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

type Poster = { file: string; alt: string };

/** One large poster with a column of small previews beside it, like a product page: point at a
 *  preview (or tap it) and it becomes the large one. On phones the previews sit in a row under the
 *  poster. The up and down arrow keys (left and right in the phone row) move through them. */
export function PosterGallery({ posters, label = "Poster" }: { posters: Poster[]; label?: string }) {
  const [active, setActive] = useState(0);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent) => {
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!next) return;
    e.preventDefault();
    const i = (active + next + posters.length) % posters.length;
    setActive(i);
    // Only keyboard moves scroll the rail. If hovering scrolled it, a different preview would slide
    // under the pointer and get selected in turn.
    thumbs.current[i]?.focus();
    thumbs.current[i]?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  };

  const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-stretch md:justify-end md:gap-6">
      {/* Previews: a scrolling column on the side, a row under the poster on phones */}
      <div className="relative order-2 md:order-1 md:w-[4.25rem] md:shrink-0 lg:w-[4.75rem]">
        <div
          role="listbox"
          aria-label={`${label} previews`}
          onKeyDown={onKey}
          className="flex gap-2.5 overflow-x-auto overflow-y-hidden pb-2 md:absolute md:inset-0 md:flex-col md:overflow-x-hidden md:overflow-y-auto md:pb-0 md:pr-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {posters.map((p, i) => (
            <button
              key={p.file}
              ref={(el) => {
                thumbs.current[i] = el;
              }}
              type="button"
              role="option"
              aria-selected={i === active}
              aria-label={`Show ${label.toLowerCase()} ${i + 1} of ${posters.length}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onMouseEnter={() => canHover() && setActive(i)}
              onFocus={() => setActive(i)}
              className={`relative aspect-[842/1191] w-14 shrink-0 overflow-hidden border bg-white transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:w-full ${
                i === active ? "border-accent opacity-100 ring-1 ring-accent" : "border-line opacity-60 hover:opacity-100"
              }`}
            >
              <Image src={pictureSrc(p.file)} alt="" fill className="object-cover" sizes="80px" />
            </button>
          ))}
        </div>
      </div>

      {/* The large poster */}
      <div className="order-1 w-full md:order-2 md:w-[min(27rem,32vw)] md:shrink-0">
        <div className="relative mx-auto aspect-[842/1191] w-full max-w-[22rem] bg-white shadow-[0_28px_60px_-34px_rgba(26,25,22,0.45)] md:mx-0 md:max-w-none">
          {posters.map((p, i) => (
            <Image
              key={p.file}
              src={pictureSrc(p.file)}
              alt={i === active ? p.alt : ""}
              aria-hidden={i !== active}
              fill
              className={`object-contain transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`}
              sizes="(max-width: 768px) 352px, 480px"
              priority={i === 0}
            />
          ))}
        </div>
        <p className="mt-3 text-sm tabular-nums text-ink-muted" aria-live="polite">
          {label} {active + 1} of {posters.length}
        </p>
      </div>
    </div>
  );
}
