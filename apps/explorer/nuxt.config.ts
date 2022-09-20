import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  build: {
    transpile: ['@apollo/client', 'ts-invariant/process']
  },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  typescript: {
    shim: false
  },
  colorMode: {
    preference: 'system', // default theme
    dataValue: 'theme', // activate data-theme in <html> tag
    classSuffix: ''
  }
})
