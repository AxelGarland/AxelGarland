"use client";

import { useEffect, useRef } from "react";

/** A canvas laid over a picture that shows it as the halftone of the hero portrait: round dots on
 *  white, bigger where the picture is darker, ink-black in the shadows and red in the mid-tones. When
 *  `sharp` turns true the dots give way straight to the real picture underneath, and they come back
 *  when it turns false. It does nothing on touch screens or with reduced motion: there is no hover to
 *  reveal the picture, so it stays clear. `src` is loaded at the size the page already fetches for
 *  this grid, and the picture is fitted into the box the way `object-fit` would. */

const CELL = 6;

const INK = [26, 25, 22] as const;
const RED = [214, 64, 64] as const;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

type Fit = "cover" | "contain";
type Cell = { dot: number; l: number };

export function PixelatedPicture({
  src,
  fit = "cover",
  position = "50% 50%",
  backdrop,
  sharp,
}: {
  src: string;
  fit?: Fit;
  position?: string;
  backdrop?: string;
  sharp: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hover = useRef(false);
  hover.current = sharp;
  const s = useRef({ raf: 0, enabled: false, cells: [] as Cell[], cols: 0, rows: 0, img: null as HTMLImageElement | null });

  /** Average the picture into a grid of cells, one per CELL pixels of the box. */
  const sample = (cols: number, rows: number) => {
    const { img } = s.current;
    const canvas = canvasRef.current;
    if (!img || !canvas) return;
    const W = cols;
    const H = rows;
    const [px, py] = position.split(" ").map((v) => parseFloat(v) / 100);
    const ir = img.naturalWidth / img.naturalHeight;
    const br = W / H;
    let dx = 0, dy = 0, dw = W, dh = H, sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
    if (fit === "cover") {
      if (ir > br) {
        sw = img.naturalHeight * br;
        sx = (img.naturalWidth - sw) * px;
      } else {
        sh = img.naturalWidth / br;
        sy = (img.naturalHeight - sh) * py;
      }
    } else if (ir > br) {
      dh = W / ir;
      dy = (H - dh) * py;
    } else {
      dw = H * ir;
      dx = (W - dw) * px;
    }
    const small = document.createElement("canvas");
    small.width = cols;
    small.height = rows;
    const c = small.getContext("2d", { willReadFrequently: true })!;
    c.fillStyle = backdrop ?? "#fff";
    c.fillRect(0, 0, cols, rows);
    c.imageSmoothingQuality = "high";
    c.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
    const d = c.getImageData(0, 0, cols, rows).data;
    const cells: Cell[] = [];
    for (let i = 0; i < cols * rows; i++) {
      const l = (0.2126 * d[i * 4] + 0.7152 * d[i * 4 + 1] + 0.0722 * d[i * 4 + 2]) / 255;
      cells.push({ dot: l > 0.9 ? 0 : clamp01(0.18 + (1 - l) * 1.05), l });
    }
    s.current.cells = cells;
    s.current.cols = cols;
    s.current.rows = rows;
  };

  /** One frame of the halftone at time `t` (seconds). The dots breathe in size in a slow wave that
   *  travels across the picture, drift a fraction of a cell, and the ones near the ink/red boundary
   *  swap colour as the wave passes, so the picture shimmers without ever changing shape. */
  const draw = (t = 0) => {
    const canvas = canvasRef.current;
    const { cells, cols, rows } = s.current;
    if (!canvas || !cells.length) return;
    const ctx = canvas.getContext("2d")!;
    const W = canvas.width;
    const H = canvas.height;
    const cw = W / cols;
    const ch = H / rows;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, W, H);
    const ink = new Path2D();
    const red = new Path2D();
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const c = cells[y * cols + x];
        if (c.dot === 0) continue;
        const wave = Math.sin(t * 1.5 + x * 0.32 + y * 0.24);
        const radius = (c.dot * cw * 1.08 * (1 + 0.16 * wave)) / 2;
        if (radius < 0.2) continue;
        const cx = x * cw + cw / 2 + Math.sin(t * 0.9 + y * 0.5) * cw * 0.12;
        const cy = y * ch + ch / 2 + Math.cos(t * 0.8 + x * 0.45) * ch * 0.12;
        const path = c.l < 0.4 + 0.045 * wave ? ink : red;
        path.moveTo(cx + radius, cy);
        path.arc(cx, cy, radius, 0, Math.PI * 2);
      }
    }
    ctx.fillStyle = `rgb(${INK[0]},${INK[1]},${INK[2]})`;
    ctx.fill(ink);
    ctx.fillStyle = `rgb(${RED[0]},${RED[1]},${RED[2]})`;
    ctx.fill(red);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const st = s.current;
    st.enabled =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!st.enabled) {
      canvas.style.display = "none";
      return;
    }
    const layout = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      sample(Math.max(1, Math.round(r.width / CELL)), Math.max(1, Math.round(r.height / CELL)));
      draw();
    };
    // Redraw at about 20 frames a second, only while the picture is on screen and the dots are showing.
    let visible = false;
    let last = 0;
    const loop = (now: number) => {
      st.raf = requestAnimationFrame(loop);
      if (now - last < 48) return;
      last = now;
      if (!hover.current) draw(now / 1000);
    };
    const play = () => {
      if (visible && st.img && !st.raf) st.raf = requestAnimationFrame(loop);
    };
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) play();
      else {
        cancelAnimationFrame(st.raf);
        st.raf = 0;
      }
    });
    io.observe(canvas);
    const img = new Image();
    img.onload = () => {
      st.img = img;
      layout();
      play();
    };
    img.src = src;
    const ro = new ResizeObserver(() => st.img && layout());
    ro.observe(canvas);
    return () => {
      ro.disconnect();
      io.disconnect();
      cancelAnimationFrame(st.raf);
      st.raf = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // The dots go away straight to the picture on hover, and come back when it ends.
  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ opacity: sharp ? 0 : 1 }}
      className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-200 ease-out"
    />
  );
}
