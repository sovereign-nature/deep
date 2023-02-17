// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/apollo'],
  apollo: {
    clients: {
      default: {
        httpEndpoint:
          'https://api.thegraph.com/subgraphs/name/sovereign-nature/sni',
      },
    },
  },
});
