"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { pictureSrc } from "@/lib/pictures";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

/** Small blush-red dot used as a separator between the three tagline words — sampled from the
 *  self-portrait's cheek color, not a generic accent. */
function TaglineDot() {
  return <span aria-hidden className="h-2.5 w-2.5 shrink-0 rounded-full bg-blush md:h-3 md:w-3" />;
}

export function HeroSection() {
  const reduce = useHydrationSafeReducedMotion();

  return (
    <header className="relative flex flex-1 min-h-min flex-col justify-center overflow-hidden bg-surface pb-16 pt-24 sm:pb-20 sm:pt-28 md:pb-24 lg:pb-28">
      <div className="relative z-10 mx-auto grid max-w-content gap-10 px-6 sm:px-10 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-12 md:px-14 lg:gap-16 lg:px-16">
        <div>
          <div className="inline-block">
            <h1 className="font-display whitespace-nowrap text-[clamp(2rem,5.5vw,4.25rem)] font-medium leading-[0.92] tracking-[-0.03em] text-ink">
              Axel Garland
            </h1>
            <div className="mt-3 flex w-full items-center justify-between font-display text-lg font-medium tracking-tight text-ink-muted md:text-xl">
              <span>Design</span>
              <TaglineDot />
              <span>Illustration</span>
              <TaglineDot />
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
        <motion.div
          whileHover={reduce ? undefined : { y: -3 }}
          whileTap={reduce ? undefined : { scale: 0.97 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="#work"
            className="inline-flex items-center gap-3 bg-pencil px-12 py-5 font-display text-lg font-medium tracking-tight text-ink shadow-[0_20px_45px_-20px_rgba(254,183,40,0.55)] transition-colors duration-300 hover:bg-ink hover:text-pencil md:px-16 md:py-6 md:text-xl"
          >
            Work
            <span aria-hidden className="text-base md:text-lg">
              &darr;
            </span>
          </Link>
        </motion.div>
      </div>
    </header>
  );
}
