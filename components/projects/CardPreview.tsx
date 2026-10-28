"use client";

import { pictureSrc } from "@/lib/pictures";
import { useEffect, useRef } from "react";

/** A short clip that fades in over a work card's still image once the circle has scrolled into view,
 *  and fades out again when it leaves. It is a small file (a few hundred kB), and it only starts
 *  loading when the circle is on screen. With reduced motion it never loads or plays.
 *
 *  `scale` is the video's width as a share of the circle. Below 1 the whole frame sits inside the
 *  circle instead of being cropped to its middle, so a centred title stays fully visible; `background`
 *  fills the rest of the circle and should match the video's own backdrop. */
export function CardPreview({ src, scale = 0.84, background = "#000" }: { src: string; scale?: number; background?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  const canPlay = () =>
    typeof window !== "undefined" && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const start = () => {
    const v = videoRef.current;
    const f = fadeRef.current;
    if (!v || !f || !canPlay()) return;
    f.style.opacity = "1";
    void v.play().catch(() => {});
  };

  const stop = () => {
    const v = videoRef.current;
    const f = fadeRef.current;
    if (!v || !f) return;
    f.style.opacity = "0";
    window.setTimeout(() => {
      if (f.style.opacity === "0") {
        v.pause();
        v.currentTime = 0;
      }
    }, 450);
  };

  // Play while the circle is mostly on screen; fade out and rewind when it has gone.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) start();
        else stop();
      },
      { threshold: 0.6 },
    );
    io.observe(root);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div ref={rootRef} aria-hidden className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-100">
      <div
        ref={fadeRef}
        className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500"
        style={{ background }}
      >
        <video
          ref={videoRef}
          src={pictureSrc(src)}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          className="aspect-video h-auto object-cover"
          style={{ width: `${scale * 100}%` }}
        />
      </div>
    </div>
  );
}
