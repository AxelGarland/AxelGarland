"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { useEffect, useRef, useState } from "react";

/** The product walkthrough: a silent loop with nothing over the interface. It plays while it is on
 *  screen. The one control, a small play/pause icon, sits below the frame, never over the product.
 *  With reduced motion it does not autoplay. */
export function WalkthroughVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const reduce = useHydrationSafeReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !paused) void el.play().catch(() => {});
        else el.pause();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduce, paused]);

  const toggle = () => {
    const el = ref.current;
    if (!el) return;
    if (el.paused) {
      setPaused(false);
      void el.play().catch(() => {});
    } else {
      setPaused(true);
      el.pause();
    }
  };

  return (
    <figure className="m-0">
      <div className="overflow-hidden rounded-[4px] border border-gj-line bg-gj-tint">
        <video
          ref={ref}
          className="block aspect-video w-full object-cover"
          src={src}
          poster={poster}
          aria-label={label}
          muted
          loop
          playsInline
          preload="none"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      </div>
      <div className="mt-2 flex justify-end">
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? "Pause the walkthrough" : "Play the walkthrough"}
          className="flex h-11 w-11 items-center justify-center text-gj-muted transition-colors duration-200 hover:text-gj-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gj-blue"
        >
          <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
            {playing ? <path d="M6 5h4v14H6zM14 5h4v14h-4z" /> : <path d="M7 4.5v15l12-7.5z" />}
          </svg>
        </button>
      </div>
    </figure>
  );
}
