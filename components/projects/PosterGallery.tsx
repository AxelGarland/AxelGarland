"use client";

import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import { useRef, useState, type KeyboardEvent } from "react";

type Poster = { file: string; alt: string };

const PAGE = 5;

/** One large poster with a short column of previews to its right, like a product page: point at a
 *  preview (or tap it) and it becomes the large one. Five previews show at a time, and the arrow
 *  underneath them brings up the next five (and, on the last page, goes back). On phones the
 *  previews sit in a row under the poster and the arrow is at the end of the row. The arrow keys
 *  move through the previews. */
export function PosterGallery({ posters, label = "Poster" }: { posters: Poster[]; label?: string }) {
  const [active, setActive] = useState(0);
  const [page, setPage] = useState(0);
  const thumbs = useRef<(HTMLButtonElement | null)[]>([]);
  const pages = Math.ceil(posters.length / PAGE);
  const last = page >= pages - 1;
  const visible = posters.slice(page * PAGE, page * PAGE + PAGE);

  const onKey = (e: KeyboardEvent) => {
    const next = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
    if (!next) return;
    e.preventDefault();
    const i = (active + next + posters.length) % posters.length;
    setActive(i);
    setPage(Math.floor(i / PAGE));
    window.requestAnimationFrame(() => thumbs.current[i]?.focus());
  };

  const canHover = () => typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  return (
    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-end md:gap-6">
      {/* The large poster */}
      <div className="w-full md:w-[min(24rem,30vw,calc((100svh-14rem)*0.707))] md:shrink-0">
        <div className="relative mx-auto aspect-[842/1191] w-full max-w-[22rem] bg-white shadow-[0_28px_60px_-34px_rgba(26,25,22,0.45)] md:mx-0 md:max-w-none">
          {posters.map((p, i) => (
            <Image
              key={p.file}
              src={pictureSrc(p.file)}
              alt={i === active ? p.alt : ""}
              aria-hidden={i !== active}
              fill
              className={`object-contain transition-opacity duration-300 ${i === active ? "opacity-100" : "opacity-0"}`}
              sizes="(max-width: 768px) 352px, 384px"
              priority={i === 0}
            />
          ))}
        </div>
        <p className="mt-3 text-sm tabular-nums text-ink-muted" aria-live="polite">
          {label} {active + 1} of {posters.length}
        </p>
      </div>

      {/* The previews, with the arrow underneath (or at the end of the row on phones) */}
      <div className="flex items-start gap-2.5 md:w-[min(4.75rem,calc((100svh-19.6rem)*0.1414))] md:shrink-0 md:flex-col md:items-stretch">
        <div
          role="listbox"
          aria-label={`${label} previews`}
          onKeyDown={onKey}
          className="flex gap-2.5 md:flex-col"
        >
          {visible.map((p, k) => {
            const i = page * PAGE + k;
            return (
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
                className={`relative aspect-[842/1191] w-[2.8rem] shrink-0 overflow-hidden border bg-white transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-[3.35rem] md:w-full ${
                  i === active ? "border-accent opacity-100 ring-1 ring-accent" : "border-line opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={pictureSrc(p.file)} alt="" fill className="object-cover" sizes="80px" />
              </button>
            );
          })}
        </div>
        {pages > 1 ? (
          <button
            type="button"
            onClick={() => setPage(last ? 0 : page + 1)}
            aria-label={last ? "Show the first previews again" : "Show the next previews"}
            className="flex h-10 w-10 shrink-0 items-center justify-center self-center rounded-full border border-line bg-surface text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent md:mt-1"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden
              className={`transition-transform duration-300 ${last ? "rotate-90 md:rotate-180" : "-rotate-90 md:rotate-0"}`}
            >
              <path d="M5 7.5 10 12.5 15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        ) : null}
      </div>
    </div>
  );
}
