import { pictureSrc } from "@/lib/pictures";

export type ProjectSection = "case-study" | "selected-work" | "other-work";

export type ProjectImage = {
  /** Exact filename in `/pictures` */
  file: string;
  alt: string;
  /** Accompanying verse/caption text shown alongside the image (e.g. Jabberwocky's
   *  page-by-page poem text). Optional — most projects don't use this. */
  verse?: string;
};

export type ProjectPlaceholder = {
  label: string;
};

export type AccentColor = "coral" | "teal" | "indigo" | "gold";

/** A clickable hotspot over a prototype screen — percent-based so it scales with the rendered
 *  image regardless of viewport width. */
export type PrototypeHotspot = {
  xPct: number;
  yPct: number;
  wPct: number;
  hPct: number;
  /** id of the screen this hotspot navigates to */
  goTo: string;
  /** Accessible name — the hotspot itself is invisible until hovered/focused. */
  label: string;
};

export type PrototypeScreen = {
  id: string;
  /** Exact filename in `/pictures` */
  file: string;
  alt: string;
  hotspots?: PrototypeHotspot[];
  /** Shows a visible "Back" affordance that returns to this screen id. */
  backTo?: string;
};

export type ProjectPrototype = {
  /** Shown in the mockup's URL pill — not a real link, just sets the scene. */
  domain: string;
  startId: string;
  screens: PrototypeScreen[];
};

export type CaseStudyContent = {
  problem: string;
  role: string;
  process: string;
  outcome: string;
};

export type Project = {
  slug: string;
  title: string;
  section: ProjectSection;
  /** Short one-liner for grid cards */
  summary: string;
  /** Per-project accent tone, drives hero/divider/hover tint */
  accentColor?: AccentColor;
  /** Case-study section only: full Problem/Role/Process/Outcome breakdown */
  caseStudy?: CaseStudyContent;
  /** Selected Work section only: short reflection paragraph */
  reflection?: string;
  /** Link to the real, live version of the project, when one exists publicly. */
  liveUrl?: string;
  /** When set, the hero image becomes a clickable video poster linking out to this URL
   *  (e.g. a Vimeo/YouTube demo) instead of just a static image. */
  videoUrl?: string;
  /** Figma "embed" URL (figma.com/embed?...&url=<encoded proto link>) for projects whose only
   *  working demo is a Figma prototype rather than a real deployed product — embedded live and
   *  clickable on the page instead of a static screenshot. */
  figmaEmbedUrl?: string;
  /** Grid card thumbnail — exact filename */
  thumbnail: string;
  /** Detail hero — exact filename */
  hero: string;
  /** Full gallery on the project page */
  gallery: ProjectImage[];
  /** Subset highlighted in the lightbox opener (e.g. strongest spreads) */
  lightboxFeatured?: string[];
  /** Reserved slots for assets not yet uploaded */
  upcomingImages?: ProjectPlaceholder[];
  /** Entire project awaiting assets */
  awaitingAssets?: boolean;
  /** Show the gallery as a WebGL morph-transition slider instead of a static grid+lightbox. */
  useMorphSlider?: boolean;
  /** Hero image object-fit — "contain" for transparent character art that shouldn't be cropped, "cover" (default) for full-bleed photos/screenshots. */
  heroFit?: "cover" | "contain";
  /** Work-grid thumbnail object-fit — "contain" for UI screenshots where a masonry crop would cut off meaningful content (nav bars, labels), "cover" (default) for illustration thumbnails that read fine cropped. */
  thumbnailFit?: "cover" | "contain";
  /** A small clickable prototype (2-3 static screens + hotspots) shown in a browser-window
   *  mockup in place of the static hero image — for projects whose real, live tool shouldn't be
   *  open to the public, but where a working-feeling demo still serves the case study better
   *  than a flat screenshot. */
  prototype?: ProjectPrototype;
};

export const SECTION_LABELS: Record<ProjectSection, string> = {
  "case-study": "Case Studies",
  "selected-work": "Selected Work",
  "other-work": "Other Work",
};

