"use client";

import { motion, useMotionTemplate, useMotionValue, useSpring } from "framer-motion";
import type { ReactNode } from "react";

export type CategoryCardProps = {
  title: string;
  subtitle: string;
  visual: ReactNode;
};

export function CategoryCard({ title, subtitle, visual }: CategoryCardProps) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const smoothX = useSpring(mx, { stiffness: 44, damping: 28, mass: 0.9 });
  const smoothY = useSpring(my, { stiffness: 44, damping: 28, mass: 0.9 });
  const spotlight = useMotionTemplate`radial-gradient(520px circle at ${smoothX}px ${smoothY}px, rgba(109,126,179,0.18), transparent 68%)`;

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left);
    my.set(e.clientY - r.top);
  }

  function onPointerLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.article
      className="group relative flex min-h-[320px] flex-col justify-between overflow-hidden rounded-lg border border-ink/10 bg-white/70 p-8 shadow-[0_28px_90px_-50px_rgba(12,12,14,0.14)] backdrop-blur-[2px] md:min-h-[380px] md:p-10"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      whileHover={{ scale: 1.015, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-[1.4s] ease-out group-hover:opacity-100"
        style={{ background: spotlight }}
      />
      <div className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 shadow-[inset_0_0_0_1px_rgba(109,126,179,0.28)] transition-opacity duration-[1.2s] group-hover:opacity-100" />
      <div className="relative h-40 overflow-hidden rounded-sm border border-ink/8 bg-surface-raised/80 md:h-48">
        {visual}
      </div>
      <div className="relative mt-8 space-y-2 md:mt-10">
        <h3 className="font-display text-2xl font-medium tracking-tight text-ink md:text-3xl">
          {title}
        </h3>
        <p className="max-w-prose text-sm leading-relaxed text-ink-muted md:text-base">
          {subtitle}
        </p>
      </div>
    </motion.article>
  );
}
