import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "#0a0f1a",
        card: "#111827",
        accent: "#22d3ee",
        text: "#f8fafc",
        muted: "#94a3b8"
      }
    }
  },
  plugins: []
};

export default config;
