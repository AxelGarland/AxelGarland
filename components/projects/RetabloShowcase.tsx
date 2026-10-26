"use client";

import { RetabloPieces, retabloFrameStyle } from "@/components/projects/OpeningRetablo";
import type { RetabloBox } from "@/components/projects/RetabloSelector";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/** Share of each box's stretch of the bar in which its doors swing; the rest it rests fully open. */
const SWING = 0.75;
/** Where the bar starts: the first box, open. */
const START = 0.9;
/** How far an arrow key moves the handle, as a share of one box's stretch. */
const STEP = 0.08;

const smooth = (t: number) => t * t * (3 - 2 * t);

/** One box on show, with a bar underneath that scrubs through all of them: dragging along it swings
 *  each box's doors open in turn, and carrying on past the end of one brings in the next. Clicking
 *  the box on show opens its page. */
export function RetabloShowcase({
  boxes,
  className = "",
  onChange,
}: {
  boxes: RetabloBox[];
  className?: string;
  /** Called with the box now on show (its place in `boxes`), including once on mount. */
  onChange?: (boxIndex: number) => void;
}) {
  const items = boxes.map((box, i) => ({ box, number: i + 1 })).filter(({ box }) => box.open);
  const n = items.length;
  const [pos, setPos] = useState(START);
  const [dragging, setDragging] = useState(false);
  const track = useRef<HTMLDivElement>(null);

  const clamp = (v: number) => Math.min(n - 0.0001, Math.max(0, v));
  const index = Math.min(n - 1, Math.floor(pos));
  const swung = Math.min(1, (pos - index) / SWING);
  const angle = 180 * smooth(swung);
  const current = items[index];

  useEffect(() => {
    onChange?.(current.number - 1);
  }, [current.number, onChange]);

  const fromPointer = (clientX: number) => {
    const r = track.current?.getBoundingClientRect();
    if (!r) return;
    setPos(clamp(((clientX - r.left) / r.width) * n));
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const jump = (k: number) => setPos(clamp(k + START));
    switch (e.key) {
      case "ArrowRight":
      case "ArrowUp":
        setPos((p) => clamp(p + STEP));
        break;
      case "ArrowLeft":
      case "ArrowDown":
        setPos((p) => clamp(p - STEP));
        break;
      case "PageDown":
        jump(Math.min(n - 1, index + 1));
        break;
      case "PageUp":
        jump(Math.max(0, index - 1));
        break;
      case "Home":
        setPos(0);
        break;
      case "End":
        setPos(clamp(n));
        break;
      default:
        return;
    }
    e.preventDefault();
  };

  return (
    <div className={className}>
      <div className="relative h-[var(--stage-h)] w-full [--stage-h:16rem] sm:[--stage-h:21rem] md:[--stage-h:24rem]">
        {items.map(({ box, number }, i) => {
          const active = i === index;
          return (
            <div
              key={box.slug}
              className={`absolute inset-0 flex items-center justify-center ${active ? "opacity-100" : "pointer-events-none opacity-0"}`}
            >
              <Link
                href={`/work/mundos-mejores/${box.slug}`}
                aria-label={`Box ${String(number).padStart(2, "0")}: ${box.title}. Open this box`}
                tabIndex={active ? 0 : -1}
                className="relative block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
                style={retabloFrameStyle(box.open!, "var(--stage-h)")}
              >
                <RetabloPieces
                  open={box.open!}
                  lid={box.lid}
                  angle={active ? angle : i < index ? 180 : 0}
                  duration={dragging ? 40 : 90}
                  priority={i === 0}
                />
              </Link>
            </div>
          );
        })}
      </div>

      {/* The bar: one stretch per box, a handle to drag, and a line that fills behind it. */}
      <div
        ref={track}
        role="slider"
        tabIndex={0}
        aria-label="Scrub through the boxes opening"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round((pos / n) * 100)}
        aria-valuetext={`Box ${String(current.number).padStart(2, "0")}: ${current.box.title}, ${Math.round(swung * 100)}% open`}
        onKeyDown={onKeyDown}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          setDragging(true);
          fromPointer(e.clientX);
        }}
        onPointerMove={(e) => {
          if (dragging) fromPointer(e.clientX);
        }}
        onPointerUp={() => setDragging(false)}
        onPointerCancel={() => setDragging(false)}
        className="group relative mx-auto mt-6 h-11 w-full max-w-[34rem] cursor-pointer touch-none select-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        <div className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-ink/15" />
        <div className="absolute left-0 top-1/2 h-0.5 -translate-y-1/2 bg-accent" style={{ width: `${(pos / n) * 100}%` }} />
        {Array.from({ length: n + 1 }, (_, k) => (
          <div
            key={k}
            className="absolute top-1/2 h-3 w-0.5 -translate-x-1/2 -translate-y-1/2 bg-ink/30"
            style={{ left: `${(k / n) * 100}%` }}
          />
        ))}
        <div
          className={`absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-surface bg-accent shadow transition-transform duration-150 ${
            dragging ? "scale-125" : "group-hover:scale-110"
          }`}
          style={{ left: `${(pos / n) * 100}%` }}
        />
      </div>

      <div aria-hidden className="mx-auto flex w-full max-w-[34rem] items-start justify-center gap-3 text-ink">
        <span className="pt-4 text-sm font-semibold uppercase tracking-[0.1em]">Slide to open</span>
        <svg width="88" height="44" viewBox="0 0 88 44" fill="none" className="mt-1">
          <path d="M3 12C26 40 62 36 82 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M70 8l12-1 -2 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </div>
  );
}
