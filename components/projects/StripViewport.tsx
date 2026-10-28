"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** The window the project strip slides in. With a mouse the strip drifts by CSS and this does
 *  nothing. On a touch screen the strip is an ordinary row you swipe with your finger, and this keeps
 *  it drifting from right to left by itself, pausing while a finger is on it (and while it is still
 *  gliding after a flick) and carrying on from wherever it was left.
 *
 *  The strip holds two identical copies back to back, so the pattern repeats every half-width and
 *  the position is wrapped by exactly that distance, which no one can see. The wrap only happens
 *  while the strip is idle, because setting the position during a flick stops the glide on iOS. */
const SPEED_SECONDS = 80; // one copy goes by in this long, matching the CSS drift
const IDLE_MS = 1200;

export function StripViewport({ className, children, label }: { className?: string; children: ReactNode; label: string }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    const track = el?.firstElementChild as HTMLElement | null;
    if (!el || !track) return;
    if (!window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let period = track.scrollWidth / 2;
    let pos = period * 0.5;
    el.scrollLeft = pos;
    let touching = false;
    let lastUser = 0;
    let last = 0;
    let frame = 0;

    const wrap = () => {
      if (pos < period * 0.25) pos += period;
      else if (pos > period * 1.25) pos -= period;
    };

    const onScroll = () => {
      // A position we did not set ourselves is the finger (or its glide).
      if (Math.abs(el.scrollLeft - pos) > 1.5) {
        pos = el.scrollLeft;
        lastUser = performance.now();
      }
    };
    const onTouchStart = () => {
      touching = true;
      lastUser = performance.now();
    };
    const onTouchEnd = () => {
      touching = false;
      lastUser = performance.now();
    };

    const tick = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 0;
      last = now;
      if (!touching && now - lastUser > IDLE_MS) {
        pos += (period / SPEED_SECONDS) * (dt / 1000);
        wrap();
        el.scrollLeft = pos;
      }
      frame = requestAnimationFrame(tick);
    };
    const start = () => {
      if (!frame) {
        last = 0;
        frame = requestAnimationFrame(tick);
      }
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()), { threshold: 0 });
    io.observe(el);
    const ro = new ResizeObserver(() => {
      const next = track.scrollWidth / 2;
      if (next && Math.abs(next - period) > 1) {
        pos = (pos / period) * next;
        period = next;
        el.scrollLeft = pos;
      }
    });
    ro.observe(track);

    el.addEventListener("scroll", onScroll, { passive: true });
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    el.addEventListener("touchcancel", onTouchEnd, { passive: true });
    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      el.removeEventListener("scroll", onScroll);
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
      el.removeEventListener("touchcancel", onTouchEnd);
    };
  }, []);

  return (
    <section ref={ref} aria-label={label} className={className}>
      {children}
    </section>
  );
}
