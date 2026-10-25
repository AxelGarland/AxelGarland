"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { HeroPortrait } from "@/components/sections/HeroPortrait";
import { OpenForWorkRing } from "@/components/sections/OpenForWorkRing";
import { MotionConfig, motion } from "framer-motion";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const reduce = useHydrationSafeReducedMotion();
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
          <motion.p
            {...rise(0)}
            className="mb-6 flex items-center gap-3 text-sm uppercase tracking-[0.12em] text-ink-muted"
          >
            <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            Product &amp; Visual Designer
          </motion.p>

          <motion.h1
            {...rise(0.1)}
            className="mb-9 font-display text-[clamp(4.75rem,12vw,10.5rem)] font-light leading-[0.86] tracking-[-0.03em] text-ink"
          >
            Axel
            <br />
            Garland
          </motion.h1>

          <motion.p
            {...rise(0.22)}
            className="mb-10 max-w-[40ch] text-lg leading-relaxed text-ink-muted"
          >
            I&rsquo;m a product &amp; visual designer, recently graduated from Shenkar College. I
            design interfaces and prototypes, and I illustrate: from tools that teams use every day
            to generative faces and illustrated worlds.
          </motion.p>

          <motion.div {...rise(0.34)} className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <motion.div
              whileHover={reduce ? undefined : { y: -2 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <Link
                href="#work"
                className="inline-flex min-h-[44px] items-center gap-2.5 bg-pencil px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-colors duration-300 hover:bg-ink hover:text-pencil focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path
                    d="M2 7h10M8 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                View Selected Work
              </Link>
            </motion.div>
            <Link
              href="/contact"
              className="inline-flex min-h-[44px] items-center border-b border-line text-sm uppercase tracking-[0.08em] text-ink-muted transition-colors duration-300 hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              Open to opportunities
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
          <OpenForWorkRing />
          <HeroPortrait />
        </motion.div>
      </div>
    </header>
    </MotionConfig>
  );
}
