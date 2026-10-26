"use client";

import { RetabloPieces, retabloFrameStyle } from "@/components/projects/OpeningRetablo";
import type { RetabloBox } from "@/components/projects/RetabloSelector";
import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/** Where each stage of one box's turn falls, in milliseconds from the moment it is picked. */
const FADE = 150;
const BLANK = 300;
const OPEN_AT = BLANK + 80;
const OPEN_FOR = 1500;
const HOLD = 2600;
const NEXT_AT = OPEN_AT + OPEN_FOR + HOLD;

type Stage = "hidden" | "shown" | "opened";

/** The boxes one after another: a box swings its doors open and holds, then it fades out fast, the
 *  page is blank for a beat, and the next one fades in fast and opens straight away. Clicking the one
 *  on show opens its page. While `paused` the box on show stays open instead of moving on. With
 *  reduced motion it stops on the first box, open. */
export function RetabloShowcase({
  boxes,
  className = "",
  paused = false,
  onChange,
}: {
  boxes: RetabloBox[];
  className?: string;
  paused?: boolean;
  /** Called with the box now on show (its place in `boxes`), including once on mount. */
  onChange?: (boxIndex: number) => void;
}) {
  const reduce = useHydrationSafeReducedMotion();
  const items = boxes.map((box, i) => ({ box, number: i + 1 })).filter(({ box }) => box.open);
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("hidden");
  const [leaving, setLeaving] = useState<number | null>(null);
  const [seen, setSeen] = useState<number[]>([0]);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    if (reduce) {
      setStage("opened");
      return;
    }
    setStage("hidden");
    let waiting: ReturnType<typeof setTimeout> | undefined;
    const advance = () => {
      if (pausedRef.current) {
        waiting = setTimeout(advance, 200);
        return;
      }
      setLeaving(index);
      setStage("hidden");
      setIndex((i) => (i + 1) % items.length);
    };
    const timers = [
      setTimeout(() => setLeaving(null), FADE + 50),
      setTimeout(() => setStage("shown"), BLANK),
      setTimeout(() => setStage("opened"), OPEN_AT),
      setTimeout(advance, NEXT_AT),
    ];
    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(waiting);
    };
  }, [index, reduce, items.length]);

  const onShow = items[index].number - 1;
  useEffect(() => {
    onChange?.(onShow);
  }, [onShow, onChange]);

  // Keep the next box's pictures coming while this one plays, so each starts instantly.
  useEffect(() => {
    const next = (index + 1) % items.length;
    setSeen((s) => (s.includes(index) && s.includes(next) ? s : [...new Set([...s, index, next])]));
  }, [index, items.length]);

  return (
    <div
      className={`relative h-[var(--stage-h)] w-full [--stage-h:16rem] sm:[--stage-h:21rem] md:[--stage-h:24rem] ${className}`}
    >
      {items.map(({ box, number }, i) => {
        if (!seen.includes(i)) return null;
        const active = i === index;
        const visible = active && stage !== "hidden";
        // The box going out keeps its doors open while it fades, then closes them unseen.
        const opened = active ? stage === "opened" : i === leaving;
        return (
          <div
            key={box.slug}
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-150 ${
              active ? "" : "pointer-events-none"
            } ${visible ? "opacity-100" : "opacity-0"}`}
          >
            <Link
              href={`/work/mundos-mejores/${box.slug}`}
              aria-label={`Box ${String(number).padStart(2, "0")}: ${box.title}. Open this box`}
              tabIndex={active ? 0 : -1}
              className="relative block w-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent"
              style={retabloFrameStyle(box.open!, "var(--stage-h)")}
            >
              <RetabloPieces open={box.open!} lid={box.lid} opened={opened} duration={reduce ? 0 : OPEN_FOR} priority={i === 0} />
            </Link>
          </div>
        );
      })}
    </div>
  );
}
