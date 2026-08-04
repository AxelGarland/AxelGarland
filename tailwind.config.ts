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
        surface: {
          DEFAULT: "#ffffff",
          raised: "#f5f5f6",
          elevated: "#eaeaeb",
        },
        ink: {
          DEFAULT: "#0c0c0e",
          muted: "rgba(12, 12, 14, 0.56)",
          subtle: "rgba(12, 12, 14, 0.38)",
        },
        accent: {
          DEFAULT: "#6d7eb3",
          soft: "rgba(109, 126, 179, 0.16)",
          glow: "rgba(109, 126, 179, 0.38)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
        bebas: ["var(--font-bebas)", "Impact", "sans-serif"],
        playfair: ["var(--font-playfair)", "Georgia", "serif"],
        space: ["var(--font-space)", "system-ui", "sans-serif"],
        syne: ["var(--font-syne)", "system-ui", "sans-serif"],
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
