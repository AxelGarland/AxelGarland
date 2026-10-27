"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** The sliding track of the project strip. It drifts by CSS; under a mouse pointer its speed eases
 *  down to a crawl, and back up when the pointer leaves, instead of stopping dead. With reduced
 *  motion there is no animation and this does nothing. */
const SLOW = 0.2;
const EASE = 0.06;

export function DriftingStrip({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let target = 1;
    let frame = 0;

    const step = () => {
      const anim = el.getAnimations()[0];
      if (!anim) return;
      const rate = anim.playbackRate + (target - anim.playbackRate) * EASE;
      anim.playbackRate = Math.abs(rate - target) < 0.005 ? target : rate;
      frame = anim.playbackRate === target ? 0 : requestAnimationFrame(step);
    };
    const go = (to: number) => {
      target = to;
      if (!frame) frame = requestAnimationFrame(step);
    };
    const enter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") go(SLOW);
    };
    const leave = () => go(1);

    el.addEventListener("pointerenter", enter);
    el.addEventListener("pointerleave", leave);
    return () => {
      el.removeEventListener("pointerenter", enter);
      el.removeEventListener("pointerleave", leave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
