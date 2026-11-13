import { ClosingBlock } from "@/components/sections/ClosingBlock";
import { CopyEmail } from "@/components/sections/CopyEmail";
import Link from "next/link";

const EMAIL = "axelgrobman@gmail.com";

const links = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/axel-garland-138188292/" },
  { label: "CV", href: "/Axel%20Garland%20CV.pdf" },
] as const;

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Contact", href: "/contact" },
] as const;

/** One link style for everything in the footer: 14px, 44px tall, the same gaps, the same yellow focus
 *  ring (the footer is dark, so the site's red would not show). */
const LINK =
  "inline-flex min-h-[44px] items-center text-sm uppercase tracking-[0.08em] text-surface/70 transition-colors duration-300 hover:text-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pencil";

export function SiteFooter({ closing = true }: { closing?: boolean }) {
  return (
    <>
      {closing ? <ClosingBlock /> : null}
      <footer className="bg-ink py-12 text-surface md:py-16">
        <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
          <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4">
            <p className="font-display text-lg tracking-tight text-surface">Axel Garland</p>
            <nav aria-label="Footer navigation">
              <ul className="m-0 flex list-none flex-wrap gap-x-8 p-0">
                {navLinks.map((item) => (
                  <li key={item.label}>
                    <Link href={item.href} className={LINK}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-x-8 gap-y-3 border-t border-surface/10 pt-6">
            <ul className="m-0 flex list-none flex-wrap items-center gap-x-8 p-0">
              <li>
                <CopyEmail email={EMAIL} className={LINK}>
                  Email
                </CopyEmail>
              </li>
              {links.map((item) => (
                <li key={item.label}>
                  <a href={item.href} target="_blank" rel="noopener noreferrer" className={LINK}>
                    {item.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
            <p className="text-sm text-surface/60">© {new Date().getFullYear()} Axel Garland</p>
          </div>
        </div>
      </footer>
    </>
  );
}
