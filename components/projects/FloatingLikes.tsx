"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef, type ReactNode } from "react";

const HEART =
  "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
const THUMB =
  "M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-2z";

/** x and y are percentages of the section; `rise` is how many pixels the icon climbs over the
 *  whole scroll, so the larger ones that sit "closer" climb further and the small ones lag. */
const LIKES = [
  { icon: HEART, x: 4, y: 78, size: 34, rise: 520, rot: -14, o: 0.22 },
  { icon: THUMB, x: 11, y: 30, size: 26, rise: 380, rot: 8, o: 0.16 },
  { icon: HEART, x: 17, y: 92, size: 52, rise: 640, rot: 10, o: 0.14 },
  { icon: HEART, x: 24, y: 55, size: 22, rise: 300, rot: -8, o: 0.2 },
  { icon: THUMB, x: 31, y: 86, size: 38, rise: 560, rot: -12, o: 0.14 },
  { icon: HEART, x: 38, y: 24, size: 30, rise: 420, rot: 16, o: 0.18 },
  { icon: HEART, x: 46, y: 96, size: 24, rise: 340, rot: -6, o: 0.2 },
  { icon: HEART, x: 53, y: 40, size: 46, rise: 600, rot: 12, o: 0.12 },
  { icon: THUMB, x: 60, y: 74, size: 28, rise: 400, rot: 6, o: 0.18 },
  { icon: HEART, x: 67, y: 18, size: 24, rise: 320, rot: -16, o: 0.2 },
  { icon: HEART, x: 73, y: 90, size: 40, rise: 580, rot: 14, o: 0.14 },
  { icon: THUMB, x: 80, y: 46, size: 34, rise: 500, rot: -10, o: 0.14 },
  { icon: HEART, x: 86, y: 70, size: 26, rise: 360, rot: 9, o: 0.2 },
  { icon: HEART, x: 92, y: 22, size: 44, rise: 620, rot: -12, o: 0.13 },
  { icon: HEART, x: 96, y: 88, size: 22, rise: 300, rot: 7, o: 0.18 },
] as const;

function Like({ like, progress, still }: { like: (typeof LIKES)[number]; progress: MotionValue<number>; still: boolean }) {
  const y = useTransform(progress, [0, 1], still ? [0, 0] : [like.rise / 2, -like.rise / 2]);
  const opacity = useTransform(progress, [0, 0.18, 0.82, 1], still ? [like.o, like.o, like.o, like.o] : [0, like.o, like.o, 0]);

  return (
    <motion.svg
      aria-hidden
      viewBox="0 0 24 24"
      className="absolute fill-accent"
      style={{
        left: `${like.x}%`,
        top: `${like.y}%`,
        width: like.size,
        height: like.size,
        rotate: like.rot,
        y,
        opacity,
      }}
    >
      <path d={like.icon} />
    </motion.svg>
  );
}

/** Wraps a section's content with faded red hearts and thumbs-up drifting behind it. As the section
 *  scrolls through the screen they climb faster than the page, so they seem to float up. With
 *  reduced motion they hold still. */
export function FloatingLikes({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useHydrationSafeReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  return (
    <section ref={ref} className={`relative overflow-hidden ${className}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {LIKES.map((like, i) => (
          <Like key={i} like={like} progress={scrollYProgress} still={reduce} />
        ))}
      </div>
      <div className="relative">{children}</div>
    </section>
  );
}
