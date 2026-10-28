"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { useEffect, useRef, useState } from "react";

/** A muted, looping clip that plays like an animated hero. With reduced motion on, it doesn't
 *  autoplay and shows native controls instead. `soundToggle` adds a small button to unmute clips
 *  that carry a soundtrack (browsers only allow autoplay while muted); it is hidden on touch screens.
 *  `expandOnMobile` makes the clip tappable on touch screens: it opens in the browser's own full-screen
 *  player, with sound and controls, and goes back to muted when closed. `playOnce` plays the clip a
 *  single time and stops on its last frame; tapping the clip then plays it again. */
export function HeroVideo({
  src,
  poster,
  label,
  soundToggle = false,
  expandOnMobile = false,
  playOnce = false,
}: {
  src: string;
  poster: string;
  label: string;
  soundToggle?: boolean;
  expandOnMobile?: boolean;
  playOnce?: boolean;
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

  type FullscreenVideo = HTMLVideoElement & {
    webkitRequestFullscreen?: () => Promise<void> | void;
    webkitEnterFullscreen?: () => void;
  };

  const expand = () => {
    const v = ref.current as FullscreenVideo | null;
    if (!v) return;
    v.muted = false;
    v.controls = true;
    setMuted(false);
    if (v.ended || v.currentTime > v.duration - 0.3) v.currentTime = 0;
    if (v.paused) void v.play();
    if (v.requestFullscreen) void v.requestFullscreen().catch(() => {});
    else if (v.webkitRequestFullscreen) void v.webkitRequestFullscreen();
    else v.webkitEnterFullscreen?.();
  };

  // With playOnce the clip rests on its last frame; a click plays it again.
  const replay = () => {
    const v = ref.current;
    if (playOnce && v?.ended) {
      v.currentTime = 0;
      void v.play();
    }
  };

  // Back to muted, without controls, once the full-screen player is closed.
  useEffect(() => {
    if (!expandOnMobile) return;
    const v = ref.current;
    if (!v) return;
    const back = () => {
      v.muted = true;
      v.controls = reduce;
      setMuted(true);
    };
    const onChange = () => {
      if (document.fullscreenElement !== v) back();
    };
    document.addEventListener("fullscreenchange", onChange);
    v.addEventListener("webkitendfullscreen", back);
    return () => {
      document.removeEventListener("fullscreenchange", onChange);
      v.removeEventListener("webkitendfullscreen", back);
    };
  }, [expandOnMobile, reduce]);

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        src={src}
        poster={poster}
        aria-label={label}
        muted
        loop={!playOnce}
        onClick={replay}
        playsInline
        preload="auto"
        autoPlay={!reduce}
        controls={reduce}
      />
      {expandOnMobile && !reduce ? (
        <button
          type="button"
          onClick={expand}
          aria-label={`Open full screen: ${label}`}
          className="absolute inset-0 z-10 hidden [@media(pointer:coarse)]:block"
        />
      ) : null}
      {soundToggle && !reduce ? (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={!muted}
          className="absolute bottom-3 right-3 z-10 inline-flex min-h-[40px] items-center [@media(pointer:coarse)]:hidden gap-2 bg-black/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black"
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
