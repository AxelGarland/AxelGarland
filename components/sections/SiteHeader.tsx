"use client";

import { HalftoneLogo } from "@/components/sections/HalftoneLogo";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NAV_ITEMS: readonly { label: string; href: string; section?: string }[] = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/#work", section: "/work" },
  { label: "Contact", href: "/contact" },
];

/** Work sends people to the work section of the home page, so on the home page "Home" is the one
 *  marked; "Work" is marked while a project's own page is open. */
function isActive(pathname: string, item: { href: string; section?: string }): boolean {
  if (item.section) return pathname === item.section || pathname.startsWith(`${item.section}/`);
  if (item.href === "/") return pathname === "/";
  return pathname === item.href || pathname.startsWith(`${item.href}/`);
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-[60] flex min-h-[68px] w-full items-center border-b border-line bg-surface/90 backdrop-blur-[12px]">
      <nav
        aria-label="Primary"
        className="mx-auto flex w-full max-w-content items-center justify-between px-6 py-4 sm:px-10 md:px-14 lg:px-16"
      >
        <Link
          href="/"
          className="inline-flex items-center transition-opacity duration-300 hover:opacity-75 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          onClick={() => setOpen(false)}
        >
          <HalftoneLogo />
        </Link>

        <ul className="hidden list-none items-center gap-8 md:flex lg:gap-10">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item);
            if (active) {
              return (
                <li key={item.label}>
                  <span
                    aria-current="page"
                    className="inline-flex items-center gap-2 whitespace-nowrap text-[0.78rem] font-medium uppercase tracking-[0.14em] text-ink"
                  >
                    {item.label}
                    <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  </span>
                </li>
              );
            }
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className="whitespace-nowrap text-[0.78rem] font-medium uppercase tracking-[0.14em] text-ink-muted transition-colors duration-300 hover:text-ink"
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
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

      {open ? (
        <div className="absolute inset-x-0 top-full flex flex-col border-b border-line bg-surface px-6 py-6 md:hidden">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className={`flex items-center gap-2 border-b border-line py-3 text-sm font-medium uppercase tracking-[0.12em] ${
                isActive(pathname, item) ? "text-ink" : "text-ink-muted"
              }`}
            >
              {item.label}
              {isActive(pathname, item) ? (
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
              ) : null}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
