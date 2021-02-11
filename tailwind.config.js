const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: [
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2C2C42",
        secondary: {
          DEFAULT: "#ffffff",
          dark: "#393e41",
        },
        tertiary: {
          DEFAULT: "#C7B9B9",
          dark: "#ffffff",
        },
        quaternary: "#120303",
      },
      fontFamily: {
        heading: ["Sintony", "sans-serif"],
        sans: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme("colors.primary.DEFAULT"),
            h1: {
              color: theme("colors.primary.DEFAULT"),
            },
          },
        },
        dark: {
          css: {
            color: theme("colors.tertiary.dark"),
            h1: {
              color: theme("colors.tertiary.dark"),
            },
          },
        },
      }),
    },
  },
  variants: {
    extend: {
      typography: ["dark"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
  darkMode: "class",
};
