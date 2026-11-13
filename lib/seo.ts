import type { Metadata } from "next";

/** The metadata every page sets the same way: a title and description for search, the matching
 *  Open Graph and Twitter text for link previews, and a canonical address. A page's own
 *  `opengraph-image` file (see app/work/<project>/) supplies the preview picture. */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { type: "website", url: path, siteName: "Axel Garland", title, description },
    twitter: { card: "summary_large_image", title, description },
  };
}
