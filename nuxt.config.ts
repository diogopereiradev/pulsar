// https://nuxt.com/docs/api/configuration/nuxt-config
import path from 'path';

export default defineNuxtConfig({
  plugins: [
    './plugins/fontawesome.ts',
    './plugins/primevue.ts',
    './plugins/directives.ts'
  ],
  nitro: {
    compressPublicAssets: true,
    minify: true
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
  modules: ['@nuxtjs/i18n', '@nuxt/image'],
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
        file: 'locales/en.json'
      },
      {
        code: 'pt',
        iso: 'pt-BR',
        name: 'Português',
        file: 'locales/pt.json'
      }
    ]
  },
  devtools: { 
    enabled: true
  },  
  srcDir: 'src',
  dir: { public: '../public' },
  postcss: {
    plugins: {
      autoprefixer: {},
      tailwindcss: {}
    }
  },
  css: ['~/shared/assets/globals.css', '@fortawesome/fontawesome-svg-core/styles.css'],
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
  }
});