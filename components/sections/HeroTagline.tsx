"use client";

import { heroClock, heroClockIsLive } from "@/lib/heroClock";
import { buildTimeline, clamp01, hash, smooth } from "@/lib/portraitSketch";
import { useEffect, useRef, useState } from "react";

/** "Designer · Illustrator · Creator" as a rectangle that changes style in step with the portrait.
 *  It reads the portrait animation's clock, so the pixelation, the yellow duotone, the halftone dots
 *  and the pop colours all land on the same beat. Until the animation is running (and for visitors
 *  who prefer reduced motion) it simply shows the plain, readable line. */

const WORDS = ["Designer", "Illustrator", "Creator"] as const;
const PLAIN = WORDS.join(" · ");
const INK = "#1A1916";
const MUTED = "#5C5A54";
const RED = "#D64040";
const YELLOW = "#FFB627";
const PURPLE = "#7B4FE0";
const PINK = "#EF2F7B";
const POP_YELLOW = "#FFD400";

type Fonts = { body: string; display: string };
type Layers = { crisp: HTMLCanvasElement[]; mosaic: HTMLCanvasElement; levels: HTMLCanvasElement[] };
type LineOptions = { font: (s: number) => string; upper: boolean; size: number; text: string; sep: string; pad: number };

const make = (w: number, h: number): HTMLCanvasElement => {
  const c = document.createElement("canvas");
  c.width = Math.max(1, Math.round(w));
  c.height = Math.max(1, Math.round(h));
  return c;
};

function drawLine(ctx: CanvasRenderingContext2D, W: number, H: number, o: LineOptions) {
  const words = o.upper ? WORDS.map((w) => w.toUpperCase()) : [...WORDS];
  const measure = (s: number) => {
    ctx.font = o.font(s);
    const ws = words.map((w) => ctx.measureText(w).width);
    const gap = s * 1.05;
    return { ws, gap, total: ws.reduce((a, b) => a + b, 0) + gap * (words.length - 1) };
  };
  let s = o.size;
  let m = measure(s);
  const maxW = W - 2 * o.pad;
  if (m.total > maxW) {
    s = (s * maxW) / m.total;
    m = measure(s);
  }
  const baseline = H / 2 + s * 0.3;
  let x = (W - m.total) / 2;
  ctx.textBaseline = "alphabetic";
  words.forEach((w, i) => {
    ctx.fillStyle = o.text;
    ctx.fillText(w, x, baseline);
    x += m.ws[i];
    if (i < words.length - 1) {
      ctx.fillStyle = o.sep;
      ctx.beginPath();
      ctx.arc(x + m.gap / 2, baseline - s * 0.27, Math.max(1.6, s * 0.075), 0, Math.PI * 2);
      ctx.fill();
      x += m.gap;
    }
  });
}

/** Average the layer down to a coarse grid and scale it back up with hard edges. */
function pixelate(src: HTMLCanvasElement, blockCss: number, dpr: number): HTMLCanvasElement {
  const out = make(src.width, src.height);
  const small = make(Math.ceil(src.width / (blockCss * dpr)), Math.ceil(src.height / (blockCss * dpr)));
  const sctx = small.getContext("2d")!;
  sctx.imageSmoothingEnabled = true;
  sctx.drawImage(src, 0, 0, small.width, small.height);
  const octx = out.getContext("2d")!;
  octx.imageSmoothingEnabled = false;
  octx.drawImage(small, 0, 0, out.width, out.height);
  return out;
}

function buildLayers(W: number, H: number, dpr: number, f: Fonts): Layers {
  const layer = (paint: (ctx: CanvasRenderingContext2D) => void) => {
    const c = make(W * dpr, H * dpr);
    const ctx = c.getContext("2d")!;
    ctx.scale(dpr, dpr);
    paint(ctx);
    return c;
  };
  const size = H * 0.36;
  const pad = H * 0.42;

  // 0. The plain line: white, a hairline outline, muted text, red dots between the words.
  const plain = layer((ctx) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, W, H);
    ctx.strokeStyle = "rgba(26,25,22,0.14)";
    ctx.lineWidth = 1;
    ctx.strokeRect(0.5, 0.5, W - 1, H - 1);
    drawLine(ctx, W, H, { font: (s) => `500 ${s}px ${f.body}`, upper: false, size, text: MUTED, sep: RED, pad });
  });

  // 1. Duotone: the site's yellow with ink capitals.
  const duotone = layer((ctx) => {
    ctx.fillStyle = YELLOW;
    ctx.fillRect(0, 0, W, H);
    drawLine(ctx, W, H, { font: (s) => `700 ${s}px ${f.body}`, upper: true, size: size * 0.86, text: INK, sep: INK, pad });
  });

  // 2. Halftone: the same capitals rebuilt out of round dots, black where solid, red at the edges.
  const halftone = layer((ctx) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, W, H);
    const mask = make(Math.ceil(W), Math.ceil(H));
    const mctx = mask.getContext("2d")!;
    drawLine(mctx, W, H, { font: (s) => `800 ${s}px ${f.body}`, upper: true, size: size * 0.9, text: "#000", sep: "#000", pad });
    const data = mctx.getImageData(0, 0, mask.width, mask.height).data;
    const cell = Math.max(2.2, H / 30);
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
  });

  // 3. Pop: purple with yellow italic display type and pink dots, like the faces in Kindred.
  const pop = layer((ctx) => {
    ctx.fillStyle = PURPLE;
    ctx.fillRect(0, 0, W, H);
    drawLine(ctx, W, H, { font: (s) => `italic 600 ${s}px ${f.display}`, upper: false, size: size * 1.28, text: POP_YELLOW, sep: PINK, pad });
  });

  // The pixelated frames are built from a heavier, darker copy of the line, so the words survive
  // being averaged into blocks and still read as pixel type.
  const heavy = layer((ctx) => {
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, W, H);
    drawLine(ctx, W, H, { font: (s) => `800 ${s}px ${f.body}`, upper: false, size: size * 1.02, text: INK, sep: RED, pad });
  });
  const levels = [H / 30, H / 22, H / 16].map((b) => pixelate(heavy, b, dpr));
  return { crisp: [plain, duotone, halftone, pop], mosaic: pixelate(heavy, H / 12, dpr), levels };
}

