"use client";

import { useEffect, useRef, useState } from "react";

/** A single word set in white halftone dots, for use on black. Drawn once, once the font has loaded. The real heading stays in the page: it is
 *  what shows before the font loads and what screen readers read. */

const WHITE = "#FFFFFF";
const FONT_WAIT_MS = 2500;
const H = 150;
const SIZE = 150;

function readFamily(): string {
  const body = getComputedStyle(document.body).getPropertyValue("--font-body").trim() || "sans-serif";
  return `${body}, sans-serif`;
}

export function HalftoneTitle({ text, className = "" }: { text: string; className?: string }) {
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

      const word = text.toUpperCase();
      const probe = document.createElement("canvas").getContext("2d")!;
      probe.font = `800 ${SIZE}px ${family}`;
      const W = Math.ceil(probe.measureText(word).width + 24);

      const mask = document.createElement("canvas");
      mask.width = W;
      mask.height = H;
      const m = mask.getContext("2d")!;
      m.font = `800 ${SIZE}px ${family}`;
      m.fillStyle = "#000";
      m.fillText(word, 12, H * 0.86);
      const data = m.getImageData(0, 0, W, H).data;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      const ctx = canvas.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const cell = Math.max(2.4, SIZE * 0.062);
      for (let y = 0; y < H; y += cell) {
        for (let x = 0; x < W; x += cell) {
          let sum = 0;
          let n = 0;
          for (let yy = Math.floor(y); yy < Math.min(H, Math.floor(y + cell)); yy++) {
            for (let xx = Math.floor(x); xx < Math.min(W, Math.floor(x + cell)); xx++) {
              sum += data[(yy * W + xx) * 4 + 3];
              n++;
            }
          }
          const cov = n ? sum / n / 255 : 0;
          if (cov < 0.1) continue;
          ctx.fillStyle = WHITE;
          ctx.beginPath();
          ctx.arc(x + cell / 2, y + cell / 2, (cell / 2) * Math.sqrt(cov) * 1.08, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      setSize({ w: W });
    })();
    return () => {
      cancelled = true;
    };
  }, [text]);

  const ready = size !== null;
  return (
    <div className={`relative mx-auto ${className}`} style={{ width: size?.w ?? 360, maxWidth: "88%", aspectRatio: `${size?.w ?? 360} / ${H}` }}>
      <h1
        className={`absolute inset-0 flex items-center justify-center font-display text-[clamp(3rem,10vw,6.5rem)] font-light leading-none tracking-tight text-white transition-opacity duration-300 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        {text}
      </h1>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
