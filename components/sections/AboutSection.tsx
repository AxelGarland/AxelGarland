import { MotionReveal } from "@/components/motion/MotionReveal";
import Link from "next/link";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16 border-t border-line bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <MotionReveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.6fr] md:gap-20">
            <h2 className="type-title font-display text-ink">
              About me
            </h2>
            <div className="md:pt-3">
              <div className="flex max-w-[58ch] flex-col gap-5 text-lg leading-relaxed text-ink-muted">
                <p>
                  I&rsquo;m a product designer with a background in visual communication and illustration. I studied Visual Communication Design at Shenkar College.
                </p>
                <p>
                  I like getting close to the problem, understanding how people actually work, and turning
                  complex ideas into clear, useful experiences. I&rsquo;m especially drawn to products with a
                  lot of information, moving parts or ambiguity, where good design makes things
                  simpler.
                </p>
                <p>
                  I work across UX, UI, visual systems and prototyping, and I&rsquo;m comfortable taking
                  ideas beyond design into working products using code and AI-assisted tools.
                </p>
                <p>Outside product design, I illustrate and work across different mediums, from colored pencil to sculpture.</p>
                <p className="flex flex-wrap items-center gap-x-8">
                  <Link
                    href="/contact"
                    className="inline-flex min-h-[44px] items-center text-ink underline decoration-accent underline-offset-4 transition-colors duration-300 hover:text-accent-ink"
                  >
                    Let&rsquo;s talk.
                  </Link>
                  <a
                    href="/Axel%20Garland%20CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center text-ink underline decoration-accent underline-offset-4 transition-colors duration-300 hover:text-accent-ink"
                  >
                    Download CV
                    <span className="sr-only"> (PDF, opens in a new tab)</span>
                  </a>
                </p>
              </div>
              <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-muted">
                <span className="mr-1 text-accent-ink">Tools</span>
                {["Figma", "Adobe Creative Suite", "Cursor", "Claude Code"].map((tool, i) => (
                  <span key={tool} className="inline-flex items-center gap-3 whitespace-nowrap">
                    {i > 0 ? <span aria-hidden className="inline-block h-1.5 w-1.5 rounded-full bg-accent" /> : null}
                    {tool}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
