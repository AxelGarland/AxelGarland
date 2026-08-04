import { pictureSrc } from "@/lib/pictures";

export type ProjectSection = "selected-work" | "other-work" | "case-study";

export type ProjectImage = {
  /** Exact filename in `/pictures` */
  file: string;
  alt: string;
};

export type ProjectPlaceholder = {
  label: string;
};

export type Project = {
  slug: string;
  title: string;
  section: ProjectSection;
  summary: string;
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
  "selected-work": "Selected Work",
  "other-work": "Other Work",
  "case-study": "Case study",
};

export const PROJECTS: Project[] = [
  {
    slug: "akko-fringe-festival",
    title: "Akko Fringe Festival",
    section: "selected-work",
    summary: "Festival identity, merch, and ticket design for Akko Fringe.",
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
  {
    slug: "jabberwocky",
    title: "Jabberwocky",
    section: "selected-work",
    summary: "Illustrated book — cover and interior spreads.",
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
    slug: "the-burial",
    title: "The Burial",
    section: "other-work",
    summary: "Sculptural funeral piece — process and detail views.",
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
  {
    slug: "facettes",
    title: "Facettes",
    section: "other-work",
    summary: "Multi-face portrait grid.",
    thumbnail: "Facettes image.png",
    hero: "Facettes image.png",
    gallery: [{ file: "Facettes image.png", alt: "Facettes multi-face grid" }],
  },
  {
    slug: "better-eater",
    title: "Better Eater",
    section: "case-study",
    summary: "Meal planning and recipe UX — case study in progress.",
    thumbnail: "Better Eater .png",
    hero: "Better Eater .png",
    gallery: [{ file: "Better Eater .png", alt: "Better Eater app screen" }],
    upcomingImages: [
      { label: "Meal-plan screen" },
      { label: "Recipe-detail screen" },
    ],
  },
  {
    slug: "alutit",
    title: "Alutit",
    section: "case-study",
    summary: "Alut recruitment avatar — images coming soon.",
    thumbnail: "",
    hero: "",
    gallery: [],
    awaitingAssets: true,
  },
  {
    slug: "giuson",
    title: "Giuson",
    section: "case-study",
    summary: "AI recruitment assistant — images and video coming soon.",
    thumbnail: "",
    hero: "",
    gallery: [],
    awaitingAssets: true,
  },
  {
    slug: "mundos-mejores",
    title: "Mundos Mejores",
    section: "other-work",
    summary: "Project imagery coming soon.",
    thumbnail: "",
    hero: "",
    gallery: [],
    awaitingAssets: true,
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
