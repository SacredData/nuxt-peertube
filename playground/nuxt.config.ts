export default defineNuxtConfig({
  ssr: false,
  baseURL: '/nuxt-peertube',
  modules: ['../src/module'],
  myModule: {
    serverUrl: 'https://gas.tube.sh'
  },
  peertube: {
    serverUrl: 'https://gas.tube.sh'
  },
  devtools: { enabled: true },
})
