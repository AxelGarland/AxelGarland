"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const easeCinematic = [0.22, 1, 0.36, 1] as const;

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  amount?: number | "some" | "all";
};

export function MotionReveal({
  children,
  className,
  delay = 0,
  amount = 0.35,
}: MotionRevealProps) {
  const reduce = useHydrationSafeReducedMotion();

  const variants: Variants = {
    hidden: { opacity: reduce ? 1 : 0, y: reduce ? 0 : 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: reduce
        ? { duration: 0 }
        : {
            duration: 1.15,
            ease: easeCinematic,
            delay,
          },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
