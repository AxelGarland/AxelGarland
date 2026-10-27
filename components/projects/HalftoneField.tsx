"use client";

import { useEffect, useRef } from "react";

/** A field of halftone dots behind its parent's content. At rest the dots are small and dark; the
 *  pointer swells the ones near it and turns them red, and its position is eased so the dots trail it.
 *  It listens on the parent, so the content on top of it passes pointer events straight through. Draws
 *  only while something is moving, and not at all while off screen. With reduced motion, or on a screen
 *  with no pointer to follow, it is a still field. */

const SPACING = 20;
const BASE_R = 1.5;
const MAX_R = 7.2;
const REACH = 190;
const BASE = [36, 36, 38] as const;
const HOT = [214, 64, 64] as const;

export function HalftoneField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = canvas?.parentElement;
    if (!canvas || !host) return;
    const ctx = canvas.getContext("2d")!;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let W = 0;
    let H = 0;
    let raf = 0;
    let visible = true;
    // Where the pointer is, and where the glow has eased to; `strength` fades the glow in and out.
    const target = { x: -9999, y: -9999, on: false };
    const glow = { x: -9999, y: -9999, strength: 0 };

    const resize = () => {
      const r = host.getBoundingClientRect();
      W = Math.round(r.width);
      H = Math.round(r.height);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const s = glow.strength;
      const reach2 = REACH * REACH;
      for (let y = SPACING / 2; y < H; y += SPACING) {
        for (let x = SPACING / 2; x < W; x += SPACING) {
          let t = 0;
          if (s > 0.01) {
            const dx = x - glow.x;
            const dy = y - glow.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < reach2) t = (1 - Math.sqrt(d2) / REACH) ** 2 * s;
          }
          const r = BASE_R + (MAX_R - BASE_R) * t;
          const c = BASE.map((b, i) => Math.round(b + (HOT[i] - b) * Math.min(1, t * 1.4)));
          ctx.fillStyle = `rgb(${c[0]},${c[1]},${c[2]})`;
          ctx.beginPath();
          ctx.arc(x, y, r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const tick = () => {
      raf = 0;
      const k = 0.16;
      glow.x += (target.x - glow.x) * k;
      glow.y += (target.y - glow.y) * k;
      glow.strength += ((target.on ? 1 : 0) - glow.strength) * 0.14;
      draw();
      const settled =
        Math.abs(target.x - glow.x) < 0.5 && Math.abs(target.y - glow.y) < 0.5 && Math.abs((target.on ? 1 : 0) - glow.strength) < 0.01;
      if (!settled && visible) raf = requestAnimationFrame(tick);
    };
    const kick = () => {
      if (!raf && visible) raf = requestAnimationFrame(tick);
    };

    const move = (e: PointerEvent) => {
      const r = host.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      if (!target.on) {
        // Come in where the pointer is, rather than sliding in from wherever it last was.
        glow.x = x;
        glow.y = y;
      }
      target.x = x;
      target.y = y;
      target.on = true;
      kick();
    };
    const leave = () => {
      target.on = false;
      kick();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) kick();
    });
    io.observe(host);
    if (!still) {
      host.addEventListener("pointermove", move);
      host.addEventListener("pointerleave", leave);
      host.addEventListener("pointercancel", leave);
    }
    resize();

    return () => {
      ro.disconnect();
      io.disconnect();
      host.removeEventListener("pointermove", move);
      host.removeEventListener("pointerleave", leave);
      host.removeEventListener("pointercancel", leave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />;
}
