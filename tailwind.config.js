const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Sintony", "sans-serif"],
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            h1: {
              fontFamily: theme("fontFamily.heading").join(", "),
            },
            h2: {
              fontFamily: theme("fontFamily.heading").join(", "),
            },
            h3: {
              fontFamily: theme("fontFamily.heading").join(", "),
            },
            h4: {
              fontFamily: theme("fontFamily.heading").join(", "),
            },
            h5: {
              fontFamily: theme("fontFamily.heading").join(", "),
            },
            h6: {
              fontFamily: theme("fontFamily.heading").join(", "),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
