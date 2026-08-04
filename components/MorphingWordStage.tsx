"use client";

import { useHydrationSafeReducedMotion } from "@/hooks/useHydrationSafeReducedMotion";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["design", "Illustration", "AI"] as const;

/** Same words cycle in order design → Illustration → AI; after all three, the next “round” uses a new font/color mix (this many rounds total). */
const VARIANTS_PER_WORD = 3;

const TOTAL_STEPS = WORDS.length * VARIANTS_PER_WORD;

/** Pool of distinctive fonts — pick per letter with a deterministic hash (feels random, no hydration jump). */
const FONT_KEYS = [
  "font-display",
  "font-sans",
  "font-serif",
  "font-mono",
  "font-bebas",
  "font-playfair",
  "font-space",
  "font-syne",
] as const;

/** Red, gray, black — mixed per letter via hash */
const LETTER_COLORS = ["text-red-700", "text-zinc-500", "text-black"] as const;

function letterFontKey(
  word: string,
  letterIndex: number,
  variantIndex: number,
): (typeof FONT_KEYS)[number] {
  let h = 2166136261;
  const s = `${word}:${letterIndex}:v${variantIndex}`;
  for (let k = 0; k < s.length; k++) {
    h ^= s.charCodeAt(k);
    h = Math.imul(h, 16777619);
  }
  return FONT_KEYS[Math.abs(h | 0) % FONT_KEYS.length]!;
}

function letterColorKey(word: string, letterIndex: number, variantIndex: number): string {
  let h = 5381;
  const s = `${word}|${letterIndex}|v${variantIndex}`;
  for (let k = 0; k < s.length; k++) {
    h = (h * 33) ^ s.charCodeAt(k);
  }
  return LETTER_COLORS[Math.abs(h | 0) % LETTER_COLORS.length]!;
}

function isItalicFont(key: (typeof FONT_KEYS)[number]): boolean {
  return key === "font-serif" || key === "font-playfair";
}

const HOLD_MS = 4000;
const EASE = [0.22, 1, 0.36, 1] as const;

function containerVariants(reduce: boolean) {
  if (reduce) {
    return {
      hidden: {},
      show: {},
      exit: {},
    };
  }
  return {
    hidden: {
      transition: { staggerChildren: 0.045, delayChildren: 0.04 },
    },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.045, delayChildren: 0.04 },
    },
    exit: {
      transition: { staggerChildren: 0.028, staggerDirection: -1 },
    },
  };
}

function letterVariants(reduce: boolean, i: number) {
  if (reduce) {
    return { hidden: {}, show: {}, exit: {} };
  }
  const tilt = i % 2 === 0 ? -1 : 1;
  return {
    hidden: {
      opacity: 0,
      y: 18 * tilt,
      x: 8 * (i % 3 === 0 ? 1 : -1),
      filter: "blur(10px)",
      scale: 0.82,
    },
    show: {
      opacity: 1,
      y: 0,
      x: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: { duration: 0.575, ease: EASE },
    },
    exit: {
      opacity: 0,
      y: -14 * tilt,
      x: -10 * (i % 2 === 0 ? 1 : -1),
      filter: "blur(12px)",
      scale: 0.72,
      transition: { duration: 0.45, ease: EASE },
    },
  };
}

type DustSpec = { id: number; x: string; y: string; delay: number };

const DUST: DustSpec[] = [
  { id: 0, x: "8%", y: "35%", delay: 0 },
  { id: 1, x: "55%", y: "20%", delay: 0.175 },
  { id: 2, x: "92%", y: "45%", delay: 0.35 },
  { id: 3, x: "70%", y: "75%", delay: 0.075 },
];

export function MorphingWordStage() {
  const reduce = useHydrationSafeReducedMotion();
  const [step, setStep] = useState(0);
  const wordIndex = step % WORDS.length;
  const variantIndex = Math.floor(step / WORDS.length) % VARIANTS_PER_WORD;
  const word = WORDS[wordIndex];

  useEffect(() => {
    if (reduce) return;
    const t = window.setTimeout(() => {
      setStep((s) => (s + 1) % TOTAL_STEPS);
    }, HOLD_MS);
    return () => window.clearTimeout(t);
  }, [step, reduce]);

  useEffect(() => {
    if (!reduce) return;
    const t = window.setInterval(() => {
      setStep((s) => (s + 1) % TOTAL_STEPS);
    }, HOLD_MS);
    return () => window.clearInterval(t);
  }, [reduce]);

  const cVar = containerVariants(reduce);
  const frameKey = `${word}-v${variantIndex}`;

  return (
    <div
      className="relative inline-flex min-h-[1.2em] min-w-0 max-w-full w-max items-baseline"
      role="img"
      aria-label={`Animated type: ${WORDS.join(", ")} in repeating order — each pass uses a different style`}
    >
      {reduce ? (
        <p className="max-w-none whitespace-nowrap bg-clip-text font-display text-[clamp(2.35rem,6vw,4.65rem)] font-medium tracking-tight text-transparent bg-[linear-gradient(90deg,#b91c1c_0%,#71717a_50%,#000_100%)] lg:text-[clamp(2.5rem,4.6vw,5.1rem)]">
          {word}
        </p>
      ) : (
        <>
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-x-2 -inset-y-3 overflow-visible"
          >
            {DUST.map((d) => (
              <motion.span
                key={`${frameKey}-${d.id}`}
                className="absolute h-1.5 w-1.5 rounded-full bg-red-600/55"
                style={{ left: d.x, top: d.y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.9, 0.4, 0.85, 0],
                  scale: [0.35, 1.1, 0.55, 1.05, 0.25],
                  y: [0, -6, 3, -4, 2],
                }}
                transition={{
                  duration: HOLD_MS / 1000,
                  ease: "easeInOut",
                  delay: d.delay,
                  times: [0, 0.22, 0.48, 0.74, 1],
                }}
              />
            ))}
          </div>

          <div className="relative flex items-baseline">
            <AnimatePresence mode="wait">
              <motion.div
                key={frameKey}
                className="flex flex-nowrap items-baseline whitespace-nowrap gap-x-0.5 sm:gap-x-1"
                variants={cVar}
                initial="hidden"
                animate="show"
                exit="exit"
              >
                {word.split("").map((char, i) => {
                  const fontKey = letterFontKey(word, i, variantIndex);
                  const color = letterColorKey(word, i, variantIndex);
                  return (
                    <motion.span
                      key={`${frameKey}-${i}-${char}`}
                      className={`inline-block ${color} ${fontKey} ${
                        isItalicFont(fontKey) ? "italic" : ""
                      } ${fontKey === "font-bebas" ? "tracking-tight" : ""} ${fontKey === "font-mono" ? "tracking-tighter" : ""} text-[clamp(2rem,4.6vw,4.55rem)] font-medium leading-none tracking-tight sm:text-[clamp(2.15rem,4.25vw,4.95rem)] lg:text-[clamp(2.35rem,3.95vw,5.4rem)]`}
                      variants={letterVariants(reduce, i)}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </>
      )}

      <p className="sr-only" aria-live="polite">
        {word}
      </p>
    </div>
  );
}
