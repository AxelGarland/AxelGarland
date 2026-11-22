import { CaseFacts } from "@/components/projects/CaseFacts";
import { RetabloShowcase } from "@/components/projects/RetabloShowcase";
import type { RetabloBox } from "@/components/projects/RetabloSelector";

/** The page's top: the project's text beside the boxes opening one after another. */
export function MundosHeader({ title, intro, boxes }: { title: string; intro: string; boxes: RetabloBox[] }) {
  return (
    <header className="overflow-x-clip pb-12 pt-36 md:pb-16">
      <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-10 px-6 sm:px-10 md:grid-cols-[5fr_7fr] md:gap-14 md:px-14 lg:gap-20 lg:px-16">
        <div className="order-2 md:order-1">
          <h1 className="mb-6 type-title font-display text-ink">
            {title}
          </h1>
          <div className="flex max-w-[46ch] flex-col gap-4">
            {intro.split("\n\n").map((para) => (
              <p key={para.slice(0, 24)} className="text-lg leading-relaxed text-ink-muted">
                {para}
              </p>
            ))}
          </div>
          <CaseFacts className="mt-5">Graduation project, Shenkar · Concept, sculpture, and five hand-built retablos</CaseFacts>
        </div>
        <RetabloShowcase boxes={boxes} className="order-1 md:order-2" />
      </div>
    </header>
  );
}
