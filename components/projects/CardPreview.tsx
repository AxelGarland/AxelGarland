"use client";

import { pictureSrc } from "@/lib/pictures";
import { useEffect, useRef } from "react";

/** A short clip that fades in over a work card's still image while the pointer is over the card: the
 *  picture or the text beside it (it listens on the whole link the card sits in).
 *  Only for devices that can hover; on touch screens and with reduced motion it never loads or
 *  plays, so phones keep the plain image and don't download the video.
 *
 *  `scale` is the video's width as a share of the circle. Below 1 the whole frame sits inside the
 *  circle instead of being cropped to its middle, so a centred title stays fully visible; `background`
 *  fills the rest of the circle and should match the video's own backdrop. */
export function CardPreview({ src, scale = 0.84, background = "#000" }: { src: string; scale?: number; background?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fadeRef = useRef<HTMLDivElement>(null);

  const canPlay = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  // Listen on the whole row (the link this sits in), so pointing at the title or text plays it too.
  useEffect(() => {
    const row = rootRef.current?.closest("a");
    if (!row) return;
    const enter = (e: PointerEvent) => {
      if (e.pointerType === "mouse") start();
    };
    row.addEventListener("pointerenter", enter);
    row.addEventListener("pointerleave", stop);
    row.addEventListener("focus", start);
    row.addEventListener("blur", stop);
    return () => {
      row.removeEventListener("pointerenter", enter);
      row.removeEventListener("pointerleave", stop);
      row.removeEventListener("focus", start);
      row.removeEventListener("blur", stop);
    };
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
