/** The project's disciplines as one quiet line of text instead of a row of boxed chips. */
export function TagLine({ tags, className = "" }: { tags: readonly string[]; className?: string }) {
  return (
    <p className={`text-sm text-ink-muted ${className}`}>
      {tags.map((tag, i) => (
        <span key={tag}>
          {i > 0 ? (
            <span aria-hidden className="mx-2.5 text-ink-subtle">
              /
            </span>
          ) : null}
          {tag}
        </span>
      ))}
    </p>
  );
}
