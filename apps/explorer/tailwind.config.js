module.exports = {
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        landing: "url('~/assets/images/background-landing.png')",
        leo: "url('~/assets/images/leo.png')"
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['garden']
  }
}
