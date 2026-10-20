import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Analytics · Axel Garland",
  robots: { index: false, follow: false },
};

export default function ExcludeMeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
