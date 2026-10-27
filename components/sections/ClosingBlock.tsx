import { HalftoneButton } from "@/components/sections/HalftoneButton";
import { MotionReveal } from "@/components/motion/MotionReveal";

/** The last thing on a page before the footer: one clear way to get in touch. */
export function ClosingBlock() {
  return (
    <section className="border-t border-line bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <MotionReveal>
          <h2 className="mb-12 max-w-[19ch] font-display text-[clamp(2.1rem,6.2vw,5.6rem)] font-light leading-[0.92] tracking-[-0.03em] text-ink">
            Let&rsquo;s make <em className="italic text-accent">something great!</em>
          </h2>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <HalftoneButton href="/contact" label="Get in touch" />
            <a
              href="mailto:axelgrobman@gmail.com"
              className="inline-flex min-h-[44px] items-center border-b border-line text-base text-ink transition-colors duration-300 hover:border-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              axelgrobman@gmail.com
            </a>
            <a
              href="https://www.linkedin.com/in/axel-garland-138188292/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center border-b border-line text-base text-ink-muted transition-colors duration-300 hover:border-ink hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
