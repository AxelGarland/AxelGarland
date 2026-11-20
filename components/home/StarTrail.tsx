"use client";

import { useEffect, useRef } from "react";

/** The six stars on the bust's shirt, carried on across the page. In the hero they drop off the shirt
 *  exactly as they did in the painting (the sketch no longer draws them; this does, from the same
 *  painted pieces), fall out of the bottom of the screen and gather on a path that starts under the bust.
 *  From there they follow the route into the black section: down, a long curve to the left, along the
 *  heading's line, and into the end of "Selected work". Each star lights the letters as it touches them,
 *  bursts and is gone. All of it is driven by scroll, so scrolling back runs it backwards. One fixed,
 *  full-screen canvas draws everything. With reduced motion it does nothing. */

/** The shirt stars, as in the sketch: centre x, centre y, size (portrait units, 1122 x 1402) and the point
 *  in the hero's scroll (0 to 1) at which each lets go. */
const SHIRT: [number, number, number, number][] = [
  [416, 1185, 88, 0.05],
  [764, 1190, 108, 0.2],
  [302, 1268, 108, 0.39],
  [206, 1194, 90, 0.54],
  [848, 1270, 100, 0.65],
  [492, 1269, 66, 0.78],
];
const STARS = SHIRT.length;
/** The painted portrait is drawn 36 units down inside the sketch's canvas (air above the hair). */
const AIR = 36;
/** How far above the work section the path starts, in px. */
const UP = 56;

type Pt = { x: number; y: number };

const bezier = (p0: Pt, p1: Pt, p2: Pt, p3: Pt, t: number): Pt => {
  const u = 1 - t;
  return {
    x: u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    y: u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  };
};
const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const smooth = (t: number) => t * t * (3 - 2 * t);

