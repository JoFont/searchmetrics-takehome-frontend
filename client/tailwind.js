module.exports = {
  purge: [],
  theme: {
    fontFamily: {
      sans: ['IBM Plex Sans', 'sans-serif']
    },
    fill: theme => ({
      black: theme('colors.black'),
      smetrics: theme('colors.smetrics')
    }),
    extend: {
      colors: {
        smetrics: '#12ae3a'
      },
      fontFamily: {
        smetrics: ['Gilroy', 'sans-serif']
      }
    }
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true
  }
};
