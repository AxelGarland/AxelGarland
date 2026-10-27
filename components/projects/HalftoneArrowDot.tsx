"use client";

import { useEffect, useRef } from "react";

/** The red arrow mark: a circle with a right-pointing arrow (left-pointing with `flip`), drawn in halftone dots.
 *  Red dots fill the circle and thin out at its edge; the arrow is left clear, its edges thinning the
 *  same way. Drawn once. It is decoration, so the link it sits in carries the name. */

const RED = "#D64040";
const SIZE = 48;
const CELL = 2.4;
const DOT = 0.86;

export function HalftoneArrowDot({ className = "", flip = false }: { className?: string; flip?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, SIZE, SIZE);

    const mask = (draw: (m: CanvasRenderingContext2D) => void) => {
      const c = document.createElement("canvas");
      c.width = SIZE;
      c.height = SIZE;
      const m = c.getContext("2d")!;
      m.fillStyle = "#000";
      m.strokeStyle = "#000";
      draw(m);
      return m.getImageData(0, 0, SIZE, SIZE).data;
    };
    const disc = mask((m) => {
      m.beginPath();
      m.arc(SIZE / 2, SIZE / 2, SIZE / 2 - 0.5, 0, Math.PI * 2);
      m.fill();
    });
    const arrow = mask((m) => {
      const k = SIZE / 20;
      m.lineWidth = 2.1 * k;
      m.lineCap = "round";
      m.lineJoin = "round";
      m.beginPath();
      m.moveTo(4.2 * k, 10 * k);
      m.lineTo(15 * k, 10 * k);
      m.moveTo(10.6 * k, 5.4 * k);
      m.lineTo(15.2 * k, 10 * k);
      m.lineTo(10.6 * k, 14.6 * k);
      m.stroke();
    });

    const cover = (data: Uint8ClampedArray, x: number, y: number) => {
      let sum = 0;
      let n = 0;
      for (let yy = Math.floor(y); yy < Math.min(SIZE, Math.ceil(y + CELL)); yy++) {
        for (let xx = Math.floor(x); xx < Math.min(SIZE, Math.ceil(x + CELL)); xx++) {
          sum += data[(yy * SIZE + xx) * 4 + 3];
          n++;
        }
      }
      return n ? sum / n / 255 : 0;
    };

    ctx.fillStyle = RED;
    for (let y = 0; y < SIZE; y += CELL) {
      for (let x = 0; x < SIZE; x += CELL) {
        const d = cover(disc, x, y);
        if (d < 0.1) continue;
        const a = cover(arrow, x, y);
        const tone = d * (1 - a);
        if (tone < 0.08) continue;
        ctx.beginPath();
        ctx.arc(x + CELL / 2, y + CELL / 2, (CELL / 2) * Math.sqrt(tone) * DOT * 1.15, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, []);

  return <canvas ref={ref} aria-hidden style={{ width: SIZE, height: SIZE, transform: flip ? "scaleX(-1)" : undefined }} className={className} />;
}
