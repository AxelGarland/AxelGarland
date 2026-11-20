"use client";

import { DesignButton } from "@/components/home/DesignButton";
import { CopyEmail } from "@/components/sections/CopyEmail";
import { useEffect, useRef } from "react";

/** The closing block of every page: "Let's talk." on white, the contact links, and the painted portrait
 *  peeking in from the right edge. It is a short animation: the head turns, a clay fingertip comes in from
 *  the left, pushes "LET'S" a little and pulls back (3.6 seconds, looping). The portrait is a sheet of 90
 *  frames and the fingertip one small picture, both drawn on a canvas behind the words. The sheet is only
 *  fetched once the footer is close to the screen, and the animation only runs while it is on screen. With
 *  reduced motion it shows one still frame. The words and links are ordinary page text. */

const FRAME_W = 350;
const FRAME_H = 405;
const SHEET = "/home/footer/portrait-sprite.webp";
const FINGER = "/home/footer/finger.png";
const LOOP = 3.6;

const LINK =
  "inline-flex min-h-[44px] items-center border-b border-line text-base text-ink transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

const ease = (t: number) => {
  const c = Math.min(1, Math.max(0, t));
  return c * c * (3 - 2 * c);
};

export function ContactFooter() {
  const footer = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const lets = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const host = footer.current;
    const cv = canvas.current;
    const title = lets.current;
    const ctx = cv?.getContext("2d");
    if (!host || !cv || !title || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let portrait: HTMLImageElement | null = null;
    let finger: HTMLImageElement | null = null;
    let width = 0;
    let height = 0;
    let left = 0;
    let middle = 0;
    let visible = false;
    let raf = 0;
    let started = 0;
    let last = 0;
    let requested = false;

    const load = () => {
      if (requested) return;
      requested = true;
      const a = new Image();
      a.onload = () => {
        portrait = a;
        draw();
        playback();
      };
      a.src = SHEET;
      const b = new Image();
      b.onload = () => {
        finger = b;
        draw();
      };
      b.src = FINGER;
    };

    const measure = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      left = title.offsetLeft;
      middle = title.offsetTop + title.offsetHeight * 0.52;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      cv.width = Math.round(width * dpr);
      cv.height = Math.round(height * dpr);
      cv.style.width = `${width}px`;
      cv.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw();
    };

    const draw = () => {
      if (!width || !portrait) return;
      const t = reduced.matches ? 1.22 : (((performance.now() - (started || performance.now())) / 1000) + LOOP) % LOOP;
      const frame = Math.min(89, Math.floor(t * 25));
      ctx.clearRect(0, 0, width, height);
      const small = width <= 640;
      const scale = small ? Math.min((width * 0.39) / FRAME_W, 0.62) : Math.min(width / 970, height / 405);
      const y = small ? 12 : (height - FRAME_H * scale) / 2;
      // Sample one pixel inside the frame on each side, so the smoothing never pulls in the neighbouring frame's edge.
      ctx.drawImage(portrait, (frame % 10) * FRAME_W + 1, Math.floor(frame / 10) * FRAME_H, FRAME_W - 2, FRAME_H, width - FRAME_W * scale + scale, y, (FRAME_W - 2) * scale, FRAME_H * scale);

      const approach = ease((t - 1.22) / 0.46);
      const push = ease((t - 1.68) / 0.3);
      const retreat = ease((t - 2.5) / 0.48);
      const release = ease((t - 2.58) / 0.42);
      const distance = small ? 10 : 17 * scale;
      title.style.transform = `translateX(${distance * push * (1 - release)}px)`;
      if (!finger) return;
      const fs = Math.max(left / 79, 0.55);
      const tip = (left * approach + distance * push) * (1 - retreat);
      const x = tip - 79 * fs;
      if (x > 0) ctx.drawImage(finger, 0, 0, 1, 65, 0, middle - 32 * fs, x, 65 * fs);
      ctx.drawImage(finger, x, middle - 32 * fs, 83 * fs, 65 * fs);
    };

    const tick = (now: number) => {
      raf = 0;
      if (!visible || document.hidden || reduced.matches) return;
      if (now - last >= 38) {
        last = now;
        draw();
      }
      raf = requestAnimationFrame(tick);
    };
    const playback = () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      if (visible && !document.hidden && !reduced.matches && portrait) {
        started = performance.now();
        raf = requestAnimationFrame(tick);
      } else {
        draw();
      }
    };

    // Fetch the pictures when the footer is within a screen or so; run the animation only while it shows.
    const near = new IntersectionObserver(([e]) => e.isIntersecting && load(), { rootMargin: "900px 0px" });
    const seen = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      playback();
    });
    near.observe(host);
    seen.observe(host);
    const ro = new ResizeObserver(measure);
    ro.observe(host);
    measure();
    const onVis = () => playback();
    document.addEventListener("visibilitychange", onVis);
    reduced.addEventListener("change", playback);
    const fonts = (document as Document & { fonts?: { ready: Promise<unknown> } }).fonts;
    void fonts?.ready.then(measure);
    return () => {
      near.disconnect();
      seen.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVis);
      reduced.removeEventListener("change", playback);
      if (raf) cancelAnimationFrame(raf);
      title.style.transform = "";
    };
  }, []);

  return (
    <footer ref={footer} id="contact" className="relative isolate min-h-[410px] scroll-mt-16 overflow-hidden border-t border-line bg-surface pb-12 pt-[clamp(75px,9vw,140px)]">
      <canvas ref={canvas} aria-hidden className="pointer-events-none absolute inset-0 -z-10 block" />
      <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <h2 className="font-display leading-[0.88] tracking-[-0.04em] text-ink" style={{ fontSize: "clamp(62px, 6.55vw, 106px)" }}>
          <span ref={lets} className="block w-max">
            Let&rsquo;s
          </span>
          <span className="block w-max text-accent">talk.</span>
        </h2>
        <p className="my-9 max-w-[90%] text-ink-muted sm:max-w-[56%]" style={{ fontSize: "clamp(16px, 1.65vw, 23px)" }}>
          Product roles, collaborations, or freelance work.
        </p>
        <nav aria-label="Contact" className="flex max-w-full flex-wrap items-center gap-x-6 gap-y-4 sm:max-w-[67%]">
          <DesignButton href="/contact" label="Get in touch" variant="solid" />
          <CopyEmail email="axelgrobman@gmail.com" className={LINK} />
          <a href="https://www.linkedin.com/in/axel-garland-138188292/" target="_blank" rel="noopener noreferrer" className={LINK}>
            LinkedIn
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
          <a href="/Axel%20Garland%20CV.pdf" target="_blank" rel="noopener noreferrer" className={LINK}>
            Download CV
            <span className="sr-only"> (PDF, opens in a new tab)</span>
          </a>
        </nav>
      </div>
    </footer>
  );
}
