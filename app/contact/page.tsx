import { ContactForm } from "@/components/sections/ContactForm";
import { CopyEmail } from "@/components/sections/CopyEmail";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { pageMetadata } from "@/lib/seo";
import type { Metadata } from "next";

const TITLE = "Contact · Axel Garland";
const DESCRIPTION = "Get in touch with Axel Garland about product design roles, contract work or collaborations.";

export const metadata: Metadata = pageMetadata({ title: TITLE, description: DESCRIPTION, path: "/contact" });

const LINK =
  "inline-flex min-h-[44px] w-fit items-center border-b border-line text-base font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-accent-ink";

export default function ContactPage() {
  return (
    <>
      <main id="main" className="flex min-h-[100dvh] flex-col bg-surface pb-24 pt-32 sm:pt-36">
        <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-14 px-6 sm:px-10 md:grid-cols-2 md:gap-20 md:px-14 lg:px-16">
          <div>
            <h1 className="type-title mb-6 font-display text-ink">
              Let&rsquo;s talk about
              <br />
              what&rsquo;s <em className="italic text-accent">next</em>
            </h1>
            <p className="mb-10 max-w-[42ch] text-base leading-relaxed text-ink-muted md:text-lg">
              I recently graduated from Shenkar. I&rsquo;m available for product design roles
              (UX/UI), contract work and collaborations. Send me a note and I&rsquo;ll reply soon.
            </p>

            {/* Contact details: a red dot, a quiet label, and a link at least 44px tall. */}
            <dl className="m-0 flex flex-col gap-6">
              <div>
                <dt className="flex items-center gap-3 text-sm uppercase tracking-[0.1em] text-ink-subtle">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Email
                </dt>
                <dd className="m-0 pl-[1.125rem]">
                  <CopyEmail email="axelgrobman@gmail.com" className={LINK} />
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-3 text-sm uppercase tracking-[0.1em] text-ink-subtle">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Based in
                </dt>
                <dd className="m-0 flex min-h-[44px] items-center pl-[1.125rem] text-base font-medium text-ink">
                  Tel Aviv
                </dd>
              </div>
              <div>
                <dt className="flex items-center gap-3 text-sm uppercase tracking-[0.1em] text-ink-subtle">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
                  Links
                </dt>
                <dd className="m-0 flex flex-wrap gap-x-8 pl-[1.125rem]">
                  <a
                    href="https://www.linkedin.com/in/axel-garland-138188292/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={LINK}
                  >
                    LinkedIn
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                  <a href="/Axel%20Garland%20CV.pdf" target="_blank" rel="noopener noreferrer" className={LINK}>
                    Download CV
                    <span className="sr-only"> (PDF, opens in a new tab)</span>
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div className="border border-line bg-paper p-8 md:p-10">
            <ContactForm />
          </div>
        </div>
      </main>
      <SiteFooter closing={false} />
    </>
  );
}
