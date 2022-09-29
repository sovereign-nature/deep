module.exports = {
  content: [],
  theme: {
    extend: {
      backgroundImage: {
        landing: "url('~/assets/images/background-landing.png')",
        leo: "url('~/assets/images/leo.png')",
        deCeuvel: "url('~/assets/images/deceuvel.jpg')"
      }
    }
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['garden']
  }
}
