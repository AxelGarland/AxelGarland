"use client";

import { useState, type FormEvent } from "react";

/**
 * TODO: replace with your real Formspree endpoint once you've created a form at formspree.io.
 * It looks like: https://formspree.io/f/xxxxxxxx
 */
const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

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
      <p className="rounded-md border border-teal/30 bg-teal-soft px-5 py-4 text-sm text-ink">
        Thanks — your message is in. I&rsquo;ll get back to you soon.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="flex flex-col gap-1.5">
        <label htmlFor="name" className="text-xs font-medium uppercase tracking-[0.16em] text-ink-subtle">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="rounded border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="email" className="text-xs font-medium uppercase tracking-[0.16em] text-ink-subtle">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="rounded border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <label htmlFor="message" className="text-xs font-medium uppercase tracking-[0.16em] text-ink-subtle">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className="rounded border border-ink/15 bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-colors focus:border-accent"
        />
      </div>

      {status === "error" ? (
        <p className="text-sm text-coral">Something went wrong — try again, or email me directly.</p>
      ) : null}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="inline-block w-fit rounded border border-accent px-5 py-2.5 text-sm font-medium text-ink transition-colors duration-500 hover:bg-accent-soft disabled:opacity-50"
      >
        {status === "submitting" ? "Sending…" : "Send"}
      </button>
    </form>
  );
}
