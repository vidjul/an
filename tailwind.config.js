module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['Inter'],
      display: ['Roboto']
    },
    extend: {},
  },
  variants: {},
  plugins: [require("@tailwindcss/typography")],
};
