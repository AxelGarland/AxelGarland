/** Base URL for files in `/pictures` (served via `public/pictures` symlink). */
export const PICTURES_BASE = "/pictures";

/** Build a URL-safe src for an exact on-disk filename (spaces, typos preserved). */
export function pictureSrc(filename: string): string {
  return `${PICTURES_BASE}/${encodeURIComponent(filename)}`;
}
