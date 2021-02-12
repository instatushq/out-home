module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
       'display': ['ModeSeven', 'ui-monospace', 'SFMono-Regular']
      },
      colors: {
        'green-dark': '#00E7C0',
        'green-light': '#00B492',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
