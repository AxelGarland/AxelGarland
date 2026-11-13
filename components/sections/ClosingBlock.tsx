import { CopyEmail } from "@/components/sections/CopyEmail";
import { HalftoneButton } from "@/components/sections/HalftoneButton";
import { MotionReveal } from "@/components/motion/MotionReveal";

/** The last thing on a page before the footer: one clear way to get in touch. */
export function ClosingBlock() {
  return (
    <section className="border-t border-line bg-surface py-24 md:py-36">
      <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <MotionReveal>
          <h2 className="type-title mb-4 font-display text-ink">
            Let&rsquo;s <em className="italic text-accent">talk.</em>
          </h2>
          <p className="mb-10 max-w-[44ch] text-lg leading-relaxed text-ink-muted md:mb-12">
            Product roles, collaborations, or freelance work.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <HalftoneButton href="/contact" label="Get in touch" />
            <CopyEmail
              email="axelgrobman@gmail.com"
              className="inline-flex min-h-[44px] items-center border-b border-line text-base text-ink transition-colors duration-300 hover:border-accent hover:text-accent"
            />
            <a
              href="https://www.linkedin.com/in/axel-garland-138188292/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center border-b border-line text-base text-ink-muted transition-colors duration-300 hover:border-accent hover:text-accent"
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
