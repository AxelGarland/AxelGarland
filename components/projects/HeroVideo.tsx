"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { useEffect, useRef, useState } from "react";

/** A muted, looping clip that plays like an animated hero. With reduced motion on, it doesn't
 *  autoplay and shows native controls instead. `soundToggle` adds a small button to unmute clips
 *  that carry a soundtrack (browsers only allow autoplay while muted); it is hidden on touch screens.
 *  `expandOnMobile` makes the clip tappable on touch screens: it opens larger, edge to edge on black,
 *  with sound and the player's own controls, and is never forced into full screen or turned. `playOnce` plays the
 *  clip a single time and stops on its last frame; clicking the clip then plays it again. */
export function HeroVideo({
  src,
  mobileSrc,
  poster,
  label,
  soundToggle = false,
  expandOnMobile = false,
  playOnce = false,
}: {
  src: string;
  /** A smaller file for phones, used below 768px wide. */
  mobileSrc?: string;
  poster: string;
  label: string;
  soundToggle?: boolean;
  expandOnMobile?: boolean;
  playOnce?: boolean;
}) {
  const reduce = useHydrationSafeReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const big = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  // Touch screens get a lighter preload: these clips are several megabytes.
  const [coarse, setCoarse] = useState(false);

  // The server never renders `autoplay`, because the visitor's reduced-motion setting is not known
  // there and the browser would start the clip before React could stop it. Once it is known, a visitor
  // who has not asked for less motion gets the clip playing; everyone else gets controls.
  useEffect(() => {
    setCoarse(window.matchMedia("(pointer: coarse)").matches);
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.pause();
      return;
    }
    void el.play().catch(() => {});
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = !v.muted;
    setMuted(v.muted);
    if (!v.muted && v.paused) void v.play();
  };

  // With playOnce the clip rests on its last frame; a click plays it again.
  const replay = () => {
    const v = ref.current;
    if (playOnce && v?.ended) {
      v.currentTime = 0;
      void v.play();
    }
  };

  const open = () => {
    ref.current?.pause();
    document.body.style.overflow = "hidden";
    dialog.current?.showModal();
    const v = big.current;
    if (v) {
      v.currentTime = 0;
      void v.play().catch(() => {});
    }
  };
  const close = () => dialog.current?.close();

  // The page behind must not scroll while the viewer is open; closing stops its sound and lets the
  // clip on the page carry on from where it was.
  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onClose = () => {
      document.body.style.overflow = "";
      big.current?.pause();
      const inline = ref.current;
      if (inline && !inline.ended) void inline.play().catch(() => {});
    };
    d.addEventListener("close", onClose);
    return () => {
      d.removeEventListener("close", onClose);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <video
        ref={ref}
        className="absolute inset-0 h-full w-full object-cover"
        poster={poster}
        aria-label={label}
        muted
        loop={!playOnce}
        onClick={replay}
        playsInline
        preload={coarse ? "metadata" : "auto"}
        controls={reduce}
      >
        {mobileSrc ? <source src={mobileSrc} media="(max-width: 767px)" type="video/mp4" /> : null}
        <source src={src} type="video/mp4" />
      </video>
      {!playOnce && !reduce ? (
        <button
          type="button"
          onClick={() => {
            const v = ref.current;
            if (!v) return;
            if (v.paused) void v.play();
            else v.pause();
            setPaused(v.paused);
          }}
          aria-pressed={paused}
          aria-label={paused ? "Play animation" : "Pause animation"}
          className="absolute bottom-3 left-3 z-10 inline-flex h-11 w-11 items-center justify-center bg-black/60 text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-light"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden>
            {paused ? <path d="M3 1.5v11l9-5.5-9-5.5Z" /> : <path d="M3 1.5h3v11H3zM8 1.5h3v11H8z" />}
          </svg>
        </button>
      ) : null}
      {expandOnMobile && !reduce ? (
        <button
          type="button"
          onClick={open}
          aria-label={`Open full screen: ${label}`}
          className="absolute inset-0 z-10 hidden [@media(pointer:coarse)]:block"
        />
      ) : null}
      {soundToggle && !reduce ? (
        <button
          type="button"
          onClick={toggle}
          aria-pressed={!muted}
          className="absolute bottom-3 right-3 z-10 inline-flex min-h-[40px] items-center [@media(pointer:coarse)]:hidden gap-2 bg-black/70 px-4 py-2 text-sm font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-sm transition-colors duration-300 hover:bg-black"
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
      {expandOnMobile ? (
        <dialog
          ref={dialog}
          aria-label={label}
          className="m-0 h-full max-h-none w-full max-w-none bg-black p-0 backdrop:bg-black"
        >
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="fixed right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-full bg-white text-ink shadow-md"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
              <path d="M3 3l10 10M13 3L3 13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
          <div className="flex h-full w-full items-center justify-center">
            <video
              ref={big}
              className="max-h-full w-full object-contain"
              src={src}
              poster={poster}
              aria-label={label}
              controls
              playsInline
              preload="none"
            />
          </div>
        </dialog>
      ) : null}
    </>
  );
}
