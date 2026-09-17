"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { pictureSrc } from "@/lib/pictures";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const reduce = useHydrationSafeReducedMotion();

  return (
    <header className="grid min-h-[100svh] grid-cols-1 pt-[68px] md:grid-cols-2">
      <div className="flex flex-col justify-end border-b border-line px-6 py-14 sm:px-10 md:border-b-0 md:border-r md:px-14 md:py-20 lg:px-16 lg:py-24">
        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 flex items-center gap-3 text-sm uppercase tracking-[0.12em] text-ink-muted"
        >
          <span aria-hidden className="h-px w-8 bg-accent" />
          Product &amp; Visual Designer
        </motion.p>

        <motion.h1
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
          className="mb-8 font-display text-[clamp(3rem,7.5vw,6rem)] font-light leading-[0.95] tracking-tight text-ink"
        >
          Axel<span className="text-accent">.</span>Garland
        </motion.h1>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.24 }}
          className="mb-10 max-w-[40ch] text-lg leading-relaxed text-ink-muted"
        >
          I&rsquo;m a product &amp; visual designer working across UX/UI and AI-assisted
          prototyping, recently graduated from Shenkar College. My work moves between
          illustration, branding, and digital experiences, often combining hands-on making with
          emerging technologies, drawn to storytelling, playful experimentation, and finding
          unexpected ways to bring ideas to life.
        </motion.p>

        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 16 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.36 }}
          className="flex flex-wrap items-center gap-8"
        >
          <motion.div
            whileHover={reduce ? undefined : { y: -2 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="#work"
              className="inline-flex min-h-[44px] items-center gap-2.5 bg-pencil px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.1em] text-ink transition-colors duration-300 hover:bg-ink hover:text-pencil"
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
            className="border-b border-line pb-0.5 text-sm uppercase tracking-[0.08em] text-ink-muted transition-colors duration-300 hover:border-ink hover:text-ink"
          >
            Open to projects
          </Link>
        </motion.div>
      </div>

      <div className="relative min-h-[320px] bg-surface-raised md:min-h-0">
        <Image
          src={pictureSrc("Axel self illustration final.png")}
          alt="Illustrated self-portrait of Axel Garland"
          fill
          priority
          className="object-cover object-top"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>
    </header>
  );
}
