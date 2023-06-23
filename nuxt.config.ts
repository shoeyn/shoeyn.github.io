export default defineNuxtConfig({
  typescript: {
    shim: false
  },

  modules: [
    '@nuxt/content',
    '@nuxtjs/color-mode',
    '@nuxtjs/tailwindcss',
    '@nuxt/devtools'
  ],

  nitro: {
    prerender: {
      routes: ['/sitemap.xml']
    }
  },

  colorMode: {
    classSuffix: ''
  },

  content: {
    navigation: {
      fields: ['navTitle']
    },
    highlight: {
      // See the available themes on https://github.com/shikijs/shiki/blob/main/docs/themes.md#all-theme
      theme: 'dracula'
    }
  },

  devtools: {
    enabled: true
  }
})
