"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { pictureSrc } from "@/lib/pictures";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const EASE = [0.22, 1, 0.36, 1] as const;

export function HeroSection() {
  const reduce = useHydrationSafeReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? undefined : { opacity: 0, y: 18 },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  return (
    <header className="relative overflow-hidden bg-surface pt-[68px]">
      <div className="relative mx-auto flex max-w-content flex-col px-6 pt-14 sm:px-10 md:min-h-[calc(100svh-68px)] md:justify-end md:px-14 md:pb-20 md:pt-14 lg:px-16 lg:pb-24">
        <div className="relative z-10 md:max-w-[62%]">
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

        {/* The portrait sits on a flat yellow disc (the pencil's yellow) and runs off the bottom
            edge of the page, so the illustration breaks out of its box instead of being framed. */}
        <div className="relative mx-auto -mb-[9%] mt-12 aspect-square w-[92%] max-w-[30rem] md:absolute md:-bottom-[5%] md:right-[-5vw] md:mx-0 md:mb-0 md:mt-0 md:w-[min(56vw,54rem)] md:max-w-none">
          {/* Only the disc animates: it grows out from its own centre behind the portrait. */}
          <motion.div
            aria-hidden
            initial={reduce ? undefined : { scale: 0 }}
            animate={reduce ? undefined : { scale: 1 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.15 }}
            className="absolute left-[9%] top-[8%] h-[82%] w-[82%] origin-center rounded-full bg-pencil"
          />
          <div className="absolute inset-0">
            <Image
              src={pictureSrc("Axel self illustration final.png")}
              alt="Illustrated self-portrait of Axel Garland"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 768px) 92vw, 56vw"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
