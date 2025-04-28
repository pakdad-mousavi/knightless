const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.{hbs,html}', './assets/js/**/*.{js,mjs}'],
  theme: {
    fontFamily: {
      sans: ['Public Sans', ...defaultTheme.fontFamily.sans],
      serif: ['Libre Baskerville', ...defaultTheme.fontFamily.serif],
    },
    extend: {
      colors: {
        birch: '#CCBFA6',
        driftwood: '#938368',
        ash: '#323334',
        spruce: '#20211D',
        charcoal: '#191818',
        'dark-oak': '#5B4F47',
        oak: '#8B7151',
        cream: '#F8F7F4',
      },
    },
  },
  plugins: [],
};
