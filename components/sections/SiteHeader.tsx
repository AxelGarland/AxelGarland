"use client";

import { HalftoneLogo } from "@/components/sections/HalftoneLogo";
import { PRODUCT_WORK, VISUAL_WORK } from "@/lib/workCards";
import { MotionConfig, motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const NAV_ITEMS: readonly { label: string; href: string; section?: string }[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work", section: "/work" },
  { label: "Contact", href: "/contact" },
];

/** The name shown in the compact bar once a project page is scrolled past its opening. */
const CASE_TITLES: Record<string, string> = Object.fromEntries([...PRODUCT_WORK, ...VISUAL_WORK].map((c) => [c.slug, c.title]));

/** Work leads to the work section of the home page. On the home page the marked item follows the
 *  scroll: "Home" above the work section, "Work" once it reaches the middle of the screen. "Work" is
 *  also marked while a project's own page is open. */
function isActive(pathname: string, item: { href: string; section?: string }, inWork: boolean): boolean {
  if (item.section) return pathname === item.section || pathname.startsWith(`${item.section}/`) || (pathname === "/" && inWork);
  if (item.href === "/") return pathname === "/" && !inWork;
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [inWork, setInWork] = useState(false);
  const burger = useRef<HTMLButtonElement>(null);

  // On a project page, once the opening has scrolled away the header turns into a compact bar: a way
  // back to that project's card on the home page, and the project's name. It switches a little later
  // going down than coming back up, so it never flickers at the threshold.
  const caseSlug = pathname.startsWith("/work/") ? (pathname.split("/")[2] ?? null) : null;
  const caseTitle = caseSlug ? CASE_TITLES[caseSlug] : undefined;
  const [deep, setDeep] = useState(false);
  useEffect(() => {
    if (!caseTitle) {
      setDeep(false);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const t = window.innerHeight * 0.75;
      setDeep((was) => (was ? window.scrollY > t * 0.85 : window.scrollY > t));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname, caseTitle]);
  const compact = deep && Boolean(caseTitle);
  useEffect(() => {
    if (compact) setOpen(false);
  }, [compact]);

  // Escape closes the mobile menu and returns focus to its button.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        burger.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // On the home page, watch where the work section is and mark "Work" once it is under the middle of
  // the screen. Reading its position on scroll is cheap and works for links that jump straight to it.
  useEffect(() => {
    if (pathname !== "/") {
      setInWork(false);
      return;
    }
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = document.getElementById("work");
      if (!el) {
        setInWork(false);
        return;
      }
      const top = el.getBoundingClientRect().top;
      // Hysteresis: switch to Work at the middle of the screen, back to Home only a little below it.
      setInWork((was) => (was ? top < window.innerHeight * 0.62 : top < window.innerHeight * 0.5));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return (
    <MotionConfig reducedMotion="user">
    <header
      className={`fixed inset-x-0 top-0 z-[60] flex w-full items-center border-b border-line bg-surface/95 pt-[env(safe-area-inset-top)] backdrop-blur-[12px] transition-[min-height] duration-300 ${
        compact ? "min-h-[48px]" : "min-h-[68px]"
      }`}
    >
      {compact ? (
        <nav
          aria-label="Project"
          className="mx-auto flex w-full max-w-content items-center justify-between gap-6 px-6 sm:px-10 md:px-14 lg:px-16"
        >
          <Link
            href={`/#work-${caseSlug}`}
            className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap text-sm font-medium uppercase tracking-[0.14em] text-ink-muted transition-colors duration-300 hover:text-ink"
          >
            <span aria-hidden>&larr;</span>
            Work
          </Link>
          <span className="truncate text-sm font-semibold uppercase tracking-[0.12em] text-ink">{caseTitle}</span>
        </nav>
      ) : (
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-content items-center justify-between px-6 py-4 sm:px-10 md:px-14 lg:px-16"
      >
        <Link
          href="/"
          className="inline-flex min-h-[44px] items-center transition-opacity duration-300 hover:opacity-75"
          onClick={() => setOpen(false)}
        >
          <HalftoneLogo />
        </Link>

        <ul className="hidden list-none items-center gap-8 md:flex lg:gap-10">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item, inWork);
            if (active) {
              return (
                <li key={item.label}>
                  <span
                    aria-current="page"
                    className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap text-sm font-medium uppercase tracking-[0.14em] text-ink"
                  >
                    {item.label}
                    <motion.span
                      aria-hidden
                      layoutId="nav-dot"
                      transition={{ type: "spring", stiffness: 520, damping: 38 }}
                      className="h-1.5 w-1.5 rounded-full bg-accent"
                    />
                  </span>
                </li>
              );
            }
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-[44px] items-center whitespace-nowrap text-sm font-medium uppercase tracking-[0.14em] text-ink-muted transition-colors duration-300 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          ref={burger}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 md:hidden"
        >
          <span
            aria-hidden
            className={`block h-px w-5 bg-ink transition-transform duration-300 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            aria-hidden
            className={`block h-px w-5 bg-ink transition-transform duration-300 ${
              open ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>
      )}

      {open && !compact ? (
        <div id="mobile-menu" className="absolute inset-x-0 top-full flex flex-col border-b border-line bg-surface px-6 py-6 md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(pathname, item, inWork) ? "page" : undefined}
              className={`flex min-h-[44px] items-center gap-2 border-b border-line py-3 text-sm font-medium uppercase tracking-[0.12em] ${
                isActive(pathname, item, inWork) ? "text-ink" : "text-ink-muted"
              }`}
            >
              {item.label}
              {isActive(pathname, item, inWork) ? (
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              ) : null}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
    </MotionConfig>
  );
}
