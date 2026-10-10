"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { useRef, useState } from "react";

/** A muted, looping clip that plays like an animated hero. With reduced motion on, it doesn't
 *  autoplay and shows native controls instead. `soundToggle` adds a small button to unmute clips
 *  that carry a soundtrack (browsers only allow autoplay while muted). */
export function HeroVideo({
  src,
  poster,
  label,
  soundToggle = false,
}: {
  src: string;
  poster: string;
  label: string;
  soundToggle?: boolean;
}) {
  const reduce = useHydrationSafeReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) void v.play();
  };

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        aria-label={label}
        muted
        loop
        playsInline
        preload="auto"
        autoPlay={!reduce}
        controls={reduce}
      />
      {soundToggle && !reduce ? (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={!muted}
          className="absolute bottom-3 right-3 z-10 inline-flex min-h-[40px] items-center gap-2 bg-black/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
            <path d="M2 6h3l4-3v10l-4-3H2V6Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
            {muted ? (
              <path d="m11.5 6 3 4m0-4-3 4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            ) : (
              <path d="M11.5 5.5a3.5 3.5 0 0 1 0 5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            )}
          </svg>
          {muted ? "Sound on" : "Sound off"}
        </button>
      ) : null}
    </>
  );
}
