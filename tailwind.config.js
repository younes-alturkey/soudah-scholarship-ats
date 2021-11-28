module.exports = {
  purge: {
    enabled: true,
    content: ['./src/**/*.tsx', './src/**/*.ts'],
  },
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        HelveticaNeueLT: ['HelveticaNeueLT'],
      },
      colors: {
        sky: '#82DCE6',
        'sky-300': '#469ca6',
        'sky-700': '#325559',
        mist: '#F5EBE6',
        peak: '#8C7D78',
        rock: '#321E1E',
        green: '#C8DCAA',
        yellow: '#F0B946',
        orange: '#E69650',
        red: '#E17373',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
