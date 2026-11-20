import { MotionReveal } from "@/components/motion/MotionReveal";
import { DesignButton } from "@/components/home/DesignButton";
import { CopyEmail } from "@/components/sections/CopyEmail";

const LINK =
  "inline-flex min-h-[44px] items-center border-b border-line text-base text-ink-muted transition-colors duration-300 hover:border-accent hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

/** The last thing on a page before the footer: one clear way to get in touch. The words are set like the
 *  name in the hero (the same heavy capitals, tight and stacked), with the second line painted in the
 *  blue crayon of the shirt. */
export function ClosingBlock() {
  return (
    <section id="contact" className="scroll-mt-16 border-t border-line bg-surface py-24 md:py-40">
      <style>{CSS}</style>
      <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <MotionReveal>
          <h2 className="closing-title font-display" aria-label="Let’s talk.">
            <span aria-hidden className="block">
              LET&rsquo;S
            </span>
            <span aria-hidden className="closing-paint block">
              TALK.
            </span>
          </h2>
          <p className="mb-10 mt-8 max-w-[44ch] text-lg leading-relaxed text-ink-muted md:mb-12 md:mt-10 md:text-xl">
            Product roles, collaborations, or freelance work.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
            <DesignButton href="/contact" label="Get in touch" variant="solid" className="min-w-[14rem]" />
            <CopyEmail email="axelgrobman@gmail.com" className={`${LINK} !text-ink`} />
            <a href="https://www.linkedin.com/in/axel-garland-138188292/" target="_blank" rel="noopener noreferrer" className={LINK}>
              LinkedIn
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
            <a href="/Axel%20Garland%20CV.pdf" target="_blank" rel="noopener noreferrer" className={LINK}>
              Download CV
              <span className="sr-only"> (PDF, opens in a new tab)</span>
            </a>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}

const CSS = `
.closing-title {
  margin: 0;
  font-size: clamp(3.2rem, 7.3vw, 8rem);
  line-height: 0.86;
  letter-spacing: -0.025em;
  color: #1a1916;
}
.closing-paint {
  color: #2354e6;
  background-image: url(/home/tex/blue.jpg);
  background-size: 1.15em auto;
  background-position: 0 0;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  width: fit-content;
}
`;
