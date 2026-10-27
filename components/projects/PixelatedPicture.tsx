"use client";

import { useEffect, useRef } from "react";

/** A canvas laid over a picture that shows it as the halftone of the hero portrait: round dots on
 *  white, bigger where the picture is darker, ink-black in the shadows and red in the mid-tones. It is
 *  invisible until `halftone` turns true, then fades in over the picture, and fades out again when it
 *  turns false. It does nothing on touch screens or with reduced motion, where there is no hover to
 *  trigger it. `src` is loaded at the size the page already fetches for this grid, and the picture is
 *  fitted into the box the way `object-fit` would. */

const CELL = 6;

const INK = [26, 25, 22] as const;
const RED = [214, 64, 64] as const;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

type Fit = "cover" | "contain";
type Cell = { r: number; g: number; b: number; dot: number; ink: boolean };

export function PixelatedPicture({
  src,
  fit = "cover",
  position = "50% 50%",
  backdrop,
  halftone,
}: {
  src: string;
  fit?: Fit;
  position?: string;
  backdrop?: string;
  halftone: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const s = useRef({ p: 0, raf: 0, enabled: false, cells: [] as Cell[], cols: 0, rows: 0, img: null as HTMLImageElement | null });

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
      const r = d[i * 4], g = d[i * 4 + 1], b = d[i * 4 + 2];
      const l = (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
      cells.push({ r, g, b, dot: l > 0.9 ? 0 : clamp01(0.18 + (1 - l) * 1.05), ink: l < 0.4 });
    }
    s.current.cells = cells;
    s.current.cols = cols;
    s.current.rows = rows;
  };

  const draw = () => {
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
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const c = cells[y * cols + x];
        const radius = (c.dot * cw * 1.08) / 2;
        if (radius < 0.2) continue;
        const base = c.ink ? INK : RED;
        ctx.fillStyle = `rgb(${base[0]},${base[1]},${base[2]})`;
        ctx.beginPath();
        ctx.arc(x * cw + cw / 2, y * ch + ch / 2, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    }
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
    const img = new Image();
    img.onload = () => {
      st.img = img;
      layout();
    };
    img.src = src;
    const ro = new ResizeObserver(() => st.img && layout());
    ro.observe(canvas);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(st.raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ opacity: halftone ? 1 : 0 }}
      className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-200 ease-out"
    />
  );
}
