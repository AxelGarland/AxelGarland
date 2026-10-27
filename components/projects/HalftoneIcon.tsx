"use client";

import { useEffect, useRef } from "react";

/** A line icon drawn in halftone dots for use on black: white dots where the stroke is solid, red at its
 *  edges, like the site's other halftone marks. The icon is given as SVG path data on a 24 x 24 grid.
 *  Drawn once, so it is static. It is decoration: the text beside it carries the meaning. */

const WHITE = "#FFFFFF";
const RED = "#D64040";
const CELL = 2.4;

export function HalftoneIcon({ paths, size = 104, className = "" }: { paths: string[]; size?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    const ctx = canvas.getContext("2d")!;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, size, size);

    // The icon as a solid mask.
    const mask = document.createElement("canvas");
    mask.width = size;
    mask.height = size;
    const m = mask.getContext("2d")!;
    m.filter = "blur(1.6px)";
    m.scale(size / 24, size / 24);
    m.strokeStyle = "#000";
    m.lineWidth = 2.7;
    m.lineCap = "round";
    m.lineJoin = "round";
    for (const d of paths) m.stroke(new Path2D(d));
    const data = m.getImageData(0, 0, size, size).data;

    // Rebuilt as dots: each cell becomes a circle sized by how much of it is covered.
    for (let y = 0; y < size; y += CELL) {
      for (let x = 0; x < size; x += CELL) {
        let sum = 0;
        let n = 0;
        for (let yy = Math.floor(y); yy < Math.min(size, Math.floor(y + CELL)); yy++) {
          for (let xx = Math.floor(x); xx < Math.min(size, Math.floor(x + CELL)); xx++) {
            sum += data[(yy * size + xx) * 4 + 3];
            n++;
          }
        }
        const cov = n ? sum / n / 255 : 0;
        if (cov < 0.1) continue;
        ctx.fillStyle = cov > 0.8 ? WHITE : RED;
        ctx.beginPath();
        ctx.arc(x + CELL / 2, y + CELL / 2, (CELL / 2) * Math.sqrt(cov) * 1.12, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }, [paths, size]);

  return <canvas ref={ref} aria-hidden style={{ width: size, height: size }} className={className} />;
}
