import { pictureSrc } from "@/lib/pictures";

export type ProjectSection = "case-study" | "selected-work" | "other-work";

export type ProjectImage = {
  /** Exact filename in `/pictures` */
  file: string;
  alt: string;
};

export type ProjectPlaceholder = {
  label: string;
};

export type AccentColor = "coral" | "teal" | "indigo" | "gold";

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
    summary: "An illustrated recruitment avatar for Alut — images coming soon.",
    accentColor: "coral",
    caseStudy: {
      problem:
        "Alut's Recruitment Department was using standard social media content — postings, generic photos — that wasn't building any real presence. Leadership wanted social media to function as an active recruitment channel, not a bulletin board, which meant giving it something people would actually want to follow.",
      role:
        "I conceived and designed the character — concept, illustration style, and how she'd be used across roles and content. My boss, who isn't a designer, was the approver on the project rather than a creative collaborator on the character itself.",
      process:
        "I designed Alutit, a cartoon-illustrated character fronting the recruitment account — riffing on the AI-avatar trend visible elsewhere but keeping her fully hand-illustrated rather than AI-generated, so she'd read as authored and specific to Alut, not a generic trend-follow. She was built as a functional device, not just a mascot: a consistent base design (curly orange hair, glasses) redressed into role-specific outfits — tool belt and hard hat for maintenance, scrubs and stethoscope for care roles, cap and gown for milestones — so she could explain the actual range of jobs at Alut visually, something a standard listing can't do. A recurring whimsical motif (unicorn, rainbow) gave the account a consistent, joyful tone across otherwise very different role content.",
      outcome:
        "She appeared across social content, video, recruitment materials, and physical merch — including tote bags branded with her name, handed out at university campus events. The clearest proof came from the tote bags: at campus events, students gave up their contact details specifically to get one — and said so directly. Beyond that single moment, her ongoing presence across content channels now feeds a steady, passive stream of candidates applying to open roles sourced from social — not a campaign spike, but a running channel.",
    },
    thumbnail: "",
    hero: "",
    gallery: [],
    awaitingAssets: true,
  },
  {
    slug: "giuson",
    title: "Giuson",
    section: "case-study",
    summary: "An AI recruitment assistant for Alut — images and video coming soon.",
    accentColor: "teal",
    caseStudy: {
      problem:
        "Before this existed, recruiters were working across three disconnected sources: a Google Sheet where individual locations logged which roles they were short on, personal notebooks holding the information needed to actually run a recruitment phone call, and a separate PDF guide with reference material. Every call meant juggling all three, and roles with more complex requirements — care-staff positions (נשות טיפול) in particular — were hard enough to fully understand that only one or two recruiters felt confident handling them.",
      role: "I built the tool.",
      process:
        "I consolidated the three separate sources into one tool with two entry points: a location- and role-based search showing which frameworks have open positions within a chosen radius of a candidate, and an information hub covering role requirements, standards, and admission conditions — replacing the scattered notebooks and PDF.",
      outcome:
        "It's in daily use — by the recruitment team, and by field workers who need the same information during their own part of the recruitment process. The clearest change: recruiting for care-staff roles (נשות טיפול) used to depend on the one or two recruiters comfortable with how complicated that information was. Now that the tool holds and organizes that complexity, more recruiters can take on that recruitment — the bottleneck of relying on just a couple of people is gone.",
    },
    thumbnail: "",
    hero: "",
    gallery: [],
    awaitingAssets: true,
  },
  {
    slug: "better-eater",
    title: "Better Eater",
    section: "case-study",
    summary: "A personalized meal-planning and recipe app.",
    accentColor: "teal",
    caseStudy: {
      problem:
        "The brief: design an app that helps someone transition to healthier eating with no prior kitchen experience — through personalized recommendations, detailed recipes and videos, and content that adapts to the user's specific dietary needs.",
      role: "Co-designed with Yuval Sa'ar as a two-person team project, first-year Interactive course at Shenkar.",
      process:
        "Started from persona research rather than a generic user — the personalization at the core of the brief only makes sense against a specific person's real habits and constraints, so the app was designed around one defined persona throughout. From there: a weekly meal-plan calendar, a personalized home screen surfacing what's next to cook, detailed recipe screens (time, difficulty, nutritional tags, ingredients/instructions), and an integrated shopping list so planning turns directly into action.",
      outcome:
        "A working, prototyped flow covering the full loop — plan the week, get a recommendation, see the recipe, cook it, shop for the next one — built and tested as a functioning Figma prototype.",
    },
    thumbnail: "Better Eater .png",
    hero: "Better Eater .png",
    gallery: [{ file: "Better Eater .png", alt: "Better Eater app screen" }],
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
    reflection:
      "Mundos Mejores is my final project at Shenkar — a series of retablo-inspired boxes that combine traditional Peruvian illustrative and sculptural craft with my own illustration style. Each box holds a hand-sculpted scene built around the same recurring figure, moving through different remembered and imagined moments — an infinite library, underwater, swinging among the stars, a family gathered together. It's the largest and most worked-on body of work I've made so far, and the most personal.",
    thumbnail: "",
    hero: "",
    gallery: [],
    awaitingAssets: true,
  },
  {
    slug: "jabberwocky",
    title: "Jabberwocky",
    section: "selected-work",
    summary: "A fully illustrated book of Lewis Carroll's nonsense poem.",
    accentColor: "coral",
    reflection:
      "Jabberwocky is a fully illustrated book of Lewis Carroll's nonsense poem — a solo project for a Children's Books course at Shenkar. It let me push the visual style as far as it would go: bold color-blocking, confident silhouettes, a monster that's actually a little unsettling, carried consistently across a full set of spreads rather than a single image.",
    thumbnail: "jabberwocky book cover.jpg",
    hero: "jabberwocky book cover.jpg",
    gallery: [
      { file: "jabberwocky book cover.jpg", alt: "Jabberwocky book cover" },
      { file: "jabberwocky spread 1.png", alt: "Jabberwocky interior spread 1" },
      { file: "jabberwocky spread 2.jpg", alt: "Jabberwocky interior spread 2" },
      { file: "jabberwocky spread 3.jpg", alt: "Jabberwocky interior spread 3" },
      { file: "jabberwocky spread 4.jpg", alt: "Jabberwocky interior spread 4" },
      { file: "jabberwocky spread 5.jpg", alt: "Jabberwocky interior spread 5" },
      { file: "jabberwocky spread 6.jpg", alt: "Jabberwocky interior spread 6" },
    ],
    lightboxFeatured: ["jabberwocky spread 2.jpg", "jabberwocky spread 4.jpg"],
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
