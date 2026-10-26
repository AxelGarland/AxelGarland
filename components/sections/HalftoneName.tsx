"use client";

import { useEffect, useRef, useState } from "react";

/** "AXEL / GARLAND" set in halftone dots: black where the letters are solid, red at the edges.
 *  It is drawn once, sized to fill the width of its column, and drawn again if that width changes,
 *  so it is static. The real heading stays in the page: it is what shows before the font has
 *  loaded, and what screen readers read. */

const LINES = ["AXEL", "GARLAND"] as const;
const INK = "#1A1916";
const RED = "#D64040";
const FONT_WAIT_MS = 2500;
/** Height of the block as a share of its width, for the two lines at this weight. */
const ASPECT = 0.5;

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

  // 1. The words as a solid mask. The widest line is fitted to the width, leaving room for the
  //    dots that spill a little past the letter edges, so nothing is clipped at the right.
  const mask = document.createElement("canvas");
  mask.width = Math.ceil(W);
  mask.height = Math.ceil(H);
  const m = mask.getContext("2d")!;
  const widest = (s: number) => {
    m.font = `800 ${s}px ${family}`;
    return Math.max(...LINES.map((l) => m.measureText(l).width));
  };
  let size = H / 2.2;
  const room = W * 0.985;
  if (widest(size) > room) size = (size * room) / widest(size);
  const lineH = size * 1.0;
  const top = (H - (lineH * (LINES.length - 1) + size * 0.72)) / 2;
  m.font = `800 ${size}px ${family}`;
  m.fillStyle = "#000";
  LINES.forEach((l, i) => m.fillText(l, 0, top + size * 0.72 + i * lineH));

  // 2. Rebuild the mask as dots: each cell becomes a circle sized by how much of it is covered.
  const data = m.getImageData(0, 0, mask.width, mask.height).data;
  const cell = Math.max(2.4, size * 0.062);
  for (let y = 0; y < H; y += cell) {
    for (let x = 0; x < W; x += cell) {
      let sum = 0;
      let n = 0;
      for (let yy = Math.floor(y); yy < Math.min(mask.height, Math.floor(y + cell)); yy++) {
        for (let xx = Math.floor(x); xx < Math.min(mask.width, Math.floor(x + cell)); xx++) {
          sum += data[(yy * mask.width + xx) * 4 + 3];
          n++;
        }
      }
      const cov = n ? sum / n / 255 : 0;
      if (cov < 0.1) continue;
      ctx.fillStyle = cov > 0.55 ? INK : RED;
      ctx.beginPath();
      ctx.arc(x + cell / 2, y + cell / 2, (cell / 2) * Math.sqrt(cov) * 1.08, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export function HalftoneName() {
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
        if (W < 120 || H < 40 || W === lastW) return;
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
    <div ref={wrapRef} className="relative w-[90%] max-w-[36rem]" style={{ aspectRatio: `1 / ${ASPECT}` }}>
      <h1
        className={`absolute inset-0 flex flex-col justify-center font-display text-[clamp(2.73rem,9.36vw,5.85rem)] font-light leading-[0.9] tracking-[-0.03em] text-ink transition-opacity duration-300 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <span>Axel</span>
        <span>Garland</span>
      </h1>
      <canvas
        ref={canvasRef}
        aria-hidden
        className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
