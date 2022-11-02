import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/color-mode', 'nuxt-graphql-client'],
  experimental: {
    reactivityTransform: true
  },
  typescript: {
    shim: false
  },
  colorMode: {
    preference: 'system', // default theme
    dataValue: 'theme', // activate data-theme in <html> tag
    classSuffix: ''
  },
  runtimeConfig: {
    public: {
      'graphql-client': {
        clients: {
          default: {
            host: 'https://api.thegraph.com/subgraphs/name/sovereign-nature/sni'
          }
        }
      },
      mapboxToken: 'DEFINE_TOKEN_IN_ENV'
    }
  }
})
