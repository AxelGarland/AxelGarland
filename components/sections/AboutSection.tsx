import { MotionReveal } from "@/components/motion/MotionReveal";
import Link from "next/link";

export function AboutSection() {
  return (
    <section id="about" className="scroll-mt-16 border-t border-line bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <MotionReveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.6fr] md:gap-20">
            <h2 className="font-display text-[clamp(1.95rem,3.9vw,3.31rem)] font-light leading-[1.02] tracking-tight text-ink">
              About me
            </h2>
            <div className="md:pt-3">
              <p className="max-w-[58ch] text-lg leading-relaxed text-ink-muted">
                I&rsquo;m a product designer and illustrator. I like to start from a real problem and get
                a working version in front of the people who&rsquo;ll use it early, whether that&rsquo;s
                an internal tool, an app or an illustration. For an internal tool at Alut, that meant
                six weeks of talking to the recruitment team before I drew a screen. If you have a
                product that needs that,{" "}
                <Link
                  href="/contact"
                  className="text-ink underline decoration-accent underline-offset-4 transition-colors duration-300 hover:text-accent-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  let me know
                </Link>
                .
              </p>
              <p className="mt-8 text-sm text-ink-muted">
                <span className="mr-3 text-accent-ink">Tools</span>
                Figma<span aria-hidden className="ml-3 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />{" "}
                Adobe Creative Suite<span aria-hidden className="ml-3 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />{" "}
                Cursor<span aria-hidden className="ml-3 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />{" "}
                Claude Code
              </p>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
