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
      'graphql-client': {
        clients: {
          default: {
            host: 'http://localhost:4000/graphql',
            schema: './schema.gql'
          }
        }
      },
      MAPBOX_TOKEN:
        'pk.eyJ1IjoiZ2lvdmFubmVndWVycmEiLCJhIjoiY2w2bTFkOHd2MGg2MjNicnVyNHR4ZG5mYiJ9.MouD-LX3BD8dH-pewUSHTw'
    }
  }
})
