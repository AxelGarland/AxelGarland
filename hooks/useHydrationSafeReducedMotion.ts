"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Framer's `useReducedMotion()` is `null` during SSR; comparing it directly to
 * boolean branches causes server/client markup drift. We match SSR + first
 * client paint (assume false), then honor the real preference after hydrate.
 */
export function useHydrationSafeReducedMotion(): boolean {
  const prefersReduced = useReducedMotion();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  if (!hydrated) return false;
  return prefersReduced === true;
}
