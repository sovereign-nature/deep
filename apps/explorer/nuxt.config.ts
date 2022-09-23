/* eslint-disable turbo/no-undeclared-env-vars */
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', 'nuxt-graphql-client'],
  typescript: {
    shim: false
  },
  'graphql-client': {},
  colorMode: {
    preference: 'system', // default theme
    dataValue: 'theme', // activate data-theme in <html> tag
    classSuffix: ''
  },
  runtimeConfig: {
    public: {
      GQL_HOST: ''
    }
  }
})
