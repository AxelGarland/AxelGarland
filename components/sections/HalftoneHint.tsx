"use client";

import { useEffect, useRef, useState } from "react";

/** A short hint in halftone dots: the words, then a curved arrow sweeping up and to the right.
 *  Black dots with red at the edges, like the buttons, drawn once on a transparent canvas. It is
 *  decoration for a control that has its own label, so it is hidden from screen readers. Until the
 *  font has loaded the plain words stand in for it. */

const INK = "#1A1916";
const RED = "#D64040";
const FONT_PX = 17.5;
const TRACK = 2.3;
const CELL = 2;
const H = 64;
const GAP = 12;
const ARROW_W = 88;
const FONT_WAIT_MS = 2500;

function readFamily(): string {
  const body = getComputedStyle(document.body).getPropertyValue("--font-body").trim() || "sans-serif";
  return `${body}, sans-serif`;
}

export function HalftoneHint({ label, className = "" }: { label: string; className?: string }) {
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

      const text = label.toUpperCase();
      const probe = document.createElement("canvas").getContext("2d")!;
      probe.font = `800 ${FONT_PX}px ${family}`;
      const glyphs = [...text].map((ch) => probe.measureText(ch).width);
      const textW = glyphs.reduce((a, b) => a + b, 0) + TRACK * (glyphs.length - 1);
      const W = Math.ceil(textW + GAP + ARROW_W + 8);

      // 1. The words and the arrow as one solid mask.
      const mask = document.createElement("canvas");
      mask.width = W;
      mask.height = H;
      const m = mask.getContext("2d")!;
      m.fillStyle = "#000";
      m.strokeStyle = "#000";
      m.font = `800 ${FONT_PX}px ${family}`;
      let x = 2;
      const baseline = H * 0.64;
      [...text].forEach((ch, i) => {
        m.fillText(ch, x, baseline);
        x += glyphs[i] + TRACK;
      });

      const x0 = textW + GAP + 2;
      const end = { x: W - 6, y: H * 0.2 };
      const c1 = { x: x0 + ARROW_W * 0.3, y: H * 0.98 };
      const c2 = { x: x0 + ARROW_W * 0.78, y: H * 0.86 };
      m.lineWidth = 3.2;
      m.lineCap = "round";
      m.lineJoin = "round";
      m.beginPath();
      m.moveTo(x0, H * 0.58);
      m.bezierCurveTo(c1.x, c1.y, c2.x, c2.y, end.x, end.y);
      m.stroke();
      // The arrowhead: two strokes folded back from the tip, along the curve's last direction.
      const dir = Math.atan2(end.y - c2.y, end.x - c2.x);
      const head = 11;
      for (const turn of [0.5, -0.5]) {
        m.beginPath();
        m.moveTo(end.x, end.y);
        m.lineTo(end.x - head * Math.cos(dir + turn), end.y - head * Math.sin(dir + turn));
        m.stroke();
      }

      // 2. The mask as dots: each cell becomes a circle sized by how much of it is covered.
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      const ctx = canvas.getContext("2d")!;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      const data = m.getImageData(0, 0, W, H).data;
      for (let y = 0; y < H; y += CELL) {
        for (let xx = 0; xx < W; xx += CELL) {
          let sum = 0;
          let n = 0;
          for (let py = Math.floor(y); py < Math.min(H, Math.floor(y + CELL)); py++) {
            for (let px = Math.floor(xx); px < Math.min(W, Math.floor(xx + CELL)); px++) {
              sum += data[(py * W + px) * 4 + 3];
              n++;
            }
          }
          const cov = n ? sum / n / 255 : 0;
          if (cov < 0.12) continue;
          ctx.fillStyle = cov > 0.55 ? INK : RED;
          ctx.beginPath();
          ctx.arc(xx + CELL / 2, y + CELL / 2, (CELL / 2) * Math.sqrt(cov) * 1.1, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      setWidth(W);
    })();
    return () => {
      cancelled = true;
    };
  }, [label]);

  const ready = width !== null;
  return (
    <div aria-hidden className={`relative ${className}`} style={{ width: width ?? 160, height: H }}>
      <span
        className={`absolute left-0 top-[34px] text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-opacity duration-300 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        {label}
      </span>
      <canvas
        ref={canvasRef}
        style={{ width: width ?? 0, height: H }}
        className={`absolute inset-0 transition-opacity duration-300 ${ready ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
