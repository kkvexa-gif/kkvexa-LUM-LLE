import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        lume: {
          ink: "#171614",
          ivory: "#F5F1EA",
          stone: "#D9D1C5",
          taupe: "#A69B8C",
          brown: "#302820",
          gold: "#B59A6A",
          goldLight: "#D4C29E",
          surface: "#FBF9F5",
          surfaceDark: "#1F1D1A",
          surfaceElevated: "#262320",
          border: "#E5DEC9",
          borderDark: "#3A352F",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        display: ["var(--font-cormorant)", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        widest: "0.2em",
        editorial: "0.12em",
        tightDisplay: "-0.02em",
      },
      lineHeight: {
        tightEditorial: "1.08",
      },
      transitionTimingFunction: {
        editorial: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