export function StarTrail() {
  const wrap = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const host = wrap.current;
    const cv = canvas.current;
    const ctx = cv?.getContext("2d");
    const heading = document.querySelector<HTMLElement>("#work h2");
    const runway = document.getElementById("hero-runway");
    const frame = document.querySelector<HTMLIFrameElement>('iframe[src*="falling-stars"]');
    if (!host || !cv || !ctx || !heading || !runway) return;

    const sprites = SHIRT.map((_, i) => {
      const img = new Image();
      img.src = `/home/stars/s${i}.png`;
      return img;
    });

    let W = 0;
    let H = 0;
    let path: Pt[] = [];
    let end: Pt = { x: 0, y: 0 };
    let dist = 1;
    let raf = 0;
    let lit = 0;
    let lastT = 0;
    let u0: number[] = [];
    const arrived = new Array(STARS).fill(false);
    const bursts: { x: number; y: number; t: number }[] = [];

    const measure = () => {
      const hostTop = host.getBoundingClientRect().top;
      const r = document.createRange();
      r.selectNodeContents(heading);
      const rects = r.getClientRects();
      const last = rects[rects.length - 1] ?? heading.getBoundingClientRect();
      // Everything below is in "host" coordinates: x across the page, y down from the top of the work section.
      end = { x: last.right + 6, y: last.top + last.height / 2 - hostTop };
      W = window.innerWidth;
      H = window.innerHeight;
      const start: Pt = { x: W * 0.78, y: -UP };
      const dx = start.x - end.x;
      const dy = end.y - start.y;
      const c1 = { x: start.x + W * 0.012, y: start.y + dy * 0.55 };
      const c2 = { x: start.x - dx * 0.08, y: end.y };
      const mid = { x: start.x - dx * 0.24, y: end.y };
      const pts: Pt[] = [];
      for (let i = 0; i <= 80; i++) pts.push(bezier(start, c1, c2, mid, i / 80));
      for (let i = 1; i <= 80; i++) pts.push({ x: mid.x + ((end.x - mid.x) * i) / 80, y: end.y });
      path = pts;
      dist = end.y + H * 0.4;
      // Where each star waits on the path when the hero lets go: the first to arrive is furthest along.
      u0 = SHIRT.map((_, i) => 0.012 + (STARS - 1 - i) * 0.03);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(W * dpr);
      cv.height = Math.round(H * dpr);
      cv.style.width = `${W}px`;
      cv.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const at = (u: number): Pt => path[Math.min(path.length - 1, Math.max(0, Math.round(u * (path.length - 1))))];

    /** Where the sketch's canvas sits on screen, so a position in portrait units can be placed exactly. */
    const portraitFrame = () => {
      const inner = frame?.contentDocument?.querySelector("canvas");
      if (!frame || !inner) return null;
      const f = frame.getBoundingClientRect();
      const c = inner.getBoundingClientRect();
      return { left: f.left + c.left, top: f.top + c.top, scale: c.width / 1122 };
    };

    const drawStar = (i: number, x: number, y: number, size: number, rot: number, glow: number) => {
      const img = sprites[i];
      if (!img.complete || !img.naturalWidth) return;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rot);
      if (glow > 0) {
        ctx.shadowColor = "rgba(240, 160, 0, 0.8)";
        ctx.shadowBlur = glow;
      }
      ctx.drawImage(img, -size / 2, -size / 2, size, size);
      ctx.restore();
    };

    const render = (now: number) => {
      raf = 0;
      const dt = Math.min((now - (lastT || now)) / 1000, 0.06);
      lastT = now;
      ctx.clearRect(0, 0, W, H);
      let busy = false;

      // How far through the hero's pinned scroll (0 to 1), and how far the work section has come up.
      const room = Math.max(1, runway.offsetHeight - H);
      const p = clamp(-runway.getBoundingClientRect().top / room);
      const hostTop = host.getBoundingClientRect().top;
      const sp = clamp((H - hostTop) / dist);
      const pf = portraitFrame();

      for (let i = 0; i < STARS; i++) {
        const [cx, cy, size, delay] = SHIRT[i];
        const arriveAt = 0.36 + i * 0.1;
        const raw = clamp(sp / arriveAt);

        // Phase 2: along the path, in page coordinates.
        if (sp > 0) {
          if (raw >= 1) {
            if (!arrived[i]) {
              arrived[i] = true;
              lit = 1;
              bursts.push({ x: end.x, y: hostTop + end.y + ((i % 3) - 1) * 6, t: 0 });
            }
            continue;
          }
          arrived[i] = false;
          const u = u0[i] + (1 - u0[i]) * Math.pow(raw, 1.1);
          const p2 = at(u);
          const px = p2.x;
          const py = hostTop + p2.y;
          const sz = (pf ? size * pf.scale : size * 0.55) * 0.95;
          for (let k = 5; k >= 1; k--) {
            const q = at(Math.max(0, u - k * 0.012));
            ctx.fillStyle = `rgba(240, 160, 0, ${0.3 * (1 - k / 6)})`;
            ctx.beginPath();
            ctx.arc(q.x, hostTop + q.y, sz * 0.16 * (1 - k / 7), 0, Math.PI * 2);
            ctx.fill();
          }
          drawStar(i, px, py, sz, 1.4 * (i % 2 ? 1 : -1) + u * 7, 16);
          busy = true;
          continue;
        }

        // Phase 1: off the shirt, as in the painting, then gathering toward the path's start.
        arrived[i] = false;
        if (!pf) continue;
        const t = clamp((p - delay) / (1 - delay));
        if (t <= 0) {
          // Still on the shirt: drawn exactly where the painting has it.
          drawStar(i, pf.left + cx * pf.scale, pf.top + (cy + AIR) * pf.scale, size * pf.scale, 0, 0);
          continue;
        }
        const fx = cx + Math.sin(t * 4 + i) * t * 50;
        const fy = cy + 420 * t * t - 20 * Math.sin(t * Math.PI);
        let sx = pf.left + fx * pf.scale;
        let sy = pf.top + (fy + AIR) * pf.scale;
        // Toward where this star waits on the path (just under the bottom edge of the screen).
        const wait = at(u0[i]);
        const qx = wait.x;
        const qy = H + wait.y; // the work section's top is at the bottom of the screen when the hero lets go
        const w = smooth(clamp((t - 0.45) / 0.55));
        sx += (qx - sx) * w;
        sy += (qy - sy) * w;
        drawStar(i, sx, sy, size * pf.scale, t * (i % 2 ? 1 : -1) * 1.4, 0);
        busy = busy || t < 1;
      }

      for (let k = bursts.length - 1; k >= 0; k--) {
        const bst = bursts[k];
        bst.t += dt;
        if (bst.t > 0.45) {
          bursts.splice(k, 1);
          continue;
        }
        const f = bst.t / 0.45;
        for (let s = 0; s < 8; s++) {
          const ang = (s / 8) * Math.PI * 2 + k;
          const rr = 8 + f * 34;
          ctx.fillStyle = `rgba(240, 160, 0, ${(1 - f) * 0.9})`;
          ctx.beginPath();
          ctx.arc(bst.x + Math.cos(ang) * rr, bst.y + Math.sin(ang) * rr, 3.2 * (1 - f) + 0.6, 0, Math.PI * 2);
          ctx.fill();
        }
        busy = true;
      }

      lit = Math.max(0, lit - dt * 1.5);
      if (lit > 0.01) {
        const l = Math.min(1, lit);
        heading.style.textShadow = `0 0 ${6 + 26 * l}px rgba(255, 190, 40, ${0.7 * l}), 0 0 ${2 + 8 * l}px rgba(255, 200, 60, ${0.9 * l})`;
        // From ink toward warm gold while lit, back to ink as it fades.
        heading.style.color = `rgb(${Math.round(26 + 229 * l)}, ${Math.round(25 + 150 * l)}, ${Math.round(22 + 17 * l)})`;
        busy = true;
      } else if (heading.style.textShadow) {
        heading.style.textShadow = "";
        heading.style.color = "";
      }
      if (busy && !raf) raf = requestAnimationFrame(render);
    };

    const kick = () => {
      if (!raf) raf = requestAnimationFrame(render);
    };
    const onResize = () => {
      measure();
      kick();
    };

    measure();
    kick();
    window.addEventListener("scroll", kick, { passive: true });
    window.addEventListener("resize", onResize);
    frame?.addEventListener("load", kick);
    sprites.forEach((s) => s.addEventListener("load", kick));
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    void fonts?.ready.then(onResize);
    return () => {
      window.removeEventListener("scroll", kick);
      window.removeEventListener("resize", onResize);
      frame?.removeEventListener("load", kick);
      if (raf) cancelAnimationFrame(raf);
      heading.style.textShadow = "";
      heading.style.color = "";
    };
  }, []);

  return (
    <div ref={wrap} aria-hidden className="pointer-events-none relative h-0 w-full">
      <canvas ref={canvas} className="pointer-events-none fixed left-0 top-0 z-[35]" />
    </div>
  );
}
