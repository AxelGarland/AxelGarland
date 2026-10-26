"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

/** A call-to-action button drawn in halftone dots: black dots with red at the edges on white. On
 *  hover or keyboard focus the colours invert (white dots on black, red stays red). The words are
 *  drawn once into two canvases, one per state, and the page fades between them.
 *  The real label stays in the page as hidden text so screen readers and the keyboard work as usual. */

const INK = "#1A1916";
const RED = "#D64040";
const WHITE = "#FFFFFF";
const FONT_PX = 17.5;
const TRACK = 2.3;
const CELL = 2;
const H = 56;
const PAD = 24;
const FONT_WAIT_MS = 2500;

function readFamily(): string {
  const body = getComputedStyle(document.body).getPropertyValue("--font-body").trim() || "sans-serif";
  return `${body}, sans-serif`;
}

function dots(canvas: HTMLCanvasElement, mask: ImageData, W: number, dpr: number, fg: string, bg: string) {
  canvas.width = Math.round(W * dpr);
  canvas.height = Math.round(H * dpr);
  const ctx = canvas.getContext("2d")!;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, W, H);
  const data = mask.data;
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
      ctx.fillStyle = cov > 0.55 ? fg : RED;
      ctx.beginPath();
      ctx.arc(x + CELL / 2, y + CELL / 2, (CELL / 2) * Math.sqrt(cov) * 1.1, 0, Math.PI * 2);
      ctx.fill();
    }
  }
}

export function HalftoneButton({ href, label }: { href: string; label: string }) {
  const restRef = useRef<HTMLCanvasElement>(null);
  const hoverRef = useRef<HTMLCanvasElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useEffect(() => {
    const rest = restRef.current;
    const hover = hoverRef.current;
    if (!rest || !hover) return;
    let cancelled = false;
    void (async () => {
      const family = readFamily();
      const load = document.fonts.load(`800 20px ${family}`).catch(() => undefined);
      await Promise.race([load, new Promise((resolve) => setTimeout(resolve, FONT_WAIT_MS))]);
      if (cancelled) return;

      const text = label.toUpperCase();
      const probe = document.createElement("canvas").getContext("2d")!;
      probe.font = `800 ${FONT_PX}px ${family}`;
      const glyphs = [...text].map((ch) => probe.measureText(ch).width);
      const textW = glyphs.reduce((a, b) => a + b, 0) + TRACK * (glyphs.length - 1);
      const W = Math.ceil(PAD * 2 + textW);

      const maskCanvas = document.createElement("canvas");
      maskCanvas.width = W;
      maskCanvas.height = H;
      const m = maskCanvas.getContext("2d")!;
      m.fillStyle = "#000";

      // The words, letter by letter so the tracking is exact.
      m.font = `800 ${FONT_PX}px ${family}`;
      let x = PAD;
      const baseline = H / 2 + FONT_PX * 0.36;
      [...text].forEach((ch, i) => {
        m.fillText(ch, x, baseline);
        x += glyphs[i] + TRACK;
      });

      const mask = m.getImageData(0, 0, W, H);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      dots(rest, mask, W, dpr, INK, WHITE);
      dots(hover, mask, W, dpr, WHITE, INK);
      setWidth(W);
    })();
    return () => {
      cancelled = true;
    };
  }, [label]);

  const ready = width !== null;
  return (
    <Link
      href={href}
      className="group relative inline-block border border-ink align-top focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      style={{ width: (width ?? 270) + 2, height: H + 2 }}
    >
      <span
        className={`absolute inset-0 flex items-center justify-center text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-opacity duration-300 ${
          ready ? "sr-only" : "opacity-100"
        }`}
      >
        {label}
      </span>
      <canvas
        ref={restRef}
        aria-hidden
        style={{ width: width ?? 0, height: H }}
        className={`absolute inset-0 transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      />
      <canvas
        ref={hoverRef}
        aria-hidden
        style={{ width: width ?? 0, height: H }}
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
    </Link>
  );
}
