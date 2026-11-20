import Link from "next/link";

/** The site's one button. It behaves like a layer in a design tool: pointing at it (or tabbing to it)
 *  selects it, which draws the thin blue frame with square corner handles around it. "solid" is the main
 *  action, "line" the quieter one. It can be an in-site link, an external link (opens in a new tab) or a
 *  form button. */
type Props = {
  label: string;
  /** In-site link, or an external one when `external` is set. Omit for a form button. */
  href?: string;
  external?: boolean;
  variant?: "solid" | "line";
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

export function DesignButton({ label, href, external = false, variant = "solid", type = "button", disabled = false, onClick, className = "" }: Props) {
  const cls = `design-btn design-btn-${variant} ${disabled ? "design-btn-off" : ""} ${className}`;
  const inner = (
    <>
      <style>{CSS}</style>
      <span className="db-label">{label}</span>
      {external ? <span className="sr-only"> (opens in a new tab)</span> : null}
      <span aria-hidden className="db-sel" />
      {["tl", "tr", "bl", "br"].map((c) => (
        <span key={c} aria-hidden className={`db-h db-${c}`} />
      ))}
    </>
  );
  if (!href) {
    return (
      <button type={type} disabled={disabled} onClick={onClick} className={cls}>
        {inner}
      </button>
    );
  }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

const CSS = `
.design-btn {
  --ui: #2354e6;
  position: relative;
  display: inline-flex;
  min-height: 3.9rem;
  align-items: center;
  justify-content: center;
  padding: 0 1rem;
  font-size: clamp(0.9rem, 1.25vw, 1.15rem);
  white-space: nowrap;
  font-weight: 600;
  letter-spacing: 0.01em;
  text-decoration: none;
  outline: none;
  border: 0;
  cursor: pointer;
  font-family: inherit;
  transition: background-color 0.2s ease, color 0.2s ease;
}
.design-btn-off { opacity: 0.6; cursor: wait !important; }
.design-btn-solid { background: #1a1916; color: #fff; }
.design-btn-line { background: transparent; color: #1a1916; box-shadow: inset 0 0 0 1.5px #1a1916; }
.design-btn-line:hover, .design-btn-line:focus-visible { background: #1a19160d; }
.db-sel {
  position: absolute;
  inset: -5px;
  border: 1px solid var(--ui);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.15s ease;
}
.db-h {
  position: absolute;
  width: 9px;
  height: 9px;
  margin: -4.5px;
  background: #fff;
  border: 1px solid var(--ui);
  opacity: 0;
  transform: scale(0.3);
  pointer-events: none;
  transition: opacity 0.15s ease, transform 0.2s cubic-bezier(0.2, 1.4, 0.4, 1);
}
.db-tl { left: -5px; top: -5px; }
.db-tr { right: -5px; top: -5px; }
.db-bl { left: -5px; bottom: -5px; }
.db-br { right: -5px; bottom: -5px; }
.design-btn:hover .db-sel, .design-btn:focus-visible .db-sel { opacity: 1; }
.design-btn:hover .db-h, .design-btn:focus-visible .db-h { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  .db-h, .db-sel, .design-btn { transition: none; }
}
`;
