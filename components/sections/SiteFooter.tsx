const links = [
  { label: "Email", href: "mailto:hello@axelgarland.com", external: false },
  { label: "LinkedIn", href: "https://www.linkedin.com/", external: true },
  { label: "Instagram", href: "https://www.instagram.com/", external: true },
  { label: "CV", href: "#", external: false },
] as const;

export function SiteFooter() {
  return (
    <footer className="py-12">
      <div className="mx-auto flex max-w-content flex-col gap-10 px-6 sm:px-10 md:flex-row md:items-end md:justify-between md:px-14 lg:px-16">
        <div>
          <p className="font-display text-lg tracking-tight text-mist">Axel Garland</p>
        </div>
        <nav aria-label="Contact and links">
          <ul className="flex flex-col gap-4 sm:flex-row sm:gap-10">
            {links.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  {...(item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="text-sm text-mist-muted transition-colors duration-500 hover:text-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  {item.label}
                  {item.external ? (
                    <span className="sr-only"> (opens in a new tab)</span>
                  ) : null}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-content px-6 text-xs text-mist-subtle sm:px-10 md:mt-12 md:px-14 lg:px-16">
        © {new Date().getFullYear()} Axel Garland. All rights reserved.
      </p>
    </footer>
  );
}
