"use client";

import { HalftoneButton } from "@/components/sections/HalftoneButton";
import { useEffect, useRef, useState, type FormEvent } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xljdenpl";

type Status = "idle" | "submitting" | "success" | "error";

/** Borders dark enough to read as a field (3:1 against the page), labels at 14px, inputs at 16px so
 *  phones do not zoom in on focus. */
const FIELD =
  "border border-ink-subtle/80 bg-surface px-4 py-3 text-base text-ink outline-none transition-colors duration-300 focus:border-accent focus:ring-2 focus:ring-accent/25";
const LABEL = "text-sm font-medium uppercase tracking-[0.1em] text-ink-subtle";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const message = useRef<HTMLParagraphElement>(null);

  // When the form is replaced by its result, move focus to the result so keyboard and screen-reader
  // users are not left on a control that no longer exists.
  useEffect(() => {
    if (status === "success" || status === "error") message.current?.focus();
  }, [status]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <p
        ref={message}
        tabIndex={-1}
        role="status"
        className="flex items-start gap-3 border border-ink/20 bg-surface px-5 py-4 text-base leading-relaxed text-ink outline-none"
      >
        <span aria-hidden className="mt-[0.55em] h-2 w-2 shrink-0 rounded-full bg-accent" />
        Thanks, I got your message. I&rsquo;ll reply soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className={LABEL}>
          Name
        </label>
        <input id="name" name="name" type="text" autoComplete="name" required className={FIELD} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className={LABEL}>
          Email
        </label>
        <input id="email" name="email" type="email" autoComplete="email" required className={FIELD} />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className={LABEL}>
          Message
        </label>
        <textarea id="message" name="message" required rows={5} className={FIELD} />
      </div>

      {status === "error" ? (
        <p ref={message} tabIndex={-1} role="alert" className="text-base text-accent-ink outline-none">
          Something went wrong. Try again, or email me directly.
        </p>
      ) : null}

      <HalftoneButton type="submit" disabled={status === "submitting"} label={status === "submitting" ? "Sending…" : "Send"} />
    </form>
  );
}
