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
        "cc-bg": "var(--cc-bg)",
        "cc-text": "var(--cc-text)",
        "cc-text-body": "var(--cc-text-body)",
        "cc-text-label": "var(--cc-text-label)",
        "cc-muted": "var(--cc-muted)",
        "cc-accent": "var(--cc-accent)",
        "cc-accent-hover": "var(--cc-accent-hover)",
        "cc-accent-light": "var(--cc-accent-light)",
        "cc-surface": "var(--cc-surface)",
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
