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
        ink: {
          DEFAULT: "#0D2C4A",     // Primary Navy from Tahzib Institute
          light: "#16385C",
        },
        teal: {
          DEFAULT: "#008075",     // Deep Teal
          light: "#00A896",     // Bright Teal / Cyan from Tahzib Institute
        },
        cyan: {
          DEFAULT: "#0EA5E9",
          light: "#38BDF8",
        },
        paper: {
          DEFAULT: "#FFFFFF",
          dim: "#F8FAFC",       // Soft Slate-50 Background
        },
      },
      fontFamily: {
        serif: ["var(--font-fraunces)", "serif"],
        sans: ["var(--font-hind-siliguri)", "var(--font-work-sans)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
        bengali: ["var(--font-hind-siliguri)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
