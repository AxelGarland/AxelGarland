import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /** Page background — warm editorial palette (2026-09-04, replacing the flat light-grey theme):
         *  a cream base with a slightly deeper "raised" tone for cards/panels and an "elevated" step
         *  for hover/placeholder states. Sourced from Axel's own Adobe Express mockup. */
        surface: {
          DEFAULT: "#FFFFFF",
          raised: "#F5F4F1",
          elevated: "#ECEAE5",
        },
        /** Primary text color, everywhere — page bg and card bg are close enough in tone now that
         *  there's no separate "text on white card" vs "text on page" distinction like the old
         *  dark-theme system needed. */
        ink: {
          DEFAULT: "#1A1916",
          muted: "#5C5A54",
          subtle: "#6A6862",
        },
        /** Card/panel background — same family as `surface`, kept as a distinct name for spots that
         *  read better as a slightly-raised "card" than the bare page (contact form, case-study panels). */
        paper: {
          DEFAULT: "#F5F4F1",
          raised: "#ECEAE5",
        },
        /** Same role `ink` always had under its old name `mist` (text directly on the page background) —
         *  aliased to identical values so nothing relying on the old name breaks mid-migration. */
        mist: {
          DEFAULT: "#1A1916",
          muted: "#5C5A54",
          subtle: "#6A6862",
        },
        /** The site's one accent color: eyebrows, links, focus rings, hover states. Same red as
         *  `blush` (2026-09-15, replacing the previous terracotta, which read too close to
         *  Claude's own brand orange for a portfolio). */
        accent: {
          DEFAULT: "#D64040",
          hover: "#A03030",
          soft: "rgba(214, 64, 64, 0.14)",
          glow: "rgba(214, 64, 64, 0.35)",
          /** Small red text on cream needs a deeper red to pass 4.5:1 contrast. */
          ink: "#B83232",
          /** The same role on the near-black sections: a lighter red, 5:1 or better. */
          light: "#E55B5B",
        },
        /** Crisp warm-grey border — replaces opacity-based `border-ink/10` style borders where a
         *  solid hairline reads cleaner against the cream palette. */
        line: {
          DEFAULT: "#E1DFDA",
        },
        /** Per-project accent tones — one assigned per case study/project, not a global accent.
         *  Brightened versus their original light-theme values so they read clearly on near-black. */
        coral: {
          DEFAULT: "#F06479",
          soft: "rgba(240, 100, 121, 0.16)",
        },
        teal: {
          DEFAULT: "#1CB88C",
          soft: "rgba(28, 184, 140, 0.16)",
        },
        /** Better Eater's wordmark green, sampled from the logo. */
        leaf: {
          DEFAULT: "#4AA444",
          soft: "rgba(74, 164, 68, 0.16)",
        },
        indigo: {
          DEFAULT: "#8676DE",
          soft: "rgba(134, 118, 222, 0.18)",
        },
        gold: {
          DEFAULT: "#E4B355",
          soft: "rgba(228, 179, 85, 0.18)",
        },
        /** True violet — distinct from `indigo` (Akko's cooler blue-purple), for Alutit's own
         *  warmer purple identity. */
        violet: {
          DEFAULT: "#9B5DE5",
          soft: "rgba(155, 93, 229, 0.18)",
        },
        /** Clean sky blue — distinct from `teal` (greener) and `indigo` (more purple), for
         *  Better Eater's work-grid glow. */
        blue: {
          DEFAULT: "#3B82F6",
          soft: "rgba(59, 130, 246, 0.18)",
        },
        /** Sampled directly from the hero self-portrait illustration: the pencil's yellow and the
         *  red cheek blush. Used for the hero's "Work" button and its ambient glow blobs. */
        pencil: {
          DEFAULT: "#FEB728",
        },
        blush: {
          DEFAULT: "#D64040",
          soft: "rgba(214, 64, 64, 0.2)",
        },
      },
      fontFamily: {
        /** --font-hebrew comes before generic fallbacks so Hebrew glyphs (absent from both
         *  Work Sans and Cormorant Garamond) render in a neutral Hebrew sans instead of
         *  whatever serif-ish default the OS picks. */
        sans: ["var(--font-body)", "var(--font-hebrew)", "system-ui", "sans-serif"],
        display: ["var(--font-body)", "var(--font-hebrew)", "system-ui", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      maxWidth: {
        content: "min(96vw, 1408px)",
        prose: "42ch",
      },
      animation: {
        "ring-spin": "ring-spin 36s linear infinite",
        "grain-shift": "grain 8s steps(10) infinite",
        "drift-slow": "drift 32s ease-in-out infinite alternate",
        "drift-medium": "drift 48s ease-in-out infinite alternate-reverse",
        "drift-vertical": "driftVertical 40s ease-in-out infinite alternate",
        marquee: "marquee 80s linear infinite",
      },
      keyframes: {
        "ring-spin": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%": { transform: "translate(-5%, -10%)" },
          "30%": { transform: "translate(3%, -15%)" },
          "50%": { transform: "translate(12%, 9%)" },
          "70%": { transform: "translate(9%, 4%)" },
          "90%": { transform: "translate(-1%, 7%)" },
        },
        drift: {
          "0%": { transform: "translate3d(-2%, 1%, 0) scale(1)" },
          "100%": { transform: "translate3d(2%, -1%, 0) scale(1.04)" },
        },
        driftVertical: {
          "0%": { transform: "translate3d(0, -1.5%, 0)" },
          "100%": { transform: "translate3d(0, 1.5%, 0)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "glow-radial":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(109, 126, 179, 0.11), transparent 55%)",
        "glow-corner":
          "radial-gradient(ellipse 60% 40% at 90% 10%, rgba(109, 126, 179, 0.09), transparent 50%)",
      },
    },
  },
  plugins: [],
};

export default config;
