"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a, button, [role='button'], input, textarea, select, label, summary";

/** A halftone dot that trails the mouse with a soft delay and swells over links and buttons: black
 *  dots in the middle that shrink and turn red toward the edge, like the name in the hero.
 *  Only for devices with a real pointer; touch screens never see it. With reduced motion on it
 *  follows the pointer exactly instead of easing behind it. */
const SIZE = 56;
const REST_SCALE = 0.5;
const HOVER_SCALE = 0.85;
const CELL = 4.4;

/** Draws the halftone disc once, at full size; the page scales it down for its resting state. */
function paintDot(canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = SIZE * dpr;
  canvas.height = SIZE * dpr;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  const R = SIZE / 2;
  // A faint white disc behind the dots keeps it readable over dark sections and images.
  ctx.fillStyle = "rgba(255,255,255,0.9)";
  ctx.beginPath();
  ctx.arc(R, R, R - 1, 0, Math.PI * 2);
  ctx.fill();
  for (let y = CELL / 2; y < SIZE; y += CELL) {
    for (let x = CELL / 2; x < SIZE; x += CELL) {
      const t = Math.hypot(x - R, y - R) / (R - 2);
      if (t > 1) continue;
      const cov = 1 - 0.78 * Math.pow(t, 1.5);
      ctx.fillStyle = cov > 0.55 ? "#1A1916" : "#D64040";
      ctx.beginPath();
      ctx.arc(x, y, (CELL / 2) * Math.sqrt(cov) * 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export function CursorDot() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    paintDot(el);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let scale = REST_SCALE;
    let targetScale = REST_SCALE;
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
      targetScale = target?.closest(INTERACTIVE) ? HOVER_SCALE : REST_SCALE;
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
    <canvas
      ref={ref}
      aria-hidden
      style={{ width: SIZE, height: SIZE }}
      className="pointer-events-none fixed left-0 top-0 z-[90] opacity-0 transition-opacity duration-300 will-change-transform"
    />
  );
}
