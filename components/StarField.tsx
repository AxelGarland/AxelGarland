"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { motion, useScroll, useTransform } from "framer-motion";

type StarSeed = {
  x: string;
  y: string;
  size: number;
  delay: number;
  duration: number;
  layer: 1 | 2 | 3;
};

/**
 * Three depth layers — closer layers (3) are bigger/brighter and drift more with
 * scroll, giving the parallax feel without any per-render randomness (keeps
 * server/client markup identical).
 */
const STARS: StarSeed[] = [
  { x: "6%", y: "8%", size: 1.6, delay: 0, duration: 5, layer: 1 },
  { x: "14%", y: "22%", size: 2.2, delay: 1.2, duration: 6, layer: 2 },
  { x: "22%", y: "6%", size: 1.2, delay: 2.4, duration: 4.5, layer: 1 },
  { x: "31%", y: "16%", size: 2.8, delay: 0.6, duration: 7, layer: 3 },
  { x: "9%", y: "38%", size: 1.4, delay: 3, duration: 5.5, layer: 1 },
  { x: "44%", y: "9%", size: 1.8, delay: 1.8, duration: 6, layer: 2 },
  { x: "52%", y: "26%", size: 1.2, delay: 0.3, duration: 4.8, layer: 1 },
  { x: "61%", y: "4%", size: 2.4, delay: 2.1, duration: 6.5, layer: 3 },
  { x: "68%", y: "18%", size: 1.6, delay: 0.9, duration: 5.2, layer: 2 },
  { x: "77%", y: "8%", size: 1.3, delay: 3.4, duration: 5, layer: 1 },
  { x: "84%", y: "24%", size: 2.6, delay: 1.5, duration: 7.2, layer: 3 },
  { x: "91%", y: "12%", size: 1.5, delay: 2.7, duration: 5.4, layer: 2 },
  { x: "4%", y: "56%", size: 1.8, delay: 0.4, duration: 6, layer: 2 },
  { x: "17%", y: "68%", size: 1.3, delay: 2.9, duration: 4.6, layer: 1 },
  { x: "27%", y: "48%", size: 2.2, delay: 1.1, duration: 6.4, layer: 3 },
  { x: "36%", y: "72%", size: 1.4, delay: 3.3, duration: 5, layer: 1 },
  { x: "48%", y: "58%", size: 1.9, delay: 0.7, duration: 5.8, layer: 2 },
  { x: "57%", y: "76%", size: 1.2, delay: 2.2, duration: 4.7, layer: 1 },
  { x: "66%", y: "52%", size: 2.6, delay: 1.4, duration: 6.8, layer: 3 },
  { x: "74%", y: "66%", size: 1.5, delay: 3.6, duration: 5.3, layer: 2 },
  { x: "82%", y: "46%", size: 1.3, delay: 0.2, duration: 4.9, layer: 1 },
  { x: "89%", y: "62%", size: 2.1, delay: 1.9, duration: 6.2, layer: 3 },
  { x: "96%", y: "38%", size: 1.4, delay: 2.6, duration: 5.1, layer: 1 },
  { x: "11%", y: "86%", size: 1.7, delay: 0.8, duration: 5.9, layer: 2 },
  { x: "24%", y: "92%", size: 1.2, delay: 3.1, duration: 4.5, layer: 1 },
  { x: "39%", y: "88%", size: 2.3, delay: 1.3, duration: 6.6, layer: 3 },
  { x: "54%", y: "94%", size: 1.5, delay: 2.5, duration: 5.4, layer: 2 },
  { x: "63%", y: "84%", size: 1.3, delay: 0.5, duration: 4.8, layer: 1 },
  { x: "72%", y: "90%", size: 2.0, delay: 3.5, duration: 6, layer: 2 },
  { x: "86%", y: "82%", size: 1.6, delay: 1.7, duration: 5.6, layer: 2 },
];

const LAYER_DEPTH: Record<StarSeed["layer"], number> = { 1: 0.02, 2: 0.05, 3: 0.09 };
const LAYER_OPACITY: Record<StarSeed["layer"], number> = { 1: 0.45, 2: 0.65, 3: 0.9 };

function StarLayer({
  layer,
  reduce,
  scrollY,
}: {
  layer: StarSeed["layer"];
  reduce: boolean;
  scrollY: ReturnType<typeof useScroll>["scrollY"];
}) {
  const y = useTransform(scrollY, (v) => v * LAYER_DEPTH[layer]);

  return (
    <motion.div className="absolute inset-0" style={reduce ? undefined : { y }}>
      {STARS.filter((s) => s.layer === layer).map((s, i) => (
        <motion.span
          key={`${layer}-${i}`}
          className="absolute rounded-full bg-mist"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            opacity: LAYER_OPACITY[layer],
          }}
          animate={
            reduce
              ? undefined
              : { opacity: [LAYER_OPACITY[layer] * 0.35, LAYER_OPACITY[layer], LAYER_OPACITY[layer] * 0.35] }
          }
          transition={
            reduce
              ? undefined
              : { duration: s.duration, repeat: Infinity, ease: "easeInOut", delay: s.delay }
          }
        />
      ))}
    </motion.div>
  );
}

/** Fixed starfield sitting behind all page content, with a subtle scroll parallax across three depth layers. */
export function StarField() {
  const reduce = useHydrationSafeReducedMotion();
  const { scrollY } = useScroll();

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <StarLayer layer={1} reduce={reduce} scrollY={scrollY} />
      <StarLayer layer={2} reduce={reduce} scrollY={scrollY} />
      <StarLayer layer={3} reduce={reduce} scrollY={scrollY} />
    </div>
  );
}
