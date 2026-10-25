"use client";

import { useEffect, useRef, useState } from "react";

/** "AXEL GARLAND" in halftone dots for the header: the same black-and-red dots as the big name on
 *  the home page, on one line at a fixed small size. It is drawn once, so it is static. The plain
 *  text stays in the page until the font has loaded and is what screen readers use. */

const TEXT = "AXEL GARLAND";
const INK = "#1A1916";
const RED = "#D64040";
const FONT_PX = 25;
const CELL = 2.3;
const H = 32;
const FONT_WAIT_MS = 2500;

function readFamily(): string {
  const body = getComputedStyle(document.body).getPropertyValue("--font-body").trim() || "sans-serif";
  return `${body}, sans-serif`;
}

export function HalftoneLogo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [size, setSize] = useState<{ w: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    void (async () => {
      const family = readFamily();
      const load = document.fonts.load(`800 20px ${family}`).catch(() => undefined);
      await Promise.race([load, new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS))]);
      if (cancelled) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const mask = document.createElement("canvas");
      const m = mask.getContext("2d")!;
      m.font = `800 ${FONT_PX}px ${family}`;
      const W = Math.ceil(m.measureText(TEXT).width) + 4;
      mask.width = W;
      mask.height = H;
      m.font = `800 ${FONT_PX}px ${family}`;
      m.fillStyle = "#000";
      m.fillText(TEXT, 1, H / 2 + FONT_PX * 0.36);
      const data = m.getImageData(0, 0, W, H).data;

      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      const ctx = canvas.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      for (let y = 0; y < H; y += CELL) {
        for (let x = 0; x < W; x += CELL) {
          let sum = 0;
          let n = 0;
          for (let yy = Math.floor(y); yy < Math.min(H, Math.floor(y + CELL)); yy++) {
            for (let xx = Math.floor(x); xx < Math.min(W, Math.floor(x + CELL)); xx++) {
              sum += data[(yy * W + xx) * 4 + 3];
              n++;
            }
          }
          const cov = n ? sum / n / 255 : 0;
          if (cov < 0.12) continue;
          ctx.fillStyle = cov > 0.55 ? INK : RED;
          ctx.beginPath();
          ctx.arc(x + CELL / 2, y + CELL / 2, (CELL / 2) * Math.sqrt(cov) * 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      setSize({ w: W });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <span className="relative inline-block align-middle" style={{ width: size?.w ?? 214, height: H }}>
      <span
        className={`absolute inset-0 flex items-center whitespace-nowrap font-display text-xl font-semibold tracking-tight text-ink transition-opacity duration-300 ${
          size ? "sr-only" : "opacity-100"
        }`}
      >
        Axel Garland
      </span>
      <canvas
        ref={canvasRef}
        aria-hidden
        style={{ width: size?.w ?? 0, height: H }}
        className={`absolute inset-0 transition-opacity duration-300 ${size ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}
