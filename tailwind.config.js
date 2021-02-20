module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', 
  theme: {
    screens: {
      'sm': '640px',
      'md': '1024px',
      'lg': '1280px',
      'xl': '1400px',
    },
    extend: {
      fontFamily: {
       'display': ['ModeSeven', 'ui-monospace', 'SFMono-Regular']
      },
      colors: {
        'green-dark': '#00E7C0',
        'green-light': '#00B492',
      },
      borderRadius: {
        xl: '20px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
