/** What the home page's work grid shows for each project: one picture, one sentence, one quiet line of
 *  metadata. The project pages hold the depth, so nothing here is longer than a sentence. */

export type WorkCard = {
  slug: string;
  title: string;
  /** One concise sentence about what it is. Visual work shows a category label only. */
  line?: string;
  /** Quiet metadata under the sentence, or the category label for visual work. */
  meta: string;
  /** Exact filename under /pictures. */
  image: string;
  alt: string;
  /** How the picture sits in its frame. Cover unless the whole picture needs to show. */
  fit?: "cover" | "contain";
  position?: string;
  /** A CSS colour behind a contained picture, so its own backdrop meets the frame. */
  backdrop?: string;
  /** Visual work only: the picture cut for the circle on the home page, centred on its subject. */
  circle?: { image: string; position?: string };
};

export const PRODUCT_WORK: WorkCard[] = [
  {
    slug: "giuson",
    title: "Smart Giuson",
    line: "Recruitment knowledge, live vacancies, and call guidance in one workspace.",
    meta: "Product design · Internal tool",
    image: "giuson/sg-home.webp",
    alt: "The Smart Giuson home screen: Find Open Positions and Recruitment Knowledge",
    position: "50% 50%",
  },
  {
    slug: "better-eater",
    title: "Better Eater",
    line: "A personalized meal-planning and recipe app.",
    meta: "UI design · Mobile app",
    image: "bettereater/card.jpg",
    alt: "Better Eater: three phone screens showing a meal plan, a recipe and cooking steps",
    fit: "contain",
    backdrop: "rgb(233, 233, 233)",
  },
  {
    slug: "kindred",
    title: "Kindred",
    line: "A generative system that builds posters from hand-drawn face tiles, and a way to sell them.",
    meta: "Generative design · Web app",
    image: "kindred/card.jpg",
    alt: "Kindred: a grid of colorful hand-drawn faces built from a small set of tiles",
    position: "50% 50%",
  },
  {
    slug: "afterlife",
    title: "AfterLife",
    line: "A conceptual landing page and app that wraps up your life, so you can celebrate it.",
    meta: "Interactive design · UI · Illustration",
    image: "afterlife/Frame 40.png",
    alt: "AfterLife welcome screen: an illustrated skeleton among flowers, with a Let’s start button",
    fit: "contain",
    backdrop: "rgb(0, 0, 0)",
  },
];

export const VISUAL_WORK: WorkCard[] = [
  {
    slug: "alutit",
    title: "Alutit",
    meta: "Branding · Illustration",
    circle: { image: "alutit/card.jpg", position: "50% 30%" },
    image: "alutit/card.jpg",
    alt: "Alutit, an illustrated character in a purple sweater, holding up a rainbow",
    fit: "contain",
    backdrop: "rgb(228, 224, 239)",
  },
  {
    slug: "mundos-mejores",
    title: "Mundos Mejores",
    meta: "Installation · Illustration",
    circle: { image: "mundos mejores/circle-2.jpg" },
    image: "mundos mejores/between the stars2.jpg",
    alt: "A sculpted girl on a swing among hanging paper stars",
    position: "50% 58%",
  },
  {
    slug: "jabberwocky",
    title: "Jabberwocky",
    meta: "Editorial · Illustration",
    circle: { image: "jabberwocky/circle-01.jpg" },
    image: "jabberwocky/book-mockup.jpg",
    alt: "The illustrated Jabberwocky book, closed, with an orange and black cover",
    position: "50% 50%",
  },
];

/** A project's metadata as the list of tags its case-study page shows, so the page, the card and the
 *  "More projects" index always say the same thing. */
export const cardTags = (slug: string): string[] =>
  [...PRODUCT_WORK, ...VISUAL_WORK].find((c) => c.slug === slug)?.meta.split(" · ") ?? [];
