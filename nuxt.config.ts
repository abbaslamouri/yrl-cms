import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  // modules: ['@nuxtjs/axios'],

  buildModules: ['@pinia/nuxt'],

  // modules: ['vue-sweetalert2/nuxt'],

  // modules: ['@nuxtjs/axios'],

  // axios: {
  //   baseURL: 'http://localhost:3000/api',
  //   proxyHeaders: false,
  // },

  // axios: {
  //   baseURL: 'http://localhost:3000/api',
  //   proxyHeaders: false,
  // },

  css: [
    '@/assets/scss/main.scss',
    // '@/assets/scss/_variables.scss',
    // '@/assets/scss/main.scss',
    // '~/assets/css/tailwind.css',
    // 'quill/dist/quill.core.css',
    // // for snow theme
    // 'quill/dist/quill.snow.css',
    // // for bubble theme
    // 'quill/dist/quill.bubble.css',
  ],

  // meta: {
  //   link: [
  //     // { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
  //     // { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
  //     {
  //       rel: 'stylesheet',
  //       href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,500;0,700;1,100&display=swap',
  //     },
  //     // <link rel="stylesheet" href="https://myawesome-lib.css">
  //     // { rel: 'stylesheet', href: 'https://awesome-lib.css' },
  //   ],
  // },
})

// <link rel="preconnect" href="https://fonts.googleapis.com">
// <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
// <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,500;0,700;1,100;1,300&display=swap" rel="stylesheet">
