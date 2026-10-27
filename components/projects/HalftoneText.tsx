"use client";

import { useEffect, useRef, useState } from "react";

/** A single line of text set in white halftone dots, for use on black. Like the header logo it is
 *  drawn once at a fixed size, so it is static. The real text stays in the page: it shows until the
 *  font has loaded and is what screen readers read. */

const FONT_PX = 26;
const CELL = 2.3;
const H = 34;
const FONT_WAIT_MS = 2500;

function readFamily(): string {
  const body = getComputedStyle(document.body).getPropertyValue("--font-body").trim() || "sans-serif";
  return `${body}, sans-serif`;
}

export function HalftoneText({ text }: { text: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState<number | null>(null);

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
      const W = Math.ceil(m.measureText(text.toUpperCase()).width) + 4;
      mask.width = W;
      mask.height = H;
      m.font = `800 ${FONT_PX}px ${family}`;
      m.fillStyle = "#000";
      m.fillText(text.toUpperCase(), 1, H / 2 + FONT_PX * 0.36);
      const data = m.getImageData(0, 0, W, H).data;

      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      const ctx = canvas.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#fff";
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
          ctx.beginPath();
          ctx.arc(x + CELL / 2, y + CELL / 2, (CELL / 2) * Math.sqrt(cov) * 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      setWidth(W);
    })();
    return () => {
      cancelled = true;
    };
  }, [text]);

  const ready = width !== null;
  return (
    <span className="relative inline-block align-middle" style={{ width: width ?? undefined, height: H }}>
      <span
        className={`flex h-full items-center whitespace-nowrap font-display text-xl font-extrabold uppercase tracking-tight text-white transition-opacity duration-300 ${
          ready ? "absolute inset-0 opacity-0" : "opacity-100"
        }`}
      >
        {text}
      </span>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </span>
  );
}
