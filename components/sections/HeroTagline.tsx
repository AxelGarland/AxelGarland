"use client";

import { useEffect, useRef, useState } from "react";

/** "Designer · Illustrator · Creator" set in halftone dots: black where the letters are solid, red
 *  at the edges. It is drawn once (and again if the width changes), so it is static. The same
 *  words stay in the page as ordinary text for screen readers and for the moment before the fonts
 *  have loaded. */

const WORDS = ["DESIGNER", "ILLUSTRATOR", "CREATOR"] as const;
const PLAIN = "Designer · Illustrator · Creator";
const INK = "#1A1916";
const RED = "#D64040";
const FONT_WAIT_MS = 2500;

function readFamily(): string {
  const body = getComputedStyle(document.body).getPropertyValue("--font-body").trim() || "sans-serif";
  return `${body}, sans-serif`;
}

async function waitForFont(family: string) {
  const load = document.fonts.load(`800 20px ${family}`).catch(() => undefined);
  await Promise.race([load, new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS))]);
}

function draw(canvas: HTMLCanvasElement, W: number, H: number, dpr: number, family: string) {
  canvas.width = Math.round(W * dpr);
  canvas.height = Math.round(H * dpr);
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, W, H);

  // 1. The words, as a solid black mask, sized to fill the width and left-aligned.
  const mask = document.createElement("canvas");
  mask.width = Math.ceil(W);
  mask.height = Math.ceil(H);
  const mctx = mask.getContext("2d")!;
  const measure = (s: number) => {
    mctx.font = `800 ${s}px ${family}`;
    const ws = WORDS.map((w) => mctx.measureText(w).width);
    const gap = s * 1.05;
    return { ws, gap, total: ws.reduce((a, b) => a + b, 0) + gap * (WORDS.length - 1) };
  };
  let size = H * 0.72;
  let m = measure(size);
  if (m.total > W) {
    size = (size * W) / m.total;
    m = measure(size);
  }
  const baseline = H / 2 + size * 0.36;
  let x = 0;
  mctx.fillStyle = "#000";
  WORDS.forEach((w, i) => {
    mctx.fillText(w, x, baseline);
    x += m.ws[i];
    if (i < WORDS.length - 1) {
      mctx.beginPath();
      mctx.arc(x + m.gap / 2, baseline - size * 0.36, Math.max(1.8, size * 0.08), 0, Math.PI * 2);
      mctx.fill();
      x += m.gap;
    }
  });

  // 2. Rebuild the mask as dots: each cell becomes a circle sized by how much of it is covered.
  const data = mctx.getImageData(0, 0, mask.width, mask.height).data;
  const cell = Math.max(2.4, size * 0.13);
  for (let y = 0; y < H; y += cell) {
    for (let cx = 0; cx < W; cx += cell) {
      let sum = 0;
      let n = 0;
      for (let yy = Math.floor(y); yy < Math.min(mask.height, Math.floor(y + cell)); yy++) {
        for (let xx = Math.floor(cx); xx < Math.min(mask.width, Math.floor(cx + cell)); xx++) {
          sum += data[(yy * mask.width + xx) * 4 + 3];
          n++;
        }
      }
      const cov = n ? sum / n / 255 : 0;
      if (cov < 0.1) continue;
      ctx.fillStyle = cov > 0.55 ? INK : RED;
      ctx.beginPath();
      ctx.arc(cx + cell / 2, y + cell / 2, (cell / 2) * Math.sqrt(cov) * 1.08, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export function HeroTagline() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    let cancelled = false;
    let ro: ResizeObserver | null = null;
    let lastW = 0;

    void (async () => {
      const family = readFamily();
      await waitForFont(family);
      if (cancelled) return;
      const paint = () => {
        const r = wrap.getBoundingClientRect();
        const W = Math.round(r.width);
        const H = Math.round(r.height);
        if (W < 60 || H < 16 || W === lastW) return;
        lastW = W;
        draw(canvas, W, H, Math.min(window.devicePixelRatio || 1, 2), family);
        setReady(true);
      };
      paint();
      ro = new ResizeObserver(paint);
      ro.observe(wrap);
    })();

    return () => {
      cancelled = true;
      ro?.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[3.25rem] w-full max-w-[34rem] sm:h-[3.75rem]">
      <p
        className={`absolute inset-0 flex items-center text-xl font-extrabold uppercase tracking-[0.02em] text-ink transition-opacity duration-300 sm:text-2xl ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        {PLAIN}
      </p>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
