/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["var(--font-dm-sans)"],
    },
    extend: {
      colors: {
        primary: {
          purple: "#A162F7",
          light: "#E0E4E7",
          dark: "#242731",
        },
        secondary: {
          blue: {
            100: "#579BFF",
            200: "#C6DCFC",
            300: "#2884FF",
            400: "#438FFE",
          },
          yellow: "#F6CC0D",
          red: "#FF6370",
          green: "#70CF97",
          orange: "#FF764C",
        },
        gray: {
          100: "#F5F4F6",
          200: "#E0E4E7",
          300: "#A4A5A6",
          400: "#7C7C8D",
          500: "#72767C",
          600: "#5F6165",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