export function HeroTagline() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const { segments } = buildTimeline();

    let layers: Layers | null = null;
    let W = 0;
    let H = 0;
    let dpr = 1;
    let fonts: Fonts | null = null;
    let raf = 0;
    let cancelled = false;
    let lastKey = "";

    const readFonts = (): Fonts => {
      const cs = getComputedStyle(document.body);
      const body = cs.getPropertyValue("--font-body").trim() || "sans-serif";
      const display = cs.getPropertyValue("--font-display").trim() || "serif";
      return { body: `${body}, sans-serif`, display: `${display}, serif` };
    };

    const rebuild = () => {
      if (!fonts) return;
      const r = wrap.getBoundingClientRect();
      W = Math.round(r.width);
      H = Math.round(r.height);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      if (W < 40 || H < 20) return;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      layers = buildLayers(W, H, dpr, fonts);
      lastKey = "";
    };

    const draw = () => {
      if (!layers) return;
      const ctx = canvas.getContext("2d")!;
      const live = !reduce && heroClockIsLive();
      const t = live ? heroClock.t : 0;
      const key = `${W}x${H}:${live ? t.toFixed(3) : "rest"}`;
      if (key === lastKey) return;
      lastKey = key;
      ctx.imageSmoothingEnabled = false;
      const blit = (src: HTMLCanvasElement) => ctx.drawImage(src, 0, 0);
      if (!live) {
        blit(layers.crisp[0]);
        return;
      }
      const seg = segments.find((s) => t >= s.start && t < s.end) ?? segments[0];
      if (seg.kind === "photo") return blit(layers.crisp[0]);
      if (seg.kind === "level") return blit(layers.levels[seg.level]);
      const source = (style: number) => (style === 0 ? layers!.mosaic : layers!.crisp[style]);
      if (seg.from === seg.to) return blit(source(seg.to));

      // A morph: the rectangle is cut into blocks that flip from the old style to the new one,
      // sweeping across in the same direction and on the same beat as the portrait.
      const prog = (t - seg.start) / (seg.end - seg.start);
      const cellCss = H / 6;
      const cols = Math.max(1, Math.round(W / cellCss));
      const rows = 6;
      const cw = canvas.width / cols;
      const ch = canvas.height / rows;
      const spread = 0.55;
      blit(source(seg.from));
      const to = source(seg.to);
      for (let cy = 0; cy < rows; cy++) {
        for (let cx = 0; cx < cols; cx++) {
          const along = seg.sweep % 2 === 0 ? cx / cols : 1 - cx / cols;
          const d = clamp01(along * 0.82 + hash(cy * cols + cx) * 0.18);
          if (smooth(clamp01(prog * (1 + spread) - d * spread)) > 0.5) {
            const sx = Math.floor(cx * cw);
            const sy = Math.floor(cy * ch);
            const sw = Math.ceil((cx + 1) * cw) - sx;
            const sh = Math.ceil((cy + 1) * ch) - sy;
            ctx.drawImage(to, sx, sy, sw, sh, sx, sy, sw, sh);
          }
        }
      }
    };

    const loop = () => {
      draw();
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(() => {
      rebuild();
      draw();
    });

    void (async () => {
      const f = readFonts();
      try {
        await Promise.all([
          document.fonts.load(`500 20px ${f.body}`),
          document.fonts.load(`700 20px ${f.body}`),
          document.fonts.load(`800 20px ${f.body}`),
          document.fonts.load(`italic 600 20px ${f.display}`),
        ]);
      } catch {
        // Fall back to whatever the browser has; the canvas still draws.
      }
      if (cancelled) return;
      fonts = f;
      rebuild();
      if (!layers) return;
      draw();
      setReady(true);
      ro.observe(wrap);
      if (!reduce) raf = requestAnimationFrame(loop);
    })();

    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[4.5rem] w-full max-w-[27rem] sm:h-[5rem]">
      {/* The readable line is always in the page; once the canvas is drawing it is hidden visually
          but stays for screen readers and for anyone whose browser can't run the canvas. */}
      <p
        className={`absolute inset-0 flex items-center justify-center border border-line text-lg text-ink-muted transition-opacity duration-300 sm:text-xl ${
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
