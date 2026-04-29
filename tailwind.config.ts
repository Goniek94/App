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
        navy: {
          950: "#040C1E",
          900: "#070E1F",
          800: "#0B1426",
          700: "#0F1D38",
          600: "#162848",
          500: "#1E3455",
          400: "#274264",
          300: "#3A5A7A",
        },
        gold: {
          50: "#FDF8E7",
          100: "#FAF0C5",
          200: "#F5DE82",
          300: "#EDCA3E",
          DEFAULT: "#D4AF37",
          400: "#D4AF37",
          500: "#B8941F",
          600: "#9A7A12",
        },
        cream: {
          50: "#FDFAF5",
          DEFAULT: "#F5F0E8",
          200: "#F5F0E8",
          300: "#EDE5D5",
          400: "#E0D4BF",
        },
      },
      boxShadow: {
        gold: "0 4px 24px rgba(212, 175, 55, 0.25)",
        "gold-lg": "0 0 48px rgba(212, 175, 55, 0.2)",
        card: "0 8px 40px rgba(4, 12, 30, 0.6)",
      },
      animation: {
        "fade-in": "fadeIn 0.2s ease-out",
        "slide-up": "slideUp 0.25s ease-out",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        slideUp: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
