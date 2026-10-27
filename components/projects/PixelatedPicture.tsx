"use client";

import { useEffect, useRef } from "react";

/** A canvas laid over a picture that shows it in coarse blocks under a dark veil. It is invisible
 *  until `dimmed` turns true, then fades in over the picture, and fades out again when it turns
 *  false. It does nothing on touch screens or with reduced motion, where there is no hover to trigger
 *  it. `src` is loaded at the size the page already fetches for this grid, and the picture is fitted
 *  into the box the way `object-fit` would. */

const CELL = 12;
const VEIL = 0.62;

type Fit = "cover" | "contain";

export function PixelatedPicture({
  src,
  fit = "cover",
  position = "50% 50%",
  backdrop,
  dimmed,
}: {
  src: string;
  fit?: Fit;
  position?: string;
  backdrop?: string;
  dimmed: boolean;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const enabled =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!enabled) {
      canvas.style.display = "none";
      return;
    }
    let img: HTMLImageElement | null = null;

    const paint = () => {
      if (!img) return;
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const W = Math.max(1, Math.round(r.width * dpr));
      const H = Math.max(1, Math.round(r.height * dpr));
      canvas.width = W;
      canvas.height = H;
      const cols = Math.max(1, Math.round(r.width / CELL));
      const rows = Math.max(1, Math.round(r.height / CELL));
      const [px, py] = position.split(" ").map((v) => parseFloat(v) / 100);
      const ir = img.naturalWidth / img.naturalHeight;
      const br = cols / rows;
      // Where the picture sits in the grid, and the part of it that is shown, as object-fit would.
      let dx = 0, dy = 0, dw = cols, dh = rows, sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;
      if (fit === "cover") {
        if (ir > br) {
          sw = img.naturalHeight * br;
          sx = (img.naturalWidth - sw) * px;
        } else {
          sh = img.naturalWidth / br;
          sy = (img.naturalHeight - sh) * py;
        }
      } else if (ir > br) {
        dh = cols / ir;
        dy = (rows - dh) * py;
      } else {
        dw = rows * ir;
        dx = (cols - dw) * px;
      }
      const small = document.createElement("canvas");
      small.width = cols;
      small.height = rows;
      const c = small.getContext("2d")!;
      c.fillStyle = backdrop ?? "#fff";
      c.fillRect(0, 0, cols, rows);
      c.imageSmoothingQuality = "high";
      c.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(small, 0, 0, cols, rows, 0, 0, W, H);
      ctx.fillStyle = `rgba(0,0,0,${VEIL})`;
      ctx.fillRect(0, 0, W, H);
    };

    const image = new Image();
    image.onload = () => {
      img = image;
      paint();
    };
    image.src = src;
    const ro = new ResizeObserver(paint);
    ro.observe(canvas);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ opacity: dimmed ? 1 : 0 }}
      className="pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300 ease-out"
    />
  );
}
