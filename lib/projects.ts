import { pictureSrc } from "@/lib/pictures";

export type ProjectSection = "case-study" | "selected-work" | "other-work";

export type ProjectImage = {
  /** Exact filename in `/pictures` */
  file: string;
  alt: string;
  /** Accompanying verse/caption text shown alongside the image (e.g. Jabberwocky's
   *  page-by-page poem text). Optional — most projects don't use this. */
  verse?: string;
  /** Renders full-width at its own real aspect ratio in the gallery grid instead of the
   *  uniform 4:3 crop — for images (like a ticket stub) whose shape the standard crop ruins. */
  wide?: boolean;
};

export type ProjectPlaceholder = {
  label: string;
};

export type AccentColor = "coral" | "teal" | "indigo" | "gold" | "violet" | "blue";

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
  /** Real client/brand logo, shown as a small credibility badge on the work-grid card —
   *  for actual client work only, not student/course projects. */
  clientLogo?: string;
  /** When set, the hero image becomes a clickable video poster linking out to this URL
   *  (e.g. a Vimeo/YouTube demo) instead of just a static image. */
  videoUrl?: string;
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
    summary: "An illustrated recruitment avatar for Alut, Israel's national organization for people with autism.",
    accentColor: "violet",
    heroFit: "contain",
    clientLogo: "alutit/alut logo no background.png",
    caseStudy: {
      problem:
        "Alut's Recruitment Department was using standard social media content (postings, generic photos) that wasn't building any real presence. Leadership wanted social media to function as an active recruitment channel, not a bulletin board, which meant giving it something people would actually want to follow.",
      role:
        "I conceived and designed the character: concept, illustration style, and how she'd be used across roles and content.",
      process:
        "I designed Alutit, a cartoon-illustrated character fronting the recruitment account, riffing on the AI-avatar trend visible elsewhere but keeping her fully hand-illustrated rather than AI-generated, so she'd read as authored and specific to Alut, not a generic trend-follow. She was built as a functional device, not just a mascot: a consistent base design (curly orange hair, glasses) redressed into role-specific outfits: tool belt and hard hat for maintenance, scrubs and stethoscope for care roles, cap and gown for milestones. This let her explain the actual range of jobs at Alut visually, something a standard listing can't do. A recurring whimsical motif (unicorn, rainbow) gave the account a consistent, joyful tone across otherwise very different role content.",
      outcome:
        "She appeared across social media content, video, recruitment materials, and physical merch, becoming the consistent face of Alut's recruitment presence online. Her ongoing presence across those channels now feeds a steady, passive stream of candidates applying to open roles sourced from social, not a campaign spike, but a running channel. That's a meaningful shift in the recruitment department's strategy, and a real branding success for Alut.",
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
      { file: "alutit/אלוטית מרצ׳.png", alt: "Alutit merchandise flat-lay: tote bag, notebook, and game board" },
      { file: "alutit/אלוטית תיק.png", alt: "The Alutit tote bag handed out at campus recruitment events" },
      { file: "alutit/social media.png", alt: "Alutit at her desk, shown as a social media post" },
      { file: "alutit/social media 1.png", alt: "Alutit in a garden, shown as a social media post" },
      { file: "alutit/social media 3.png", alt: "Alutit in front of the Eiffel Tower, shown as an Instagram Reels-style post" },
      { file: "alutit/alutit flyer 1.png", alt: "Printed recruitment booklet for students, \"Come to Alut, the perfect job for students\"" },
      { file: "alutit/alutit flyer 2.png", alt: "Printed recruitment booklet for social workers, \"Your career starts at Alut,\" featuring Alutit in a graduation cap on a unicorn" },
    ],
    lightboxFeatured: ["alutit/אלוטית תיק.png", "alutit/אלוטית מרצ׳.png"],
  },
  {
    slug: "giuson",
    title: "Giuson",
    section: "case-study",
    summary: "A recruitment website for Alut: a live map of open positions and everything recruiters need to know, in one place.",
    accentColor: "teal",
    clientLogo: "alutit/alut logo no background.png",
    prototype: {
      domain: "smart-giuson.vercel.app",
      startId: "home",
      screens: [
        {
          id: "home",
          file: "giuson/giuson home.png",
          alt: "Giuson home: choose between recruitment search and the information hub",
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
          alt: "Recruitment search: open positions by location and distance",
          backTo: "home",
        },
        {
          id: "role",
          file: "giuson/giuson role detail.png",
          alt: "Role detail: requirements, licensing, and staffing model",
          backTo: "home",
        },
      ],
    },
    caseStudy: {
      problem:
        "Every summer, when the school year starts in Alut's kindergartens, recruiting health professionals gets very complicated. Alut has many facilities to recruit for and many different professional roles, each with its own salary by profession and seniority, grants and scholarships, and professional training. That was already a lot of information for one person to hold at all times.\n\nOn top of that, the list of open positions changed constantly, across many locations in Israel. Recruiters had to draw on a PDF of information, a Google Sheet of open positions, their own notes, and Google Maps, and that made the process anything but simple. Very few recruiters could ever learn enough to specialize.",
      role: "I designed and built the tool for Alut's recruitment department.",
      process:
        "I watched recruiters work and asked them questions, then built the tool for the recruitment department over about a month and a half to two months. I wanted a website that holds everything needed to recruit successfully: a map where recruiters see open roles within a radius, with live information; explanations of the intricacies of each professional role, the salary ladders, the grants and other perks, in the right flow for making the best recruitment call; and a library, so the managers in the field always have access to the same information.",
      outcome:
        "Throughout the summer, everyone on the recruiting team used it. It let five recruiters make these specialized calls instead of just one or two, and it became a necessary work tool, both for the recruitment office and for the managers in the field who hire on site. The success was big enough that we're now building a similar tool for the rest of the roles open at Alut.",
    },
    thumbnail: "giuson/giuson banner.jpg",
    hero: "giuson/giuson banner.jpg",
    gallery: [
      {
        file: "giuson/giuson recruitment map.png",
        alt: "Recruitment search: a map of open positions by location, filtered by role and search radius, with distance to each shortage",
      },
      {
        file: "giuson/giuson home.png",
        alt: "The tool's home screen: two entry points, recruitment search and the information hub",
      },
      {
        file: "giuson/giuson role detail.png",
        alt: "Role detail: requirements, licensing conditions, and staffing model for a given position",
      },
      {
        file: "giuson/giuson hours table.png",
        alt: "Weekly hours by classroom size and staffing model, consolidated into one reference table",
      },
    ],
    lightboxFeatured: ["giuson/giuson recruitment map.png", "giuson/giuson hours table.png"],
  },
  {
    slug: "interview-assistant",
    title: "Interview for Success",
    section: "case-study",
    summary:
      "An interview toolkit for Alut's non-recruiter managers: interview prep, reference calls, and a weighted scoring system for candidates.",
    accentColor: "gold",
    clientLogo: "alutit/alut logo no background.png",
    caseStudy: {
      problem:
        "Managers across Alut's facilities aren't recruitment specialists, but they're the ones interviewing and hiring for their own teams. Without a shared structure, interview quality, reference checks, and hiring decisions varied manager to manager, with no consistent way to compare candidates. The head of the recruitment department saw the need and came up with the idea: give the managers in the field a tool.",
      role: "I designed and built the tool together with the head of the recruitment department, whose years of recruiting experience shaped it.",
      process:
        "The head of recruitment is the department's authority, with years of experience, so the goal was to carry her knowledge into a process that newer managers could follow. Four connected pieces: role-specific interview questions, where each role has its own list and every question measures a different section or quality; a structured reference-call script covering what to ask and how to run the call; a weighted rating questionnaire that turns interview signals into one comparable score; and a labor-law FAQ that keeps managers compliant along the way: what's legal to ask, notice requirements, timelines.",
      outcome:
        "We presented it in a meeting held for managers, and they were excited to have a tool that would help them. They use it, and they keep asking us to add more roles. The scores then became part of the intake process, so for certain intakes managers have to use it.",
    },
    thumbnail: "interview-assistant/hero.png",
    hero: "interview-assistant/hero.png",
    gallery: [
      {
        file: "interview-assistant/interview-prep.png",
        alt: "Interview prep: candidate and role details in, a set of tailored interview questions out",
      },
      {
        file: "interview-assistant/recommender.png",
        alt: "Reference-check script: structure and questions for the recommender phone call",
      },
      {
        file: "interview-assistant/rating.png",
        alt: "Rating questionnaire: weighted scoring across categories, rolled into one comparable number",
      },
      {
        file: "interview-assistant/faq.png",
        alt: "Labor-law FAQ: quick, compliant answers for hiring managers",
      },
    ],
  },
  {
    slug: "better-eater",
    title: "Better Eater",
    section: "case-study",
    summary: "A personalized meal-planning and recipe app.",
    accentColor: "blue",
    caseStudy: {
      problem:
        "Amit is driven and curious, and holds herself to her own deadlines. She's taken up yoga and meditation, and she's always wanted to eat vegan, but she never knew where to start or how to find the time for it. The pain point isn't wanting to eat well. It's not knowing where to begin, and not having room in a busy week to work it out.",
      role: "Co-designed with Yuval Sa'ar as a team project for a Shenkar course. We both worked across the persona, wireframes, visual design, branding, and the prototype.",
      process:
        "Better Eater is a helper for the transition itself. It supports whichever way of eating you want to try, whether that's vegan, vegetarian, keto, or something else, and makes cooking easy at any level, as part of your life.",
      outcome:
        "A designed flow covering the full loop (plan the week, get a recommendation, see the recipe, cook it, shop for the next one), built as a Figma prototype.",
    },
    thumbnail: "bettereater/hero.png",
    thumbnailFit: "contain",
    hero: "bettereater/hero.png",
    gallery: [
      {
        file: "bettereater/hero.png",
        alt: "Better Eater: recommended meal plan, home screen, and recipe detail",
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
    summary: "Retablo-inspired boxes, a Shenkar graduation project.",
    accentColor: "gold",
    heroFit: "contain",
    reflection:
      "Mundos Mejores is my final project at Shenkar: a series of retablo-inspired boxes that combine traditional Peruvian illustrative and sculptural craft with my own illustration style. Each box holds a hand-sculpted scene built around the same recurring figure, moving through different remembered and imagined moments: an infinite library, underwater, swinging among the stars, a family gathered together. It's the largest and most worked-on body of work I've made so far, and the most personal.",
    thumbnail: "mundos mejores/between the stars2.jpg",
    hero: "mundos mejores/Familia 1.jpg",
    gallery: [
      { file: "mundos mejores/Familia 1.jpg", alt: "The \"Mundos Mejores\" box: a family of figures standing arm in arm" },
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
      "Jabberwocky is a fully illustrated book of Lewis Carroll's nonsense poem, a solo project for a Children's Books course at Shenkar. It let me push the visual style as far as it would go: bold color-blocking, confident silhouettes, a monster that's actually a little unsettling, carried consistently across a full set of spreads rather than a single image.",
    thumbnail: "jabberwocky thumbnail.png",
    hero: "book mock up.jpg",
    // Higher-res per-page exports, replacing the old spread PNGs. Pages 7 and 8 aren't in
    // the new set yet — add them here once they exist. Verse text matched by actually looking
    // at each page's artwork against Lewis Carroll's poem (public domain), not guessed from
    // the page numbers alone.
    gallery: [
      {
        file: "jabberwocky book cover.png",
        alt: "Jabberwocky book cover: title lettering beneath an illustrated Jabberwock head",
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
        verse: "The jaws that bite,",
      },
      {
        file: "book page 5 a.jpg",
        alt: "Two black claws reach toward each other on an orange page, lettered \"The claws that catch!\"",
        verse: "The claws that catch!",
      },
      {
        file: "book page 5 b.jpg",
        alt: "The Jubjub bird dangles the tiny prince upside down, his sword fallen on the hills beside a nest of spotted eggs",
        verse: "Beware the Jubjub bird, and shun",
      },
      {
        file: "עמוד 4.jpg",
        alt: "The prince draws his sword against the spotted Bandersnatch among bones",
        verse: 'The frumious Bandersnatch!"',
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
        alt: "A celebration: the king embraces the boy amid bunting and confetti",
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
    slug: "afterlife",
    title: "AfterLife",
    section: "selected-work",
    summary: "A landing page and an app for a service that helps you celebrate your life as you move on.",
    accentColor: "indigo",
    reflection:
      "AfterLife is a solo school project: a landing page and an app for an invented service that helps you move into the afterlife. I wanted to talk about death in a positive way, so the centerpiece is a recap like Spotify Wrapped, but for your whole life, told in a deadpan voice with illustrations drawn in Illustrator.",
    thumbnail: "afterlife/thumbnail.jpg",
    hero: "afterlife/Frame 40.png",
    gallery: [{ file: "afterlife/Frame 40.png", alt: "AfterLife app welcome screen" }],
  },
  {
    slug: "akko-fringe-festival",
    title: "Akko Fringe Festival",
    section: "selected-work",
    summary: "A fictional rebrand of a real theatre festival in Akko.",
    accentColor: "indigo",
    reflection:
      "Akko Fringe Festival is a fictional rebrand of a real event, Akko's International Festival for Alternative Theatre, made solo for a Digital Illustration course at Shenkar. The brief was self-directed: build one full visual world, a cast of carnival-like characters set against Akko's own architecture and coastline, and carry it consistently across everything a real festival would actually need (key art, tickets, merch, an event page) rather than stopping at a single poster.",
    thumbnail: "Akko festival hero web.png",
    hero: "Akko festival hero web.png",
    gallery: [
      { file: "Akko festival hero web.png", alt: "Akko Fringe Festival hero artwork" },
      { file: "Akko festival shirts.png", alt: "Akko Fringe Festival shirt mockup" },
      { file: "Akko festival shirts 2.png", alt: "Akko Fringe Festival shirt mockup, alternate" },
      { file: "Akko festival ticket.png", alt: "Akko Fringe Festival ticket mockup", wide: true },
    ],
    lightboxFeatured: ["Akko festival hero web.png"],
  },

  // --- Other Work ---
  {
    slug: "facettes",
    title: "Facettes",
    section: "other-work",
    summary:
      "A generative illustration system exploring where code, algorithms, and illustration meet.",
    reflection:
      "Facettes is a system for generative illustration, exploring where the boundaries between code, algorithms, and illustration meet: an endless combination of graphic portraits, each one generated automatically. The idea underneath it: how we're perceived from the outside is never one fixed image, it's built from many separate perceptions of others and of ourselves, combined.",
    liveUrl: "https://mask-facette-app.vercel.app/",
    videoUrl: "https://vimeo.com/1224292689?share=copy&fl=sv&fe=ci",
    thumbnail: "Facettes image.png",
    hero: "Facettes image.png",
    gallery: [{ file: "Facettes image.png", alt: "Facettes multi-face grid" }],
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
