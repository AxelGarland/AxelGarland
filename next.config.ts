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
    return [{ source: "/work/facettes", destination: "/work/kindred", permanent: true }];
  },
  outputFileTracingRoot: rootDir,
  turbopack: {
    root: rootDir,
  },
  images: {
    /** Large source files in `/pictures` — skip optimization to avoid build timeouts. */
    unoptimized: true,
  },
};

export default nextConfig;
