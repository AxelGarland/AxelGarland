/** Base URL for files in `/pictures` (served via `public/pictures` symlink). */
export const PICTURES_BASE = "/pictures";

/** Build a URL-safe src for an exact on-disk filename (spaces, typos preserved).
 *  Supports subfolder paths (e.g. "alutit/Alutit rainbow.png") — each segment is
 *  encoded separately so the "/" stays a real path separator. */
export function pictureSrc(filename: string): string {
  const encoded = filename.split("/").map(encodeURIComponent).join("/");
  return `${PICTURES_BASE}/${encoded}`;
}
