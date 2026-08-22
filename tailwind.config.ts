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
        "cc-bg": "rgb(var(--cc-bg) / <alpha-value>)",
        "cc-text": "rgb(var(--cc-text) / <alpha-value>)",
        "cc-text-body": "rgb(var(--cc-text-body) / <alpha-value>)",
        "cc-text-label": "rgb(var(--cc-text-label) / <alpha-value>)",
        "cc-muted": "rgb(var(--cc-muted) / <alpha-value>)",
        "cc-accent": "rgb(var(--cc-accent) / <alpha-value>)",
        "cc-accent-hover": "rgb(var(--cc-accent-hover) / <alpha-value>)",
        "cc-accent-light": "rgb(var(--cc-accent-light) / <alpha-value>)",
        "cc-surface": "rgb(var(--cc-surface) / <alpha-value>)",
        "cc-warm": "rgb(var(--cc-warm) / <alpha-value>)",
        "cc-warm-deep": "rgb(var(--cc-warm-deep) / <alpha-value>)",
        "cc-warm-light": "rgb(var(--cc-warm-light) / <alpha-value>)",
      },
      fontFamily: {
        display: ["var(--cc-font-display)"],
        body: ["var(--cc-font-body)"],
      },
      borderRadius: {
        sm: "var(--cc-radius-sm)",
        md: "var(--cc-radius-md)",
        lg: "var(--cc-radius-lg)",
        xl: "var(--cc-radius-xl)",
      },
    },
  },
  plugins: [],
};
export default config;
