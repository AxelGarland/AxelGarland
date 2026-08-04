import { MotionReveal } from "@/components/motion/MotionReveal";

export function AboutPreview() {
  return (
    <section
      aria-labelledby="about-preview-heading"
      className="relative px-6 py-28 sm:px-10 md:px-14 md:py-36 lg:px-16"
    >
      <div className="pointer-events-none absolute left-0 right-0 top-1/2 h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-ink/8 to-transparent" />
      <div className="mx-auto max-w-content">
        <MotionReveal>
          <p
            id="about-preview-heading"
            className="font-display text-[clamp(1.75rem,5.5vw,3.75rem)] font-medium leading-[1.12] tracking-[-0.03em] text-ink"
          >
            I build visual systems that combine storytelling,
            <span className="text-ink-muted"> interaction, </span>
            and emerging technologies.
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
