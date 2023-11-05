// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';

export default defineNuxtConfig({
  modules: [
    '@sidebase/nuxt-auth',
    '@nuxtjs/i18n', 
    '@nuxt/image'
  ],
  plugins: [
    './plugins/fontawesome.ts',
    './plugins/primevue.ts',
    './plugins/directives.ts'
  ],
  srcDir: 'src',
  dir: { public: '../public' },
  devtools: { 
    enabled: true
  },
  nitro: {
    compressPublicAssets: true,
    minify: true
  },
  vite: {
    resolve: {
      alias: {
        fs: 'browserify-fs',
        path: 'path-browserify',
        '~': path.resolve(__dirname, './src')
      }
    },
    build: {
      chunkSizeWarningLimit: 2000
    }
  },
  routeRules: {
    '/**': { prerender: true }
  },
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      'primevue'
    ]
  },
  i18n: {
    vueI18n: './i18n.config.ts',
    defaultLocale: 'en',
    compilation: {
      jit: false
    },
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'shared/locales/en.json'
      },
      {
        code: 'pt',
        iso: 'pt-BR',
        name: 'Português',
        file: 'shared/locales/pt.json'
      }
    ]
  },
  auth: {
    isEnabled: true
  },
  postcss: {
    plugins: {
      autoprefixer: {},
      tailwindcss: {}
    }
  },
  css: ['~/shared/assets/globals.css', '@fortawesome/fontawesome-svg-core/styles.css']
});