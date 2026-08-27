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
        /** Page background — light theme (2026-08-27: switched from a dark charcoal theme per direct
         *  request — "switch everything to a light grey"). One flat light grey used everywhere: hero,
         *  nav, footer, Work sections. `raised`/`elevated` step slightly darker/greyer for placeholders
         *  and subtle separation, mirroring the old dark theme's logic in reverse. */
        surface: {
          DEFAULT: "#F1F0EE",
          raised: "#E8E6E2",
          elevated: "#DEDBD6",
        },
        /** Text color used INSIDE white paper cards — stays dark, unaffected by the page theme. */
        ink: {
          DEFAULT: "#0c0c0e",
          muted: "rgba(12, 12, 14, 0.56)",
          subtle: "rgba(12, 12, 14, 0.38)",
        },
        /** White card background for dense reading content (bio, case studies, forms) floating on the
         *  light grey page. */
        paper: {
          DEFAULT: "#ffffff",
          raised: "#fafafa",
        },
        /** Dark text used directly on the light grey page background (headlines, nav, footer) — same
         *  role `mist` always had, just flipped from light-on-dark to dark-on-light. */
        mist: {
          DEFAULT: "#1c1b1e",
          muted: "rgba(28, 27, 30, 0.62)",
          subtle: "rgba(28, 27, 30, 0.4)",
        },
        accent: {
          DEFAULT: "#8d9bd6",
          soft: "rgba(141, 155, 214, 0.18)",
          glow: "rgba(141, 155, 214, 0.4)",
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
        indigo: {
          DEFAULT: "#8676DE",
          soft: "rgba(134, 118, 222, 0.18)",
        },
        gold: {
          DEFAULT: "#E4B355",
          soft: "rgba(228, 179, 85, 0.18)",
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
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
        30: "7.5rem",
      },
      maxWidth: {
        content: "min(92vw, 72rem)",
        prose: "42ch",
      },
      animation: {
        "grain-shift": "grain 8s steps(10) infinite",
        "drift-slow": "drift 32s ease-in-out infinite alternate",
        "drift-medium": "drift 48s ease-in-out infinite alternate-reverse",
        "drift-vertical": "driftVertical 40s ease-in-out infinite alternate",
        marquee: "marquee 80s linear infinite",
      },
      keyframes: {
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
