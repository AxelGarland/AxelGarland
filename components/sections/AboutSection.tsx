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
                I&rsquo;m curious by nature, with a real desire to create beautiful things, useful or
                not. Hand me a task and I feel confident taking it on, whether it&rsquo;s a website,
                an app, an illustration or a brand. If you have a project that needs a creative
                perspective and great results,{" "}
                <Link
                  href="/contact"
                  className="text-ink underline decoration-accent underline-offset-4 transition-colors duration-300 hover:text-accent-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  let me know
                </Link>
                .
              </p>
              <p className="mt-8 text-sm text-ink-muted">
                <span className="mr-3 text-ink">Tools</span>
                Figma<span aria-hidden className="mx-2.5 text-accent">&middot;</span>Adobe Creative
                Suite<span aria-hidden className="mx-2.5 text-accent">&middot;</span>WordPress
                <span aria-hidden className="mx-2.5 text-accent">&middot;</span>Cursor
                <span aria-hidden className="mx-2.5 text-accent">&middot;</span>Claude Code
              </p>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
