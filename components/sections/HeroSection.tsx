"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { pictureSrc } from "@/lib/pictures";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function HeroSection() {
  const reduce = useHydrationSafeReducedMotion();

  return (
    <header className="relative flex flex-1 min-h-min flex-col justify-center overflow-hidden bg-paper pb-6 pt-24 sm:pb-8 sm:pt-28 md:pb-10 lg:pb-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[-20%] top-[18%] h-[min(55vw,620px)] w-[min(55vw,620px)] rounded-full bg-accent-soft blur-[100px]"
          animate={
            reduce
              ? undefined
              : { opacity: [0.35, 0.55, 0.4], scale: [1, 1.06, 1.02] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 22, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute bottom-[8%] right-[-12%] h-[min(45vw,480px)] w-[min(45vw,480px)] rounded-full bg-coral-soft blur-[90px]"
          animate={
            reduce ? undefined : { opacity: [0.25, 0.42, 0.3], x: [0, -16, 0] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 28, repeat: Infinity, ease: "easeInOut" }
          }
        />
      </div>

      <div className="relative z-10 mx-auto grid max-w-content gap-10 px-6 sm:px-10 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-12 md:px-14 lg:gap-16 lg:px-16">
        <div>
          <h1 className="font-display whitespace-nowrap text-[clamp(2rem,5.5vw,4.25rem)] font-medium leading-[0.92] tracking-[-0.03em] text-ink">
            Axel Garland
          </h1>
          <p className="mt-3 font-display text-lg font-medium tracking-tight text-ink-muted md:text-xl">
            Designer &middot; Illustration &middot; AI
          </p>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink md:text-lg md:leading-relaxed">
            <p>
              B.A. Visual Communication Design, Shenkar College. Currently working as a designer
              at Alut, where I also built their AI recruitment assistant.
            </p>
            <p>
              My work moves between illustration, branding, and applied AI, usually more than
              one at a time.
            </p>
          </div>
          <div className="mt-8 flex items-center gap-6 md:mt-9">
            <Link
              href="#work"
              className="inline-block rounded border border-accent px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-300 hover:bg-accent-soft active:bg-accent active:text-surface"
            >
              View work
            </Link>
            <Link
              href="/contact"
              className="text-sm text-ink-muted underline underline-offset-4 transition-colors duration-300 hover:text-ink active:text-accent"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border-2 border-coral bg-paper md:aspect-square">
          <Image
            src={pictureSrc("Axel self illustration.png")}
            alt="Illustrated self-portrait of Axel Garland"
            fill
            priority
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </div>
    </header>
  );
}
