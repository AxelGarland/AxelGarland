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
        /** Page background — dark theme. Never pure black, avoids harsh contrast. */
        surface: {
          DEFAULT: "#0a0a0e",
          raised: "#131318",
          elevated: "#1c1c22",
        },
        /** Text color used INSIDE white paper cards — stays dark, unaffected by the dark theme. */
        ink: {
          DEFAULT: "#0c0c0e",
          muted: "rgba(12, 12, 14, 0.56)",
          subtle: "rgba(12, 12, 14, 0.38)",
        },
        /** White card background for dense reading content (bio, case studies, forms) floating on the dark page. */
        paper: {
          DEFAULT: "#ffffff",
          raised: "#fafafa",
        },
        /** Light text used directly on the dark page background (headlines, nav, footer). */
        mist: {
          DEFAULT: "#f3f3f5",
          muted: "rgba(243, 243, 245, 0.62)",
          subtle: "rgba(243, 243, 245, 0.4)",
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
