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
        className="flex min-h-[100dvh] flex-col pb-20 pt-24 sm:pt-28"
      >
        <div className="mx-auto w-full max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
          <h1 className="font-display text-[clamp(2rem,6vw,3.75rem)] font-medium tracking-tight text-mist">
            Contact
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-mist-muted md:text-lg">
            Get in touch — email, LinkedIn, or the form below. CV available on request.
          </p>

          <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
            <a
              href="mailto:hello@axelgarland.com"
              className="text-sm text-mist-muted underline underline-offset-4 transition-colors duration-500 hover:text-mist"
            >
              hello@axelgarland.com
            </a>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-mist-muted underline underline-offset-4 transition-colors duration-500 hover:text-mist"
            >
              LinkedIn
            </a>
            <a
              href="#"
              className="text-sm text-mist-muted underline underline-offset-4 transition-colors duration-500 hover:text-mist"
            >
              Download CV
            </a>
          </div>

          <div className="mt-12 max-w-lg rounded-lg bg-paper p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] md:mt-14 md:p-8">
            <ContactForm />
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
