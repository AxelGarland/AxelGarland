import { ContactFooter } from "@/components/sections/ContactFooter";
import { CopyEmail } from "@/components/sections/CopyEmail";
import Link from "next/link";

const EMAIL = "axelgrobman@gmail.com";

const LINK =
  "inline-flex min-h-[44px] items-center text-sm uppercase tracking-[0.08em] text-ink-muted transition-colors duration-300 hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

/** The end of every page. By default it is the "Let's talk." block with the painted portrait. Pages that
 *  already have their own way to get in touch (Contact, the 404) pass `closing={false}` and get a slim
 *  white footer with the same links instead. */
export function SiteFooter({ closing = true }: { closing?: boolean }) {
  return (
    <>
      {closing ? <ContactFooter /> : <SlimFooter />}
      <div className="border-t border-line bg-surface">
        <p className="mx-auto max-w-content px-6 py-6 text-sm text-ink-muted sm:px-10 md:px-14 lg:px-16">
          Website made by Axel Garland. All rights reserved &copy; {new Date().getFullYear()}.
        </p>
      </div>
    </>
  );
}

function SlimFooter() {
  return (
    <footer className="border-t border-line bg-surface py-10 md:py-12">
      <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-x-8 gap-y-3 px-6 sm:px-10 md:px-14 lg:px-16">
        <p className="font-display text-lg tracking-tight text-ink">Axel Garland</p>
        <ul className="m-0 flex list-none flex-wrap items-center gap-x-8 p-0">
          <li>
            <Link href="/#work" className={LINK}>
              Work
            </Link>
          </li>
          <li>
            <Link href="/contact" className={LINK}>
              Contact
            </Link>
          </li>
          <li>
            <CopyEmail email={EMAIL} className={LINK}>
              Email
            </CopyEmail>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/axel-garland-138188292/" target="_blank" rel="noopener noreferrer" className={LINK}>
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
          <li>
            <a href="/Axel%20Garland%20CV.pdf" target="_blank" rel="noopener noreferrer" className={LINK}>
              CV
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
