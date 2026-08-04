import { ContactForm } from "@/components/sections/ContactForm";
import { GrainOverlay } from "@/components/GrainOverlay";
import { SiteFooter } from "@/components/sections/SiteFooter";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Axel Garland",
  description: "Get in touch with Axel Garland.",
};

export default function ContactPage() {
  return (
    <>
      <GrainOverlay />
      <main
        id="main"
        className="flex min-h-[100dvh] flex-col bg-surface pb-20 pt-24 sm:pt-28"
      >
        <div className="mx-auto w-full max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
          <h1 className="font-display text-[clamp(2rem,6vw,3.75rem)] font-medium tracking-tight text-ink">
            Contact
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[rgba(12,12,14,0.85)] md:text-lg">
            Get in touch — email, LinkedIn, or the form below. CV available on request.
          </p>

          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 md:mt-14">
            <a
              href="mailto:hello@axelgarland.com"
              className="text-sm text-ink-muted underline underline-offset-4 transition-colors duration-500 hover:text-ink"
            >
              hello@axelgarland.com
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-ink-muted underline underline-offset-4 transition-colors duration-500 hover:text-ink"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-sm text-ink-muted underline underline-offset-4 transition-colors duration-500 hover:text-ink"
            >
              Download CV
            </a>
          </div>

          <div className="mt-14 max-w-lg md:mt-16">
            <ContactForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
