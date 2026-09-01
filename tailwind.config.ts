import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-cinzel)", "serif"],
        sans: ["var(--font-jakarta)", "sans-serif"],
      },
      colors: {
        navy: {
          950: "#070b14",
          900: "#0b1120",
          850: "#0f172a",
          800: "#1e293b",
          700: "#334155",
        },
        brand: {
          orange: "#f97316",
          orangeHover: "#ea580c",
          orangeLight: "#fb923c",
        },
      },
    },
  },
  plugins: [],
};

export default config;