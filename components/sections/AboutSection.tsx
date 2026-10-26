import { MotionReveal } from "@/components/motion/MotionReveal";

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
                I&rsquo;m a multidisciplinary designer who loves making experiences people actually
                want to explore. Websites, apps, illustration: I move between all of them, from a
                pencil sketch to a Figma file to working code. I like the whole route, the
                hand-drawn and the hand-coded, and I treat AI as one more tool in the kit, never a
                shortcut around the thinking.
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
