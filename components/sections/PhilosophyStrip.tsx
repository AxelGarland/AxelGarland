"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { motion } from "framer-motion";

const statements = [
  "Story as interface.",
  "Systems with emotion.",
  "Design beyond static images.",
  "Human-centered experimentation.",
] as const;

export function PhilosophyStrip() {
  const reduce = useHydrationSafeReducedMotion();
  const looped = [...statements, ...statements];

  return (
    <section
      aria-label="Creative philosophy"
      className="relative border-y border-ink/10 bg-surface-raised/30 py-12 md:py-14"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(109,126,179,0.06),transparent_65%)]" />
      <div className="relative overflow-hidden">
        <motion.div
          className="flex w-max gap-x-12 md:gap-x-20"
          animate={reduce ? undefined : { x: ["0%", "-50%"] }}
          transition={
            reduce
              ? undefined
              : { duration: 85, repeat: Infinity, ease: "linear" }
          }
        >
          {looped.map((line, i) => (
            <p
              key={`${line}-${i}`}
              className="shrink-0 font-display text-xl font-medium tracking-tight text-ink/88 md:text-2xl"
            >
              {line}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
