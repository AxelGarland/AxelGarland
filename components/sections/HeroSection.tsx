"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { motion } from "framer-motion";

export function HeroSection() {
  const reduce = useHydrationSafeReducedMotion();

  return (
    <header className="relative flex flex-1 min-h-min flex-col justify-center px-6 pb-6 pt-24 sm:px-10 sm:pb-8 sm:pt-28 md:px-14 md:pb-10 lg:px-16 lg:pb-12">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-glow-radial" />
        <div className="absolute inset-0 bg-glow-corner" />
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
          className="absolute bottom-[8%] right-[-12%] h-[min(45vw,480px)] w-[min(45vw,480px)] rounded-full bg-[rgba(109,126,179,0.11)] blur-[90px]"
          animate={
            reduce ? undefined : { opacity: [0.25, 0.42, 0.3], x: [0, -16, 0] }
          }
          transition={
            reduce
              ? undefined
              : { duration: 28, repeat: Infinity, ease: "easeInOut" }
          }
        />
        <div className="animate-drift-slow absolute inset-0 bg-gradient-to-br from-surface via-transparent to-surface-elevated/40" />
        <div className="animate-drift-medium absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,rgba(109,126,179,0.07),transparent_52%)]" />
        <Particles reduce={reduce} />
      </div>

      <div className="relative z-10 mx-auto grid w-full max-w-content gap-10 md:grid-cols-[1.2fr_1fr] md:items-center md:gap-12 lg:gap-16">
        <div>
          <h1 className="font-display whitespace-nowrap text-[clamp(2rem,5.5vw,4.25rem)] font-medium leading-[0.92] tracking-[-0.03em] text-ink">
            Axel Garland
          </h1>
          <p className="mt-3 font-display text-lg font-medium tracking-tight text-ink-muted md:text-xl">
            Designer &middot; Illustration &middot; AI
          </p>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-relaxed text-[rgba(12,12,14,0.85)] md:mt-7 md:text-lg md:leading-relaxed">
            <p>
              B.A. Visual Communication Design, Shenkar College. Currently working as a designer
              at Alut, where I also built their AI recruitment assistant.
            </p>
            <p>
              My work moves between illustration, branding, and applied AI, usually more than
              one at a time.
            </p>
          </div>
        </div>

        {/* Self-portrait illustration slot — drop the file in /pictures and I'll wire it in */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg border-2 border-coral bg-coral-soft md:aspect-square">
          <div className="flex h-full items-center justify-center p-8">
            <span className="text-center text-xs font-medium uppercase tracking-[0.2em] text-ink-subtle">
              Self-portrait illustration coming soon
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

function Particles({ reduce }: { reduce: boolean }) {
  if (reduce) return null;

  const seeds = [
    { l: "12%", t: "22%", s: 2, d: 0 },
    { l: "28%", t: "68%", s: 1.5, d: 2 },
    { l: "72%", t: "18%", s: 1.2, d: 4 },
    { l: "84%", t: "42%", s: 2.2, d: 1 },
    { l: "46%", t: "38%", s: 1.4, d: 3 },
    { l: "18%", t: "48%", s: 1.8, d: 5 },
    { l: "62%", t: "72%", s: 1.1, d: 2.5 },
  ];

  return (
    <div aria-hidden className="absolute inset-0">
      {seeds.map((p, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-ink/18 shadow-[0_0_14px_rgba(12,12,14,0.08)]"
          style={{
            left: p.l,
            top: p.t,
            width: p.s,
            height: p.s,
          }}
          animate={{
            y: [0, -10, 4, 0],
            opacity: [0.2, 0.55, 0.35, 0.2],
          }}
          transition={{
            duration: 14 + p.d,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.d,
          }}
        />
      ))}
    </div>
  );
}
