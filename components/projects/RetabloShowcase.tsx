"use client";

import { RetabloPieces, retabloFrameStyle } from "@/components/projects/OpeningRetablo";
import type { RetabloBox } from "@/components/projects/RetabloSelector";
import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import Link from "next/link";
import { useEffect, useState } from "react";

/** Where each stage of one box's turn falls, in milliseconds from the moment it is picked. */
const SHOW_AT = 80;
const DISSOLVE = 900;
const OPEN_AT = 1100;
const OPEN_FOR = 1500;
const HOLD = 2600;
const NEXT_AT = OPEN_AT + OPEN_FOR + HOLD;

type Stage = "hidden" | "shown" | "opened";

/** The boxes one after another: each dissolves in over the last one, shut, then swings its doors
 *  open and holds before the next takes its place. Clicking the one on show opens its page. With
 *  reduced motion it stops on the first box, open. */
export function RetabloShowcase({ boxes, className = "" }: { boxes: RetabloBox[]; className?: string }) {
  const reduce = useHydrationSafeReducedMotion();
  const items = boxes.map((box, i) => ({ box, number: i + 1 })).filter(({ box }) => box.open);
  const [index, setIndex] = useState(0);
  const [stage, setStage] = useState<Stage>("hidden");
  const [leaving, setLeaving] = useState<number | null>(null);
  const [seen, setSeen] = useState<number[]>([0]);

  useEffect(() => {
    if (reduce) {
      setStage("opened");
      return;
    }
    setStage("hidden");
    const timers = [
      setTimeout(() => setStage("shown"), SHOW_AT),
      setTimeout(() => setLeaving(null), SHOW_AT + DISSOLVE + 50),
      setTimeout(() => setStage("opened"), OPEN_AT),
      setTimeout(() => {
        setLeaving(index);
        setStage("hidden");
        setIndex((i) => (i + 1) % items.length);
      }, NEXT_AT),
    ];
    return () => timers.forEach(clearTimeout);
  }, [index, reduce, items.length]);

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
        const out = i === leaving;
        // The box coming in dissolves over the one going out, which stays solid until it is covered.
        const visible = active ? stage !== "hidden" : out;
        const opened = active ? stage === "opened" : out;
        return (
          <div
            key={box.slug}
            className={`absolute inset-0 flex items-center justify-center ${
              active ? "z-10 transition-opacity duration-[900ms]" : "pointer-events-none"
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
