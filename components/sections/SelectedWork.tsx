import { FocusDim } from "@/components/sections/FocusDim";
import { ReturnToCard } from "@/components/sections/ReturnToCard";
import { StarCanvas } from "@/components/sections/StarCanvas";
import { pictureSrc } from "@/lib/pictures";
import { PRODUCT_WORK, VISUAL_WORK, type WorkCard } from "@/lib/workCards";
import Image from "next/image";
import Link from "next/link";

/** The home page's work, on a black stage with a few small drifting stars. Two kinds of work, two
 *  kinds of picture. Product work keeps its rectangles, because the screens need their full width:
 *  Smart Giuson and Kindred lead on a 7 / 5 row, Better Eater and AfterLife sit smaller below,
 *  lined up with them. Illustration and visual work comes back as circles, three across.
 *
 *  Both share one grammar and no card chrome: a picture, a short red rule, the name in capitals, a
 *  line, and quiet metadata. The whole card is the link, so there is no arrow. On hover the rule
 *  lengthens, the name turns red and the picture lifts a few pixels; a mouse or the keyboard also
 *  dims the other cards. */

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-accent-light";

/** The red rule. Short at rest, longer on hover or focus. */
const RULE =
  "block h-[3px] w-10 bg-accent transition-[width] duration-500 ease-out motion-safe:group-hover:w-[4.5rem] motion-safe:group-focus-visible:w-[4.5rem]";

/** The picture lifts and grows a hair on hover or focus, and does not move under reduced motion. */
const LIFT =
  "transition-transform duration-500 ease-out motion-safe:group-hover:-translate-y-[3px] motion-safe:group-hover:scale-[1.015] motion-safe:group-focus-visible:-translate-y-[3px] motion-safe:group-focus-visible:scale-[1.015]";

const TITLE_HOVER = "transition-colors duration-300 group-hover:text-accent-light group-focus-visible:text-accent-light";

function ProductCard({ card, frame, className = "" }: { card: WorkCard; frame: string; className?: string }) {
  return (
    <Link
      href={`/work/${card.slug}`}
      id={`work-${card.slug}`}
      className={`group work-card block scroll-mt-28 ${FOCUS} ${className}`}
    >
      <div
        data-card-frame
        className={`relative w-full overflow-hidden bg-surface-raised ${LIFT} ${frame}`}
        style={card.backdrop ? { backgroundColor: card.backdrop } : undefined}
      >
        <Image
          src={pictureSrc(card.image)}
          alt={card.alt}
          fill
          sizes="(max-width: 768px) 92vw, (max-width: 1400px) 58vw, 730px"
          className={card.fit === "contain" ? "object-contain" : "object-cover"}
          style={card.position ? { objectPosition: card.position } : undefined}
        />
      </div>
      <span aria-hidden className={`${RULE} mt-6`} />
      <h3 className={`type-section mt-4 font-display text-surface ${TITLE_HOVER}`}>{card.title}</h3>
      <p className="mt-2 max-w-[44ch] text-lg leading-snug text-surface/70">{card.line}</p>
      <p className="mt-3 text-sm uppercase tracking-[0.06em] text-surface/55">{card.meta}</p>
    </Link>
  );
}

function VisualCard({ card }: { card: WorkCard }) {
  const circle = card.circle;
  if (!circle) return null;
  return (
    <Link
      href={`/work/${card.slug}`}
      id={`work-${card.slug}`}
      className={`group work-card block scroll-mt-28 text-center ${FOCUS}`}
    >
      <div className="relative mx-auto w-[74%] max-w-[26rem] sm:w-[82%]">
        <div
          data-card-frame
          className="relative aspect-square overflow-hidden rounded-full bg-surface-raised transition-transform duration-500 ease-out motion-safe:group-hover:scale-[1.03] motion-safe:group-focus-visible:scale-[1.03]"
        >
          <Image
            src={pictureSrc(circle.image)}
            alt={card.alt}
            fill
            sizes="(max-width: 640px) 70vw, (max-width: 768px) 40vw, 28vw"
            className="object-cover"
            style={circle.position ? { objectPosition: circle.position } : undefined}
          />
        </div>
      </div>
      <span aria-hidden className={`${RULE} mx-auto mt-7`} />
      <h3 className={`type-sub mt-4 font-display text-surface ${TITLE_HOVER}`}>{card.title}</h3>
      <p className="mt-2 text-sm uppercase tracking-[0.06em] text-surface/55">{card.meta}</p>
    </Link>
  );
}

export function SelectedWork() {
  const [giuson, kindred, betterEater, afterlife] = PRODUCT_WORK;
  const lead = "aspect-[16/10] md:aspect-auto md:h-[clamp(20rem,31vw,28rem)]";
  const small = "aspect-[16/10]";
  return (
    <section id="work" className="work-stage relative isolate scroll-mt-16 overflow-hidden bg-night py-20 md:py-28">
      <ReturnToCard />
      <FocusDim />
      <StarCanvas />
      <div className="relative mx-auto max-w-content px-6 sm:px-10 md:px-14 lg:px-16">
        <h2 className="type-title mb-14 font-display text-surface md:mb-20">Selected work</h2>

        <div className="grid grid-cols-1 gap-x-6 gap-y-16 md:grid-cols-12 md:gap-y-24">
          {/* The lead row: Smart Giuson across seven columns, Kindred across five, pictures the same height. */}
          <ProductCard card={giuson} frame={lead} className="md:col-span-7" />
          <ProductCard card={kindred} frame={lead} className="md:col-span-5" />
          {/* Below, smaller: each lines up with the one above it, Better Eater under Giuson's left edge
              and AfterLife under Kindred's. */}
          <ProductCard card={betterEater} frame={small} className="md:col-span-5" />
          <ProductCard card={afterlife} frame={small} className="md:col-span-5 md:col-start-8" />
        </div>

        <div className="mt-28 md:mt-40">
          <h2 className="type-title mb-14 font-display text-surface md:mb-20">Visual &amp; illustration</h2>
          <ul className="m-0 grid list-none grid-cols-1 gap-x-6 gap-y-16 p-0 sm:grid-cols-2 md:grid-cols-3">
            {VISUAL_WORK.map((card) => (
              <li key={card.slug}>
                <VisualCard card={card} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
