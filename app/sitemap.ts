import { PROJECTS } from "@/lib/projects";
import type { MetadataRoute } from "next";

const BASE = "https://www.axelgarland.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "/contact"].map((path) => ({ url: `${BASE}${path}` }));
  const projects = PROJECTS.map((p) => ({ url: `${BASE}/work/${p.slug}` }));
  return [...pages, ...projects];
}