export const PROJECTS: Project[] = [
  // --- Case Studies ---
  {
    slug: "alutit",
    title: "Alutit",
    section: "case-study",
    summary: "An illustrated recruitment avatar for Alut.",
    accentColor: "coral",
    heroFit: "contain",
    caseStudy: {
      problem:
        "Alut's Recruitment Department was using standard social media content — postings, generic photos — that wasn't building any real presence. Leadership wanted social media to function as an active recruitment channel, not a bulletin board, which meant giving it something people would actually want to follow.",
      role:
        "I conceived and designed the character — concept, illustration style, and how she'd be used across roles and content.",
      process:
        "I designed Alutit, a cartoon-illustrated character fronting the recruitment account — riffing on the AI-avatar trend visible elsewhere but keeping her fully hand-illustrated rather than AI-generated, so she'd read as authored and specific to Alut, not a generic trend-follow. She was built as a functional device, not just a mascot: a consistent base design (curly orange hair, glasses) redressed into role-specific outfits — tool belt and hard hat for maintenance, scrubs and stethoscope for care roles, cap and gown for milestones — so she could explain the actual range of jobs at Alut visually, something a standard listing can't do. A recurring whimsical motif (unicorn, rainbow) gave the account a consistent, joyful tone across otherwise very different role content.",
      outcome:
        "She appeared across social content, video, recruitment materials, and physical merch — including tote bags branded with her name, handed out at university campus events. The clearest proof came from the tote bags: at campus events, students gave up their contact details specifically to get one — and said so directly. Beyond that single moment, her ongoing presence across content channels now feeds a steady, passive stream of candidates applying to open roles sourced from social — not a campaign spike, but a running channel.",
    },
    thumbnail: "alutit/banner alutit.png",
    hero: "alutit/Alutit rainbow.png",
    gallery: [
      { file: "alutit/Alutit rainbow.png", alt: "Alutit in her branded sweater, holding up a rainbow" },
      { file: "alutit/alutit on unicorn.png", alt: "Alutit in a graduation cap, riding a unicorn across a rainbow" },
      { file: "alutit/alutit handyman.png", alt: "Alutit dressed as a maintenance worker with a tool belt and hard hat" },
      { file: "alutit/alutit nurse.png", alt: "Alutit dressed as a care worker in scrubs with a stethoscope and clipboard" },
      { file: "alutit/Alutit physiotherapist.png", alt: "Alutit as a physiotherapist working with a client" },
      { file: "alutit/alutit speech therapist.png", alt: "Alutit as a speech therapist using a communication board with a client" },
      { file: "alutit/alutit onesie.png", alt: "Alutit wearing a unicorn onesie" },
      { file: "alutit/alutit desk.png", alt: "Alutit at her desk in an Alutit-branded shirt" },
      { file: "alutit/alutit office.png", alt: "Alutit in an office setting with recruitment materials on the wall" },
      { file: "alutit/אלוטית גן.JPG", alt: "Alutit in front of an Alut kindergarten facility" },
      { file: "alutit/אלוטית מרצ׳.png", alt: "Alutit merchandise flat-lay — tote bag, notebook, and game board" },
      { file: "alutit/אלוטית תיק.png", alt: "The Alutit tote bag handed out at campus recruitment events" },
      { file: "alutit/social media.png", alt: "Alutit at her desk, shown as a social media post" },
      { file: "alutit/social media 1.png", alt: "Alutit in a garden, shown as a social media post" },
      { file: "alutit/social media 3.png", alt: "Alutit in front of the Eiffel Tower, shown as an Instagram Reels-style post" },
      { file: "alutit/alutit flyer 1.png", alt: "Printed recruitment booklet for students, \"Come to Alut — the perfect job for students\"" },
      { file: "alutit/alutit flyer 2.png", alt: "Printed recruitment booklet for social workers, \"Your career starts at Alut,\" featuring Alutit in a graduation cap on a unicorn" },
    ],
    lightboxFeatured: ["alutit/אלוטית תיק.png", "alutit/אלוטית מרצ׳.png"],
  },
  {
    slug: "giuson",
    title: "Giuson",
    section: "case-study",
    summary: "A recruitment and information tool for Alut, built to replace three disconnected sources.",
    accentColor: "teal",
    heroFit: "contain",
    thumbnailFit: "contain",
    prototype: {
      domain: "smart-giuson.vercel.app",
      startId: "home",
      screens: [
        {
          id: "home",
          file: "giuson/giuson home.png",
          alt: "Giuson home — choose between recruitment search and the information hub",
          hotspots: [
            {
              xPct: 30.5,
              yPct: 26,
              wPct: 18.75,
              hPct: 28.8,
              goTo: "map",
              label: "Open recruitment search",
            },
            {
              xPct: 50.65,
              yPct: 26,
              wPct: 18.75,
              hPct: 28.8,
              goTo: "role",
              label: "Open the information hub",
            },
          ],
        },
        {
          id: "map",
          file: "giuson/giuson recruitment map.png",
          alt: "Recruitment search — open positions by location and distance",
          backTo: "home",
        },
        {
          id: "role",
          file: "giuson/giuson role detail.png",
          alt: "Role detail — requirements, licensing, and staffing model",
          backTo: "home",
        },
      ],
    },
    caseStudy: {
      problem:
        "Before this existed, recruiters were working across three disconnected sources: a Google Sheet where individual locations logged which roles they were short on, personal notebooks holding the information needed to actually run a recruitment phone call, and a separate PDF guide with reference material. Every call meant juggling all three, and roles with more complex requirements — care-staff positions (נשות טיפול) in particular — were hard enough to fully understand that only one or two recruiters felt confident handling them.",
      role: "I built the tool.",
      process:
        "I consolidated the three separate sources into one tool with two entry points: a location- and role-based search showing which frameworks have open positions within a chosen radius of a candidate, and an information hub covering role requirements, standards, and admission conditions — replacing the scattered notebooks and PDF.",
      outcome:
        "It's in daily use — by the recruitment team, and by field workers who need the same information during their own part of the recruitment process. The clearest change: recruiting for care-staff roles (נשות טיפול) used to depend on the one or two recruiters comfortable with how complicated that information was. Now that the tool holds and organizes that complexity, more recruiters can take on that recruitment — the bottleneck of relying on just a couple of people is gone.",
    },
    thumbnail: "giuson/giuson recruitment map.png",
    hero: "giuson/giuson recruitment map.png",
    gallery: [
      {
        file: "giuson/giuson recruitment map.png",
        alt: "Recruitment search — a map of open positions by location, filtered by role and search radius, with distance to each shortage",
      },
      {
        file: "giuson/giuson home.png",
        alt: "The tool's home screen — two entry points, recruitment search and the information hub",
      },
      {
        file: "giuson/giuson role detail.png",
        alt: "Role detail — requirements, licensing conditions, and staffing model for a given position",
      },
      {
        file: "giuson/giuson hours table.png",
        alt: "Weekly hours by classroom size and staffing model, consolidated into one reference table",
      },
    ],
    lightboxFeatured: ["giuson/giuson recruitment map.png", "giuson/giuson hours table.png"],
  },
  {
    slug: "better-eater",
    title: "Better Eater",
    section: "case-study",
    summary: "A personalized meal-planning and recipe app.",
    accentColor: "teal",
    figmaEmbedUrl:
      "https://www.figma.com/embed?embed_host=share&url=https%3A%2F%2Fwww.figma.com%2Fproto%2Fw3GO2poltFSRm4zvrMapin%2FBETTEREATER%3Fnode-id%3D811-2920%26t%3DrItpRNz8symuMgLU-1%26scaling%3Dscale-down%26content-scaling%3Dfixed%26page-id%3D811%253A2412%26starting-point-node-id%3D811%253A2920",
    caseStudy: {
      problem:
        "The brief: design an app that helps someone transition to healthier eating with no prior kitchen experience — through personalized recommendations, detailed recipes and videos, and content that adapts to the user's specific dietary needs.",
      role: "Co-designed with Yuval Sa'ar as a two-person team project, first-year Interactive course at Shenkar.",
      process:
        "Started from persona research rather than a generic user — the personalization at the core of the brief only makes sense against a specific person's real habits and constraints, so the app was designed around one defined persona throughout. From there: a weekly meal-plan calendar, a personalized home screen surfacing what's next to cook, detailed recipe screens (time, difficulty, nutritional tags, ingredients/instructions), and an integrated shopping list so planning turns directly into action.",
      outcome:
        "A working, prototyped flow covering the full loop — plan the week, get a recommendation, see the recipe, cook it, shop for the next one — built and tested as a functioning Figma prototype.",
    },
    thumbnail: "bettereater banner.png",
    hero: "bettereater banner.png",
    gallery: [
      {
        file: "bettereater banner.png",
        alt: "Better Eater — recommended meal plan, home screen, and recipe detail",
      },
    ],
    upcomingImages: [
      { label: "Meal-plan screen" },
      { label: "Recipe-detail screen" },
    ],
  },

  // --- Selected Work ---
  {
    slug: "mundos-mejores",
    title: "Mundos Mejores",
    section: "selected-work",
    summary: "Retablo-inspired boxes — Shenkar graduation project.",
    accentColor: "gold",
    heroFit: "contain",
    reflection:
      "Mundos Mejores is my final project at Shenkar — a series of retablo-inspired boxes that combine traditional Peruvian illustrative and sculptural craft with my own illustration style. Each box holds a hand-sculpted scene built around the same recurring figure, moving through different remembered and imagined moments — an infinite library, underwater, swinging among the stars, a family gathered together. It's the largest and most worked-on body of work I've made so far, and the most personal.",
    thumbnail: "mundos mejores/Familia 1.jpg",
    hero: "mundos mejores/Familia 1.jpg",
    gallery: [
      { file: "mundos mejores/Familia 1.jpg", alt: "The \"Mundos Mejores\" box — a family of figures standing arm in arm" },
      { file: "mundos mejores/familia 2.jpg", alt: "Family box, detail view" },
      { file: "mundos mejores/familia 3.jpg", alt: "Family box, detail view" },
      { file: "mundos mejores/between the stars.jpg", alt: "A figure swinging among hanging painted stars" },
      { file: "mundos mejores/between the stars1.jpg", alt: "Stars box, detail view" },
      { file: "mundos mejores/between the stars2.jpg", alt: "Stars box, detail view" },
      { file: "mundos mejores/between stars 3.jpg", alt: "Stars box, detail view" },
      { file: "mundos mejores/biblioteca1.jpg", alt: "A figure reading among towering stacks of books" },
      { file: "mundos mejores/biblioteca 2.jpg", alt: "Library box, detail view" },
      { file: "mundos mejores/biblioteca 3.jpg", alt: "Library box, detail view" },
      { file: "mundos mejores/underwater1.jpg", alt: "A figure in a swimsuit and flippers, suspended underwater" },
      { file: "mundos mejores/underwater 2.jpg", alt: "Underwater box, detail view" },
      { file: "mundos mejores/underwater 3.jpg", alt: "Underwater box, detail view" },
      { file: "mundos mejores/summer 1.jpg", alt: "A figure basking beneath a smiling sun and blooming flowers" },
      { file: "mundos mejores/summer 2.jpg", alt: "Summer box, detail view" },
      { file: "mundos mejores/summer 3.jpg", alt: "Summer box, detail view" },
      { file: "mundos mejores/summer 4.jpg", alt: "Summer box, detail view" },
    ],
  },
  {
    slug: "jabberwocky",
    title: "Jabberwocky",
    section: "selected-work",
    summary: "A fully illustrated book of Lewis Carroll's nonsense poem.",
    accentColor: "coral",
    reflection:
      "Jabberwocky is a fully illustrated book of Lewis Carroll's nonsense poem — a solo project for a Children's Books course at Shenkar. It let me push the visual style as far as it would go: bold color-blocking, confident silhouettes, a monster that's actually a little unsettling, carried consistently across a full set of spreads rather than a single image.",
    thumbnail: "jabberwocky book cover.png",
    hero: "book mock up.jpg",
    // Higher-res per-page exports, replacing the old spread PNGs. Pages 5, 7, and 8 aren't in
    // the new set yet — add them here once they exist. Verse text matched by actually looking
    // at each page's artwork against Lewis Carroll's poem (public domain), not guessed from
    // the page numbers alone.
    gallery: [
      {
        file: "jabberwocky book cover.png",
        alt: "Jabberwocky book cover — title lettering beneath an illustrated Jabberwock head",
      },
      {
        file: "page 1.jpg",
        alt: "A smoking cottage tucked among hills dotted with whimsical spiral creatures",
        verse: "'Twas brillig, and the slithy toves\nDid gyre and gimble in the wabe:\nAll mimsy were the borogoves,\nAnd the mome raths outgrabe.",
      },
      {
        file: "עמוד 2.jpg",
        alt: "A father warns his son",
        verse: '"Beware the Jabberwock, my son!',
      },
      {
        file: "עמוד 3.jpg",
        alt: "Close-up of the Jabberwock's jaws and teeth, lettered \"The jaws that bite\"",
        verse: "The jaws that bite, the claws that catch!",
      },
      {
        file: "עמוד 4.jpg",
        alt: "The prince draws his sword against the spotted Bandersnatch among bones",
        verse: 'Beware the Jubjub bird, and shun\nThe frumious Bandersnatch!"',
      },
      {
        file: "עמוד 6.jpg",
        alt: "The prince rests beneath the Tumtum tree beside his striped steed",
        verse: "So rested he by the Tumtum tree\nAnd stood awhile in thought.",
      },
      {
        file: "עמוד 9.jpg",
        alt: "The Jabberwock, eyes aflame, confronts the prince",
        verse: "The Jabberwock, with eyes of flame,\nCame whiffling through the tulgey wood,\nAnd burbled as it came!",
      },
      {
        file: "עמוד 10.jpg",
        alt: "The Jabberwock recoils from the vorpal blade",
        verse: "One, two! One, two! And through and through\nThe vorpal blade went snicker-snack!",
      },
      {
        file: "עמוד 11.jpg",
        alt: "The prince rides back on his steed, dragging the Jabberwock's head",
        verse: "He left it dead, and with its head\nHe went galumphing back.",
      },
      {
        file: "עמוד 12.jpg",
        alt: "A celebration — the king embraces the boy amid bunting and confetti",
        verse: '"And hast thou slain the Jabberwock?\nCome to my arms, my beamish boy!\nO frabjous day! Callooh! Callay!"\nHe chortled in his joy.',
      },
      {
        file: "עמוד 13.jpg",
        alt: "The creatures of the wabe together again at dusk, closing the loop",
        verse: "'Twas brillig, and the slithy toves\nDid gyre and gimble in the wabe:\nAll mimsy were the borogoves,\nAnd the mome raths outgrabe.",
      },
    ],
  },
  {
    slug: "akko-fringe-festival",
    title: "Akko Fringe Festival",
    section: "selected-work",
    summary: "A fictional rebrand of a real theatre festival in Akko.",
    accentColor: "indigo",
    reflection:
      "Akko Fringe Festival is a fictional rebrand of a real event — Akko's International Festival for Alternative Theatre — made solo for a Digital Illustration course at Shenkar. The brief was self-directed: build one full visual world, a cast of carnival-like characters set against Akko's own architecture and coastline, and carry it consistently across everything a real festival would actually need — key art, tickets, merch, an event page — rather than stopping at a single poster.",
    thumbnail: "Akko festival hero web.png",
    hero: "Akko festival hero web.png",
    gallery: [
      { file: "Akko festival hero web.png", alt: "Akko Fringe Festival hero artwork" },
      { file: "Akko festival shirts.png", alt: "Akko Fringe Festival shirt mockup" },
      { file: "Akko festival shirts 2.png", alt: "Akko Fringe Festival shirt mockup, alternate" },
      { file: "Akko festival ticket.png", alt: "Akko Fringe Festival ticket mockup" },
    ],
    lightboxFeatured: ["Akko festival hero web.png"],
  },

  // --- Other Work ---
  {
    slug: "facettes",
    title: "Facettes",
    section: "other-work",
    summary:
      "A generative illustration experiment: choosing different attributes builds a different illustrated face each time. The idea underneath it — how we're perceived from the outside is never one fixed image, it's built from many separate perceptions of others and of ourselves, combined.",
    liveUrl: "https://mask-facette-app.vercel.app/",
    videoUrl: "https://vimeo.com/1224292689?share=copy&fl=sv&fe=ci",
    thumbnail: "Facettes image.png",
    hero: "Facettes image.png",
    gallery: [{ file: "Facettes image.png", alt: "Facettes multi-face grid" }],
  },
  {
    slug: "the-burial",
    title: "The Burial",
    section: "other-work",
    summary:
      "Small glossy-clay sculptures turning death and burial imagery into something playful rather than grim.",
    accentColor: "gold",
    thumbnail: "funeral sculpture.jpg",
    hero: "funeral sculpture.jpg",
    gallery: [
      { file: "funeral sculpture.jpg", alt: "The Burial — sculpture group view" },
      { file: "funeral sculpture 1.jpg", alt: "The Burial — sculpture detail 1" },
      { file: "funeral sculpture 2.jpg", alt: "The Burial — sculpture detail 2" },
      { file: "funeral sculpture 3.jpg", alt: "The Burial — sculpture detail 3" },
      { file: "funeral sculpture 4.jpg", alt: "The Burial — sculpture detail 4" },
      { file: "funeral sculpture 5.jpg", alt: "The Burial — sculpture detail 5" },
      { file: "funeral scuplture 6.jpg", alt: "The Burial — sculpture detail 6" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getProjectsBySection(section: ProjectSection): Project[] {
  return PROJECTS.filter((p) => p.section === section);
}

export function projectThumbnailSrc(project: Project): string | null {
  if (project.awaitingAssets || !project.thumbnail) return null;
  return pictureSrc(project.thumbnail);
}

export function projectHeroSrc(project: Project): string | null {
  if (project.awaitingAssets || !project.hero) return null;
  return pictureSrc(project.hero);
}
