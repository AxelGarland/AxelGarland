import { MotionReveal } from "@/components/motion/MotionReveal";
import { ToolOrbit } from "@/components/home/ToolOrbit";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16 border-t border-line bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <MotionReveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.6fr] md:gap-20">
            <h2 className="type-title font-display text-ink md:col-start-1 md:row-start-1">
              About me
            </h2>
            <div className="md:col-start-2 md:row-span-2 md:row-start-1 md:pt-3">
              <div className="flex max-w-[58ch] flex-col gap-5 text-lg leading-relaxed text-ink-muted">
                <p>
                  I&rsquo;m a product designer with a background in illustration and a Visual Communication Design degree from Shenkar.
                </p>
                <p>
                  I like understanding how people work and making complex things easier to use. I work across UX, UI, and prototyping, and use code and AI tools to turn ideas into working products.
                </p>
                <p>I also draw and sculpt, working with everything from colored pencils to clay.</p>
                <p className="flex flex-wrap items-center gap-x-8">
                  <a
                    href="/Axel%20Garland%20CV.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center border-b border-line text-base text-ink transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                  >
                    Download CV
                    <span className="sr-only"> (PDF, opens in a new tab)</span>
                  </a>
                </p>
              </div>
            </div>
            {/* In the left column under the heading on wide screens; after the text on a phone. */}
            <div className="md:col-start-1 md:row-start-2 md:-mt-4">
              <ToolOrbit />
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
