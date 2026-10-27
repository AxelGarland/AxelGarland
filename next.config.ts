import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

/**
 * Project root is locked to **this folder** (the one that contains this file —
 * e.g. your `Axel Garland portfolio` repo). Next will not treat a parent
 * `package-lock.json` as the workspace root. Keep that file if you want;
 * tracing + Turbopack both use `rootDir` only.
 */
const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)));

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // One address for the site: the old vercel.app address sends everyone to the real domain, so
      // analytics and search results aren't split across two hostnames. Temporary (307) so it can
      // be undone if the domain ever changes.
      {
        source: "/:path*",
        has: [{ type: "host", value: "axelgarlandportfolio.vercel.app" }],
        destination: "https://www.axelgarland.com/:path*",
        permanent: false,
      },
      { source: "/work/facettes", destination: "/work/kindred", permanent: true },
      { source: "/work/akko-fringe-festival", destination: "/#work", permanent: true },
      // The work lives in the home page's work section now; the old index page sends people there.
      { source: "/work", destination: "/#work", permanent: false },
    ];
  },
  outputFileTracingRoot: rootDir,
  turbopack: {
    root: rootDir,
  },
  images: {
    // Optimised on request (resized, WebP/AVIF) rather than at build time, so the large
    // source files in /pictures don't slow the build. Cards and phones get a small version
    // instead of the original, which is what keeps the pages light.
    formats: ["image/avif", "image/webp"],
    deviceSizes: [480, 768, 1080, 1440, 1920],
    imageSizes: [96, 192, 256, 384, 560],
  },
};

export default nextConfig;
