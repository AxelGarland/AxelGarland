"use client";

import { pictureSrc } from "@/lib/pictures";
import Image from "next/image";
import { useEffect, useRef } from "react";
import type p5 from "p5";

const PHOTO = "portrait/axel-photo-square.jpg";

/** The hero portrait. The server renders the plain photo, so the first paint is the photo itself.
 *  Once the page is idle, p5 loads and takes over the same frame with a looping pixel animation.
 *  Visitors who prefer reduced motion keep the still photo and never download p5. */
export function HeroPortrait() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let instance: p5 | null = null;
    let observer: IntersectionObserver | null = null;

    const start = async () => {
      const [{ default: P5 }, { createPortraitSketch }] = await Promise.all([
        import("p5"),
        import("@/lib/portraitSketch"),
      ]);
      if (cancelled) return;
      instance = new P5(createPortraitSketch({ url: pictureSrc(PHOTO), host }), host);
      // Pause the animation while the portrait is off screen.
      observer = new IntersectionObserver(([entry]) => {
        if (!instance) return;
        if (entry.isIntersecting) instance.loop();
        else instance.noLoop();
      });
      observer.observe(host);
    };

    const idle = (window as unknown as { requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number })
      .requestIdleCallback;
    const handle = idle ? idle(() => void start(), { timeout: 2500 }) : window.setTimeout(() => void start(), 800);

    return () => {
      cancelled = true;
      observer?.disconnect();
      instance?.remove();
      if (!idle) window.clearTimeout(handle);
      else (window as unknown as { cancelIdleCallback?: (h: number) => void }).cancelIdleCallback?.(handle);
    };
  }, []);

  return (
    <div ref={hostRef} className="absolute inset-0 overflow-hidden rounded-full bg-white shadow-[0_0_0_1px_rgba(26,25,22,0.1)]">
      <Image
        src={pictureSrc(PHOTO)}
        alt="Portrait of Axel Garland, smiling, in a dark green polo shirt"
        fill
        priority
        className="object-cover"
        sizes="(max-width: 768px) 78vw, 34rem"
      />
    </div>
  );
}
