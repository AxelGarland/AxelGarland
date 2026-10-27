"use client";

import { useEffect, useRef } from "react";

/** A canvas laid over a picture that shows it in coarse blocks, and sharpens it to the real picture
 *  when `sharp` turns true (and blocks it up again when it turns false). The blocks shrink and grow
 *  over a few hundred milliseconds. It does nothing on touch screens or with reduced motion: there
 *  is no hover to reveal the picture, so it stays clear. `src` is loaded at the size the page already
 *  fetches for this grid, and the picture is fitted into the box the same way `object-fit` would. */

const REST_BLOCK = 6;
const DURATION = 520;

type Fit = "cover" | "contain";

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
  const state = useRef({ block: REST_BLOCK, to: REST_BLOCK, raf: 0, img: null as HTMLImageElement | null, enabled: false });

  const draw = (block: number) => {
    const canvas = canvasRef.current;
    const { img } = state.current;
    if (!canvas || !img) return;
    const W = canvas.width;
    const H = canvas.height;
    const ctx = canvas.getContext("2d")!;
    const [px, py] = position.split(" ").map((v) => parseFloat(v) / 100);
    const ir = img.naturalWidth / img.naturalHeight;
    const br = W / H;
    // The rectangle of the box the picture occupies, and the part of the picture shown in it.
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
    ctx.clearRect(0, 0, W, H);
    if (backdrop) {
      ctx.fillStyle = backdrop;
      ctx.fillRect(0, 0, W, H);
    }
    const cw = Math.max(1, Math.round(dw / block));
    const ch = Math.max(1, Math.round(dh / block));
    const small = document.createElement("canvas");
    small.width = cw;
    small.height = ch;
    small.getContext("2d")!.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(small, 0, 0, cw, ch, dx, dy, dw, dh);
  };

  // Set up: only where hovering exists and motion is allowed.
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const s = state.current;
    s.enabled =
      window.matchMedia("(hover: hover) and (pointer: fine)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!s.enabled) return;

    const fitSize = () => {
      const r = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      draw(s.block * dpr);
    };
    const img = new Image();
    img.onload = () => {
      s.img = img;
      fitSize();
      canvas.style.opacity = s.block <= 1 ? "0" : "1";
    };
    img.src = src;
    const ro = new ResizeObserver(() => s.img && fitSize());
    ro.observe(canvas);
    return () => {
      ro.disconnect();
      cancelAnimationFrame(s.raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // Sharpen or block up when `sharp` changes.
  useEffect(() => {
    const canvas = canvasRef.current;
    const s = state.current;
    if (!canvas || !s.enabled) return;
    const from = s.block;
    const to = sharp ? 1 : REST_BLOCK;
    s.to = to;
    if (from === to) return;
    cancelAnimationFrame(s.raf);
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / DURATION);
      const e = 1 - (1 - t) ** 3;
      // Interpolate the block size geometrically, so it changes evenly to the eye.
      s.block = from * (to / from) ** e;
      const dpr = canvas.width / Math.max(1, canvas.getBoundingClientRect().width);
      draw(s.block * dpr);
      canvas.style.opacity = s.block <= 1.05 && to === 1 ? "0" : "1";
      if (t < 1) s.raf = requestAnimationFrame(step);
      else s.block = to;
    };
    canvas.style.opacity = "1";
    s.raf = requestAnimationFrame(step);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sharp]);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full transition-none" />;
}
