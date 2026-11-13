"use client";

import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";

/** An email link that copies the address when it is clicked, and says so. Many visitors have no mail
 *  app set up, so a plain mailto does nothing for them. Modified clicks (open in a new tab, copy link)
 *  and browsers that refuse clipboard access fall back to the ordinary mailto. The label never changes
 *  width while it says "Copied", so nothing around it moves. */
export function CopyEmail({
  email,
  className = "",
  children,
}: {
  email: string;
  className?: string;
  children?: ReactNode;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  }

  return (
    <>
      <a href={`mailto:${email}`} onClick={onClick} className={className}>
        <span className="relative inline-grid">
          <span className={copied ? "invisible" : ""}>{children ?? email}</span>
          {copied ? (
            <span aria-hidden className="absolute inset-0 text-accent-ink">
              Copied
            </span>
          ) : null}
        </span>
      </a>
      <span role="status" aria-live="polite" className="sr-only">
        {copied ? "Email address copied" : ""}
      </span>
    </>
  );
}
