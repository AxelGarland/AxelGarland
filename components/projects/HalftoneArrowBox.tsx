"use client";

import { useEffect, useRef } from "react";

/** The "open this project" mark: a white box with a thin black frame holding an arrow drawn in
 *  halftone dots, black with red at the edges. When the row it sits in (the nearest `group`) is
 *  hovered or focused, the box turns black and the arrow white. The arrow is drawn once into two
 *  canvases, one per state, and the page fades between them. It is decoration: the link around it
 *  carries the name. */

const INK = "#1A1916";
const RED = "#D64040";
const WHITE = "#FFFFFF";
const SIZE = 56;
const CELL = 2;

function paint(canvas: HTMLCanvasElement, mask: Uint8ClampedArray, fg: string, dpr: number) {
  canvas.width = SIZE * dpr;
  canvas.height = SIZE * dpr;
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, SIZE, SIZE);
  for (let y = 0; y < SIZE; y += CELL) {
    for (let x = 0; x < SIZE; x += CELL) {
      let sum = 0;
      let n = 0;
      for (let yy = Math.floor(y); yy < Math.min(SIZE, Math.floor(y + CELL)); yy++) {
        for (let xx = Math.floor(x); xx < Math.min(SIZE, Math.floor(x + CELL)); xx++) {
          sum += mask[(yy * SIZE + xx) * 4 + 3];
          n++;
        }
      }
      const cov = n ? sum / n / 255 : 0;
      if (cov < 0.12) continue;
      ctx.fillStyle = cov > 0.55 ? fg : RED;
      ctx.beginPath();
      ctx.arc(x + CELL / 2, y + CELL / 2, (CELL / 2) * Math.sqrt(cov) * 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export function HalftoneArrowBox({ className = "h-12 w-12 sm:h-14 sm:w-14" }: { className?: string }) {
  const rest = useRef<HTMLCanvasElement>(null);
  const hover = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!rest.current || !hover.current) return;
    const c = document.createElement("canvas");
    c.width = SIZE;
    c.height = SIZE;
    const m = c.getContext("2d")!;
    m.strokeStyle = "#000";
    m.lineWidth = 8.5;
    m.lineCap = "round";
    m.lineJoin = "round";
    m.beginPath();
    m.moveTo(12, 28);
    m.lineTo(43, 28);
    m.moveTo(28.5, 13.5);
    m.lineTo(43, 28);
    m.lineTo(28.5, 42.5);
    m.stroke();
    const mask = m.getImageData(0, 0, SIZE, SIZE).data;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    paint(rest.current, mask, INK, dpr);
    paint(hover.current, mask, WHITE, dpr);
  }, []);

  return (
    <span
      aria-hidden
      className={`relative inline-block shrink-0 border border-ink bg-white transition-colors duration-300 group-hover:bg-ink group-focus-visible:bg-ink ${className}`}
    >
      <canvas
        ref={rest}
        className="absolute inset-0 h-full w-full transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0"
      />
      <canvas
        ref={hover}
        className="absolute inset-0 h-full w-full opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
    </span>
  );
}
