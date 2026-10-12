import { ClosingBlock } from "@/components/sections/ClosingBlock";
const links = [
  { label: "Email", href: "mailto:axelgrobman@gmail.com", external: false },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/axel-garland-138188292/", external: true },
  { label: "CV", href: "/Axel%20Garland%20CV.pdf", external: true },
] as const;

const navLinks = [
  { label: "Work", href: "/work" },
  { label: "Contact", href: "/contact" },
] as const;

export function SiteFooter({ closing = true }: { closing?: boolean }) {
  return (
    <>
    {closing ? <ClosingBlock /> : null}
    <footer className="bg-ink py-12 text-surface md:py-16">
      <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <p className="font-display text-xl font-semibold tracking-tight text-surface">
            Axel<span className="text-pencil">.</span>Garland
          </p>
          <nav aria-label="Footer navigation">
            <ul className="flex flex-wrap gap-x-8">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="inline-block py-3 text-sm uppercase tracking-[0.08em] text-surface/70 transition-colors duration-300 hover:text-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pencil"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-surface/10 pt-6">
          <ul className="flex flex-wrap gap-x-6">
            {links.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-block py-3 text-sm text-surface/70 transition-colors duration-300 hover:text-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-pencil"
                >
                  {item.label}
                  {item.external ? <span className="sr-only"> (opens in a new tab)</span> : null}
                </a>
              </li>
            ))}
          </ul>
          <p className="text-xs text-surface/60">
            © {new Date().getFullYear()} Axel Garland. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
    </>
  );
}
