/** The project's disciplines as one quiet line of text instead of a row of boxed chips. */
export function TagLine({
  tags,
  className = "",
  tone = "light",
}: {
  tags: readonly string[];
  className?: string;
  /** "dark" for use on a black background. */
  tone?: "light" | "dark";
}) {
  const text = tone === "dark" ? "text-surface/70" : "text-ink-muted";
  const slash = tone === "dark" ? "text-surface/35" : "text-ink-subtle";
  return (
    <p className={`text-sm ${text} ${className}`}>
      {tags.map((tag, i) => (
        <span key={tag}>
          <span className="whitespace-nowrap">
            {tag}
            {i < tags.length - 1 ? (
              <span aria-hidden className={`ml-2.5 ${slash}`}>
                /
              </span>
            ) : null}
          </span>
          {i < tags.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
