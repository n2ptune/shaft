const icons = require('./src/assets/icons/index')

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    // link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    link: [
      {
        rel: 'prefetch',
        type: 'text/css',
        href:
          'https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@100;300;400;500;700&family=Noto+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap'
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['~/assets/css/global.css'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '~/plugins/axios' },
    { src: '~/plugins/editor', mode: 'client' },
    { src: '~/plugins/date', mode: 'client' },
    { src: '~/plugins/safe-v-html', mode: 'client' },
    { src: '~/plugins/confirm.client.js' },
    { src: '~/plugins/tooltip.js' }
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/fontawesome'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    'nuxt-client-init-module',
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    // Doc: https://github.com/nuxt-community/dotenv-module
    '@nuxtjs/dotenv',
    '@nuxtjs/dayjs'
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    postcss: {},
    extractCSS: process.env.NODE_ENV === 'production',
    extend(config, ctx) {}
  },
  serverMiddleware: [
    {
      handler: '@/api/index.js',
      path: '/api'
    }
  ],
  dayjs: {
    locales: ['ko'],
    defaultLocale: 'ko'
  },
  purgeCSS: {
    whitelist: ['svg--inline-fa'],
    whitelistPatterns: [/shiki/, /fa-$/]
  },
  fontawesome: {
    component: 'fa',
    icons: {
      solid: icons.solid,
      regular: icons.regular,
      brands: icons.brands
    }
  },
  srcDir: 'src/',
  dotenv: {
    path: './'
  }
}
