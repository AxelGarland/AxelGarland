"use client";

import { useEffect, useRef } from "react";

/** White halftone sparkles (four-point, diamond-shaped stars) scattered over a dark section, behind
 *  its content. Each star is a field of round dots that are biggest at its centre and shrink to
 *  nothing at the tips. Positions are fractions of the section so the pattern holds at any size, and
 *  the canvas is redrawn when the section is resized. Purely decorative. */

/** x and y are percentages of the section, r is the star's radius in px at full size. */
const STARS = [
  { x: 6, y: 7, r: 74 },
  { x: 36, y: 14, r: 26 },
  { x: 52, y: 4, r: 32 },
  { x: 67, y: 17, r: 30 },
  { x: 94, y: 6, r: 52 },
  { x: 13, y: 33, r: 38 },
  { x: 89, y: 31, r: 92 },
  { x: 4, y: 56, r: 48 },
  { x: 96, y: 58, r: 34 },
  { x: 26, y: 52, r: 30 },
  { x: 80, y: 73, r: 40 },
  { x: 8, y: 92, r: 62 },
  { x: 50, y: 94, r: 34 },
  { x: 92, y: 91, r: 66 },
] as const;

const CELL = 5;
const SHAPE = 0.62;

export function HalftoneStars() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const draw = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fff";

      const scale = Math.min(1, w / 1200);
      for (const star of STARS) {
        const r = star.r * scale;
        const cx = (star.x / 100) * w;
        const cy = (star.y / 100) * h;
        for (let y = -r; y <= r; y += CELL) {
          for (let x = -r; x <= r; x += CELL) {
            const d = Math.pow(Math.abs(x) / r, SHAPE) + Math.pow(Math.abs(y) / r, SHAPE);
            const cov = 1 - d;
            if (cov <= 0.05) continue;
            ctx.beginPath();
            ctx.arc(cx + x, cy + y, (CELL / 2) * Math.sqrt(cov) * 1.15, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
