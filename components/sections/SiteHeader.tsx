"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteHeader() {
  return (
    <header
      className="fixed inset-x-0 top-0 z-[60] w-full border-b border-ink/[0.07] bg-surface/85 backdrop-blur-[12px]"
    >
      <nav
        aria-label="Primary"
        className="mx-auto flex max-w-content items-center justify-between px-6 py-5 sm:px-10 md:px-14 lg:px-16"
      >
        <Link
          href="/"
          className="font-display text-base font-medium tracking-tight text-ink transition-colors duration-500 hover:text-ink/70"
        >
          Axel Garland
        </Link>
        <ul className="flex list-none items-center gap-7 sm:gap-9">
          {NAV_ITEMS.map((item) => (
            <li key={item.label}>
              <motion.div whileHover={{ y: -1 }} transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}>
                <Link
                  href={item.href}
                  className="group relative inline-block whitespace-nowrap font-display text-[0.78rem] font-medium uppercase tracking-[0.16em] text-ink-muted transition-colors duration-500 hover:text-ink"
                >
                  <span className="relative">
                    {item.label}
                    <span className="absolute -bottom-px left-0 h-px w-0 bg-ink/40 transition-all duration-500 group-hover:w-full" />
                  </span>
                </Link>
              </motion.div>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
