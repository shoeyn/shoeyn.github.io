export default defineNuxtConfig({
  compatibilityDate: '2026-02-15',
  typescript: {
    shim: false
  },

  site: {
    url: 'https://shoeynet.com',
    name: 'Nathan Shoemark',
    description: 'Personal website of Nathan Shoemark',
  },

  modules: [
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxt/devtools',
    '@formkit/auto-animate',
    '@nuxtjs/sitemap',
    '@nuxt/content',
    "@nuxt/eslint"
  ],

  colorMode: {
    classSuffix: ''
  },

  devtools: {
    enabled: true
  }
})
