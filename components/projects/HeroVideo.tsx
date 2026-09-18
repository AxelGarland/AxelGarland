"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";

/** A muted, looping clip that plays like an animated hero. With reduced motion on, it doesn't
 *  autoplay and shows native controls instead. */
export function HeroVideo({ src, poster, label }: { src: string; poster: string; label: string }) {
  const reduce = useHydrationSafeReducedMotion();

  return (
    <video
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
  );
}
