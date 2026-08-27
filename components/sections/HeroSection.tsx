"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { pictureSrc } from "@/lib/pictures";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/** Evenly fanned upward arc (-170deg to -10deg, centered on straight-up at -90deg) so every star
 *  bursts up and outward from the button rather than drifting sideways or down. Fixed, not
 *  Math.random() — deterministic like StarField, and it means every click looks intentional. */
const STAR_BURST = [
  { angle: -170, distance: 58, size: 10, delay: 0 },
  { angle: -147, distance: 88, size: 14, delay: 0.03 },
  { angle: -124, distance: 68, size: 9, delay: 0.06 },
  { angle: -101, distance: 102, size: 16, delay: 0.01 },
  { angle: -78, distance: 100, size: 15, delay: 0.05 },
  { angle: -55, distance: 70, size: 10, delay: 0.02 },
  { angle: -32, distance: 90, size: 13, delay: 0.07 },
  { angle: -10, distance: 56, size: 9, delay: 0.04 },
].map((s) => {
  const rad = (s.angle * Math.PI) / 180;
  return { ...s, dx: Math.cos(rad) * s.distance, dy: Math.sin(rad) * s.distance };
});

function SparkleStar({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2 L14.5 9.5 L22 12 L14.5 14.5 L12 22 L9.5 14.5 L2 12 L9.5 9.5 Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function HeroSection() {
  const reduce = useHydrationSafeReducedMotion();
  const [burstId, setBurstId] = useState(0);

  return (
    <header className="relative flex flex-1 min-h-min flex-col justify-center overflow-hidden bg-paper pb-16 pt-24 sm:pb-20 sm:pt-28 md:pb-24 lg:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[-24%] top-[14%] h-[min(68vw,760px)] w-[min(68vw,760px)] rounded-full bg-blush-soft blur-[110px]"
          animate={
            reduce
              ? undefined
              : { opacity: [0.3, 0.5, 0.35], scale: [1, 1.06, 1.02] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 22, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <motion.div
          className="absolute bottom-[4%] right-[-16%] h-[min(56vw,600px)] w-[min(56vw,600px)] rounded-full bg-blush-soft blur-[95px]"
          animate={
            reduce ? undefined : { opacity: [0.22, 0.4, 0.28], x: [0, -16, 0] }
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
          <div className="inline-block">
            <h1 className="font-display whitespace-nowrap text-[clamp(2rem,5.5vw,4.25rem)] font-medium leading-[0.92] tracking-[-0.03em] text-ink">
              Axel Garland
            </h1>
            <div className="mt-3 flex w-full items-center justify-between font-display text-lg font-medium tracking-tight text-ink-muted md:text-xl">
              <span>Design</span>
              <span>Illustration</span>
              <span>AI</span>
            </div>
          </div>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-ink md:text-lg md:leading-relaxed">
            <p>
              I&rsquo;m a visual communication designer and illustrator, recently graduated from
              Shenkar College.
            </p>
            <p>
              My work moves between illustration, branding, and digital experiences, often
              combining hands-on making with emerging technologies. I&rsquo;m drawn to
              storytelling, playful experimentation, and finding unexpected ways to bring ideas
              to life.
            </p>
          </div>
          <div className="mt-8 md:mt-9">
            <Link
              href="/contact"
              className="text-sm text-ink-muted underline underline-offset-4 transition-colors duration-300 hover:text-ink active:text-accent"
            >
              Contact
            </Link>
          </div>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden md:aspect-square">
          <Image
            src={pictureSrc("Axel self illustration final.png")}
            alt="Illustrated self-portrait of Axel Garland"
            fill
            priority
            className="object-contain p-4"
            sizes="(max-width: 768px) 100vw, 40vw"
          />
        </div>
      </div>

      <div className="relative z-10 mt-16 flex justify-center md:mt-20 lg:mt-24">
        <div className="relative">
          <div aria-hidden className="pointer-events-none absolute bottom-0 left-1/2 h-0 w-0">
            {!reduce && burstId > 0
              ? STAR_BURST.map((s, i) => (
                  <motion.span
                    key={`${burstId}-${i}`}
                    className="absolute left-0 top-0 text-pencil"
                    initial={{ opacity: 1, scale: 0.3, x: 0, y: 0 }}
                    animate={{ opacity: 0, scale: 1, x: s.dx, y: s.dy }}
                    transition={{ duration: 0.75, delay: s.delay, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <SparkleStar size={s.size} />
                  </motion.span>
                ))
              : null}
          </div>

          <motion.div
            whileHover={reduce ? undefined : { y: -3 }}
            whileTap={reduce ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="#work"
              onClick={() => setBurstId((n) => n + 1)}
              className="relative z-10 inline-flex items-center gap-3 bg-pencil px-12 py-5 font-display text-lg font-medium tracking-tight text-ink shadow-[0_20px_45px_-20px_rgba(254,183,40,0.55)] transition-colors duration-300 hover:bg-ink hover:text-pencil md:px-16 md:py-6 md:text-xl"
            >
              Work
              <span aria-hidden className="text-base md:text-lg">
                &darr;
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
