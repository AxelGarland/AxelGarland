import { ContactForm } from "@/components/sections/ContactForm";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteFooter } from "@/components/sections/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact · Axel Garland",
  description: "Get in touch with Axel Garland, open to full-time and contract design roles.",
};

const details = [
  {
    label: "Email",
    value: "hello@axelgarland.com",
    href: "mailto:hello@axelgarland.com",
    icon: (
      <path
        d="M3 6h18v12H3V6Zm0 0 9 7 9-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    label: "Based in",
    value: "Tel Aviv",
    icon: (
      <>
        <path
          d="M12 21s7-6.1 7-11.5A7 7 0 0 0 5 9.5C5 14.9 12 21 12 21Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle cx="12" cy="9.5" r="2.2" stroke="currentColor" strokeWidth="1.5" />
      </>
    ),
  },
  {
    label: "Connect",
    value: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: (
      <path
        d="M9 15l6-6M10.5 7.5l1-1a3.5 3.5 0 0 1 5 5l-1 1M13.5 16.5l-1 1a3.5 3.5 0 0 1-5-5l1-1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <GrainOverlay />
      <main id="main" className="flex min-h-[100dvh] flex-col bg-surface pb-24 pt-32 sm:pt-36">
        <div className="mx-auto grid w-full max-w-content grid-cols-1 gap-14 px-6 sm:px-10 md:grid-cols-2 md:gap-20 md:px-14 lg:px-16">
          <div>
            <p className="mb-3 text-sm uppercase tracking-[0.12em] text-accent">Contact</p>
            <h1 className="mb-6 font-display text-[clamp(2.25rem,5vw,3.5rem)] font-light leading-[1.05] tracking-tight text-ink">
              Let&rsquo;s talk about
              <br />
              what&rsquo;s <em className="italic text-accent">next</em>
            </h1>
            <p className="mb-10 max-w-[42ch] text-base leading-relaxed text-ink-muted md:text-lg">
              I&rsquo;m finishing my degree at Shenkar and looking for full-time or contract design
              roles: UX/UI, product design, or work that leans on illustration too. Send a note and
              I&rsquo;ll get back to you soon.
            </p>

            <div className="flex flex-col gap-5">
              {details.map((d) => (
                <div key={d.label} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center border border-line text-ink-muted">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
                      {d.icon}
                    </svg>
                  </div>
                  <div>
                    <p className="mb-0.5 text-xs uppercase tracking-[0.1em] text-ink-subtle">
                      {d.label}
                    </p>
                    {d.href ? (
                      <a
                        href={d.href}
                        {...(d.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="border-b border-line pb-px text-base font-medium text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
                      >
                        {d.value}
                      </a>
                    ) : (
                      <p className="text-base font-medium text-ink">{d.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-line bg-paper p-8 md:p-10">
            <ContactForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
