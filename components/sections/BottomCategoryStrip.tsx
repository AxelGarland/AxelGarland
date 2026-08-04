"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const CATEGORIES = [
  { label: "Illustration", href: "/illustration" },
  { label: "Interactive", href: "#" },
  { label: "About", href: "#" },
] as const;

export function BottomCategoryStrip() {
  return (
    <nav
      id="categories"
      aria-label="Practice categories"
      className="relative z-20 w-full shrink-0 border-t border-ink/[0.07] bg-gradient-to-t from-surface-raised/40 to-surface/92 px-4 py-6 shadow-[0_-8px_32px_-16px_rgba(12,12,14,0.06)] backdrop-blur-[12px] sm:px-10 sm:py-7 md:px-14 lg:px-16"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/10 to-transparent" />
      <ul className="mx-auto flex max-w-content list-none flex-row flex-nowrap items-center gap-6 overflow-x-auto py-0.5 [scrollbar-width:none] md:grid md:grid-cols-3 md:justify-items-center md:gap-4 md:overflow-visible lg:gap-6 [&::-webkit-scrollbar]:hidden">
        {CATEGORIES.map((item) => {
          const className =
            "group relative inline-block whitespace-nowrap font-display text-[0.78rem] font-medium uppercase tracking-[0.16em] text-ink-muted transition-colors duration-500 hover:text-ink sm:text-[0.8rem] md:tracking-[0.18em]";
          const inner = (
            <span className="relative">
              {item.label}
              <span className="absolute -bottom-px left-0 h-px w-0 bg-ink/40 transition-all duration-500 group-hover:w-full" />
            </span>
          );
          return (
            <li key={item.label} className="shrink-0 md:shrink md:w-full md:text-center">
              {item.href.startsWith("/") ? (
                <motion.div
                  className="inline-block"
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link href={item.href} className={className}>
                    {inner}
                  </Link>
                </motion.div>
              ) : (
                <motion.a
                  href={item.href}
                  className={className}
                  whileHover={{ y: -1 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  {inner}
                </motion.a>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
