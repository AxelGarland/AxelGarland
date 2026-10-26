"use client";

import { HalftoneButton } from "@/components/sections/HalftoneButton";
import { useState, type FormEvent } from "react";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xljdenpl";

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
      <p className="border border-teal/30 bg-teal-soft px-5 py-4 text-sm text-ink">
        Thanks, your message is in. I&rsquo;ll get back to you soon.
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
          className="border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-all duration-300 focus:border-accent focus:ring-2 focus:ring-accent/20"
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
          className="border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-all duration-300 focus:border-accent focus:ring-2 focus:ring-accent/20"
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
          className="border border-line bg-surface px-4 py-2.5 text-sm text-ink outline-none transition-all duration-300 focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
      </div>

      {status === "error" ? (
        <p className="text-sm text-coral">Something went wrong, try again, or email me directly.</p>
      ) : null}

      <HalftoneButton type="submit" disabled={status === "submitting"} label={status === "submitting" ? "Sending…" : "Send"} />
    </form>
  );
}
