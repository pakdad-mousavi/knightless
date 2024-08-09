const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./views/**/*.{hbs,html}", "./assets/js/**/*.js"],
  theme: {
    fontFamily: {
      display: ["Libre Baskerville", ...defaultTheme.fontFamily.serif],
    },
  },
  plugins: [],
};
