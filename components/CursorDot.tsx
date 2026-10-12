"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

/** A small red dot that trails the mouse with a soft delay and swells over links and buttons.
 *  Only for devices with a real pointer; touch screens never see it. With reduced motion on it
 *  follows the pointer exactly instead of easing behind it. */
export function CursorDot() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let scale = 1;
    let targetScale = 1;
    let raf = 0;
    let seen = false;

    const draw = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
    };

    const tick = () => {
      const follow = reduce ? 1 : 0.15;
      x += (tx - x) * follow;
      y += (ty - y) * follow;
      scale += (targetScale - scale) * 0.2;
      draw();
      const settled =
        Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1 && Math.abs(targetScale - scale) < 0.01;
      raf = settled ? 0 : requestAnimationFrame(tick);
    };

    const start = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = e.clientX;
      ty = e.clientY;
      if (!seen) {
        seen = true;
        x = tx;
        y = ty;
        draw();
      }
      el.style.opacity = "1";
      const target = e.target as Element | null;
      targetScale = target?.closest(INTERACTIVE) ? 2.4 : 1;
      start();
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[90] h-3.5 w-3.5 rounded-full bg-accent opacity-0 transition-opacity duration-300 will-change-transform"
    />
  );
}
