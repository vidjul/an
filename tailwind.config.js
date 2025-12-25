const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ["var(--font-catamaran)", ...defaultTheme.fontFamily.sans],
      display: ["var(--font-lato)", ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
