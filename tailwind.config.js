const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
      display: ['var(--font-roboto)', ...defaultTheme.fontFamily.sans]
    },
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
