/** @type {import('tailwindcss').Config} */
import colors from "tailwindcss/colors";

export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  darkMode: "selector",
  theme: {
    fontFamily: {
      sans: ["proxima-nova", "sans-serif"],
      serif: ["merriweather", "serif"],
    },
    fontSize: {
      sm: "0.9rem",
      base: "1.1rem",
      lg: "1.18rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
    extend: {
      colors: {
        brand: colors.emerald,
        secondary: colors.sky,
        main: "#fff6f6",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
