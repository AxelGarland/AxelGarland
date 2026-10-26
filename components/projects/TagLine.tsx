/** The project's disciplines as one quiet line of text, separated by small red dots. */
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
  return (
    <p className={`text-sm ${text} ${className}`}>
      {tags.map((tag, i) => (
        <span key={tag}>
          <span className="whitespace-nowrap">
            {tag}
            {i < tags.length - 1 ? (
              <span aria-hidden className="ml-3 mr-2 inline-block h-1.5 w-1.5 rounded-full bg-accent align-middle" />
            ) : null}
          </span>
          {i < tags.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
