/* eslint-disable turbo/no-undeclared-env-vars */
import { defineNuxtConfig } from 'nuxt/config'

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
  },
  publicRuntimeConfig: {
    baseURL: process.env.ENV_BUILD || process.env.ENV_DEV
  }
})
