"use client";

import { useEffect, useRef } from "react";

/** White stars on the work section's black, in three depth layers, plus a few small four-point
 *  sparkles. They drift a pixel or two per second, twinkle, and shift a little as the page scrolls.
 *  The canvas stops when it is off screen or the tab is hidden, and draws one still frame under
 *  reduced motion. */

type Star = { x: number; y: number; layer: 0 | 1 | 2; phase: number; speed: number; spark: boolean };

/** Per layer: radius (css px), peak opacity, drift (css px / s), scroll parallax factor. */
const LAYERS = [
  { r: 0.9, a: 0.55, drift: 1.2, par: 0.03 },
  { r: 1.3, a: 0.8, drift: 2.2, par: 0.07 },
  { r: 1.9, a: 1, drift: 3.6, par: 0.12 },
] as const;

/** Deterministic, so every load places the same stars. */
function rng(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function StarCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const host = canvas.parentElement as HTMLElement;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    let w = 0;
    let h = 0;
    let dpr = 1;
    let stars: Star[] = [];
    let raf = 0;
    let visible = false;
    let last = 0;
    let t = 0;

    const build = () => {
      const rand = rng(20261113);
      const count = Math.round(Math.min(230, Math.max(70, (w * h) / 21000)));
      stars = Array.from({ length: count }, () => {
        const roll = rand();
        return {
          x: rand() * w,
          y: rand() * h,
          layer: (roll < 0.58 ? 0 : roll < 0.88 ? 1 : 2) as 0 | 1 | 2,
          phase: rand() * Math.PI * 2,
          speed: 0.25 + rand() * 0.6,
          spark: false,
        };
      });
      // A few sparkles, kept off the very edges: a bright centre with a thin cross.
      const sparks = w < 700 ? 3 : 9;
      for (let i = 0; i < sparks; i++) {
        stars.push({
          x: w * (0.05 + rand() * 0.9),
          y: h * (0.04 + rand() * 0.92),
          layer: 2,
          phase: rand() * Math.PI * 2,
          speed: 0.35 + rand() * 0.35,
          spark: true,
        });
      }
    };

    const wrap = (v: number, m: number) => ((v % m) + m) % m;

    const draw = (dt: number) => {
      const still = motionQuery.matches;
      t += dt;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      const top = host.getBoundingClientRect().top;
      ctx.fillStyle = "#FFFFFF";
      for (const s of stars) {
        const L = LAYERS[s.layer];
        let x = s.x;
        let y = s.y;
        if (!still) {
          y = wrap(s.y - t * L.drift + top * L.par, h);
          x = wrap(s.x + t * L.drift * 0.35, w);
        }
        const twinkle = still ? 1 : 0.7 + 0.3 * Math.sin(t * s.speed + s.phase);
        ctx.globalAlpha = L.a * twinkle;
        ctx.beginPath();
        ctx.arc(x, y, s.spark ? 1.7 : L.r, 0, Math.PI * 2);
        ctx.fill();
        if (s.spark) {
          // The cross: two hairlines that fade out toward their tips.
          const len = 7 + 3 * twinkle;
          ctx.globalAlpha = 0.55 * twinkle;
          for (const [cx, cy] of [[1, 0], [0, 1]] as const) {
            const g = ctx.createLinearGradient(x - cx * len, y - cy * len, x + cx * len, y + cy * len);
            g.addColorStop(0, "rgba(255,255,255,0)");
            g.addColorStop(0.5, "rgba(255,255,255,1)");
            g.addColorStop(1, "rgba(255,255,255,0)");
            ctx.strokeStyle = g;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(x - cx * len, y - cy * len);
            ctx.lineTo(x + cx * len, y + cy * len);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
    };

    const resize = () => {
      const rect = host.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      build();
      draw(0);
    };

    const frame = (now: number) => {
      raf = 0;
      if (!visible || document.hidden || motionQuery.matches) return;
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      draw(dt);
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      if (raf || !visible || document.hidden || motionQuery.matches) return;
      last = 0;
      raf = requestAnimationFrame(frame);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) start();
      },
      { rootMargin: "100px" },
    );
    const ro = new ResizeObserver(resize);
    const onVisibility = () => start();
    const onMotion = () => {
      draw(0);
      start();
    };

    resize();
    io.observe(host);
    ro.observe(host);
    document.addEventListener("visibilitychange", onVisibility);
    motionQuery.addEventListener("change", onMotion);

    return () => {
      if (raf) cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotion);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className="pointer-events-none absolute inset-0 h-full w-full" />;
}
