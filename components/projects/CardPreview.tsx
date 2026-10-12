"use client";

import { pictureSrc } from "@/lib/pictures";
import { useRef } from "react";

/** A short clip that fades in over a work card's still image while the pointer is over it.
 *  Only for devices that can hover; on touch screens and with reduced motion it never loads or
 *  plays, so phones keep the plain image and don't download the video. */
export function CardPreview({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  const canPlay = () =>
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const start = () => {
    const v = videoRef.current;
    if (!v || !canPlay()) return;
    v.style.opacity = "1";
    void v.play().catch(() => {});
  };

  const stop = () => {
    const v = videoRef.current;
    if (!v) return;
    v.style.opacity = "0";
    window.setTimeout(() => {
      if (v.style.opacity === "0") {
        v.pause();
        v.currentTime = 0;
      }
    }, 450);
  };

  return (
    <div
      aria-hidden
      className="absolute inset-0 z-10"
      onPointerEnter={start}
      onPointerLeave={stop}
    >
      <video
        ref={videoRef}
        src={pictureSrc(src)}
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
        className="h-full w-full object-cover opacity-0 transition-opacity duration-500"
      />
    </div>
  );
}
