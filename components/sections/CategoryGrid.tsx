import { CategoryCard } from "@/components/CategoryCard";
import { MotionReveal } from "@/components/motion/MotionReveal";
import {
  AiDesignVisual,
  BrandingVisual,
  ExperimentalVisual,
  IllustrationVisual,
  InteractiveSystemsVisual,
  MotionVisual,
} from "@/components/category-visuals";

const categories = [
  {
    title: "Illustration",
    subtitle: "Narrative imagery, mark-making, and emotional tone through drawn and digital form.",
    visual: <IllustrationVisual />,
  },
  {
    title: "Interactive Systems",
    subtitle: "Spatial interfaces and tactile digital experiences built for sustained attention.",
    visual: <InteractiveSystemsVisual />,
  },
  {
    title: "AI + Design",
    subtitle: "Human-centered tooling and systems where models extend creative direction.",
    visual: <AiDesignVisual />,
  },
  {
    title: "Motion",
    subtitle: "Cinematic timing and restrained choreography for brand worlds and editorial.",
    visual: <MotionVisual />,
  },
  {
    title: "Branding",
    subtitle: "Identity frameworks with depth—typography, color rhythm, and sensory detail.",
    visual: <BrandingVisual />,
  },
  {
    title: "Experimental Work",
    subtitle: "Process-led studies, prototypes, and installations at the edge of the brief.",
    visual: <ExperimentalVisual />,
  },
] as const;

export function CategoryGrid() {
  return (
    <section
      id="selected-work"
      aria-labelledby="selected-work-heading"
      className="relative px-6 py-28 sm:px-10 md:px-14 md:py-36 lg:px-16"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/12 to-transparent" />
      <div className="mx-auto max-w-content">
        <MotionReveal className="max-w-3xl">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-ink-subtle">
            Placeholder categories
          </p>
          <h2
            id="selected-work-heading"
            className="mt-5 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl lg:text-[3.25rem]"
          >
            A field of practices
          </h2>
          <p className="mt-6 max-w-prose text-lg leading-relaxed text-ink-muted">
            Each panel is a direction—not a case study. Selected projects arrive here soon.
          </p>
        </MotionReveal>

        <div className="mt-20 grid gap-6 md:grid-cols-2 md:gap-8 lg:gap-10">
          {categories.map((c, i) => (
            <MotionReveal key={c.title} delay={0.06 * i}>
              <CategoryCard title={c.title} subtitle={c.subtitle} visual={c.visual} />
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
