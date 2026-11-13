/** One quiet line under a case study's title: what I did, and in what context. The same on every
 *  project page, so a reader can find it without looking. */
export function CaseFacts({
  children,
  className = "",
  tone = "light",
}: {
  children: string;
  className?: string;
  /** "dark" for use on a black background. */
  tone?: "light" | "dark";
}) {
  return <p className={`text-sm ${tone === "dark" ? "text-surface/70" : "text-ink-muted"} ${className}`}>{children}</p>;
}
