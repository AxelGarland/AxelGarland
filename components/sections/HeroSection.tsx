"use client";

import { HeroPortrait } from "@/components/sections/HeroPortrait";
import { HalftoneButton } from "@/components/sections/HalftoneButton";
import { HalftoneName } from "@/components/sections/HalftoneName";
import { MotionConfig, motion } from "framer-motion";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  // The entrance always ends in the visible state. Reduced motion is handled by MotionConfig below,
  // which drops the movement and keeps a plain fade, so the text can never be left hidden (the old
  // version removed `animate` once reduced motion was detected, after the text had already been
  // hidden by `initial`).
  const rise = (delay: number) => ({
    initial: { opacity: 0, y: 18 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  return (
    <MotionConfig reducedMotion="user">
    <header className="relative overflow-hidden bg-surface pt-[68px]">
      <div className="relative mx-auto flex max-w-content flex-col px-6 pt-14 sm:px-10 md:min-h-[calc(100svh-68px)] md:flex-row md:items-center md:justify-between md:gap-10 md:px-14 md:py-14 lg:gap-16 lg:px-16">
        <div className="relative z-10 md:min-w-0 md:flex-1">
          <motion.div {...rise(0.1)} className="mb-6 sm:mb-7">
            <HalftoneName />
          </motion.div>

          <motion.p {...rise(0.22)} className="mb-10 text-xl text-ink-muted sm:text-2xl">
            product designer<span aria-hidden className="mx-3 text-accent">&middot;</span>illustrator
          </motion.p>

          <motion.div {...rise(0.34)} className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <div className="transition-transform duration-300 motion-safe:hover:-translate-y-0.5 motion-safe:active:scale-[0.97]">
              <HalftoneButton href="#work" label="See my work" />
            </div>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center border-b border-line text-sm uppercase tracking-[0.08em] text-ink-muted transition-colors duration-300 hover:border-accent hover:text-accent"
            >
              Get in touch
            </Link>
          </motion.div>
        </div>

        {/* The portrait: a round crop of the photo that pixelates and redraws itself in a loop. */}
        <motion.div
          initial={{ y: 28 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
          className="relative mx-auto mb-16 mt-14 aspect-square w-[72%] max-w-[20rem] md:mx-0 md:mb-0 md:mt-0 md:h-[min(76svh,44vw,46rem)] md:w-[min(76svh,44vw,46rem)] md:max-w-none md:shrink-0"
        >
          <HeroPortrait />
        </motion.div>
      </div>
    </header>
    </MotionConfig>
  );
}
