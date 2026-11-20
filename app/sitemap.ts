import { MUNDOS_BOXES } from "@/lib/mundos";
import { PROJECTS } from "@/lib/projects";
import type { MetadataRoute } from "next";

const BASE = "https://www.axelgarland.com";

/** The date the site's pages were last revised. Update it when the content changes. */
const LAST_MODIFIED = new Date("2026-11-16");

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/contact"].map((path) => ({ url: `${BASE}${path}`, lastModified: LAST_MODIFIED }));
  const projects = PROJECTS.map((p) => ({ url: `${BASE}/work/${p.slug}`, lastModified: LAST_MODIFIED }));
  const boxes = MUNDOS_BOXES.map((b) => ({ url: `${BASE}/work/mundos-mejores/${b.slug}`, lastModified: LAST_MODIFIED }));
  return [...pages, ...projects, ...boxes];
}
