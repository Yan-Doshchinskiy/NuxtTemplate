import localeEN from './locales/en';

export default {
  head: {
    ssr: true,
    target: 'server',
    title: 'Nuxt Template',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
    '~/assets/scss/main/index.scss'
  ],

  styleResources: {
    scss: ['~/assets/scss/styleResources/index.scss']
  },

  plugins: [

  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build'
  ],

  modules: [
    '@nuxtjs/style-resources',
    '@nuxtjs/i18n'
  ],

  render: {
    bundleRenderer: {
      shouldPreload: (_: string, type: string): boolean => ['font', 'script', 'image'].includes(type)
    }
  },

  build: {
    transpile: [
      'vee-validate/dist/rules',
      'vuex-module-decorators'
    ],
    extractCSS: {
      ignoreOrder: false
    },
    postcss: null
  },

  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    vueI18n: {
      messages: {
        en: localeEN
      }
    },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true
    }
  },
  env: {
  },
  vue: {
    config: {
      productionTip: false,
      devtools: true
    }
  }
};
