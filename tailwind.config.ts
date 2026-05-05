import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-dark": "#111921",
        "bg-light": "#f9faff",
        "bg-yellow": "#fdc700",
        "bg-blue": "#1c1a96",
        "text-primary": "#fafafa",
        "text-dark": "#111921",
        "text-muted": "#41474d",
        "text-subtle": "#a0a3a6",
        border: "rgba(65,71,77,0.3)",
      },
      fontFamily: {
        swis: ['"Swis721 Ex BT"', "sans-serif"],
        "swis-blk": ['"Swis721 Blk BT"', "sans-serif"],
        haas: ['"Neue Haas Grotesk Text Pro"', "sans-serif"],
        "haas-display": ['"Neue Haas Grotesk Display Pro"', "sans-serif"],
        gyst: ['"Gyst Variable"', "sans-serif"],
      },
      borderRadius: {
        xs: "8px",
        sm: "16px",
      },
    },
  },
  plugins: [],
};

export default config;
