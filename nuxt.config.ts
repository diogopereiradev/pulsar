// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  plugins: [
    './plugins/fontawesome.ts',
    './plugins/primevue.ts'
  ],
  build: {
    transpile: [
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
      'primevue'
    ]
  },
  modules: ['@nuxtjs/i18n'],
  i18n: {
    defaultLocale: 'en',
    compilation: {
      jit: false
    },
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: './shared/locales/en.json'
      },
      {
        code: 'pt',
        iso: 'pt-BR',
        name: 'Português',
        file: './shared/locales/pt.json'
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
  css: ['~/shared/assets/globals.css', '@fortawesome/fontawesome-svg-core/styles.css']
});