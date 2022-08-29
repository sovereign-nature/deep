import { defineNuxtConfig } from 'nuxt'
import eslintPlugin from 'vite-plugin-eslint'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode'],
  typescript: {
    shim: false
  },
  colorMode: {
    preference: 'system', // default theme
    dataValue: 'theme', // activate data-theme in <html> tag
    classSuffix: ''
  },
  vite: {
    plugins: [eslintPlugin()]
  }
})
