import { HalftoneButton } from "@/components/sections/HalftoneButton";
import { MotionReveal } from "@/components/motion/MotionReveal";

/** The last thing on a page before the footer: one clear way to get in touch. */
export function ClosingBlock() {
  return (
    <section className="border-t border-line bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <MotionReveal>
          <p className="mb-6 flex items-center gap-3 text-sm text-ink-muted">
            <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
            Open to opportunities
          </p>
          <h2 className="mb-12 max-w-[12ch] font-display text-[clamp(2.54rem,7.8vw,7.02rem)] font-light leading-[0.92] tracking-[-0.03em] text-ink">
            Let&rsquo;s make <em className="italic text-accent">something.</em>
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
