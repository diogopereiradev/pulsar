// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { 
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  srcDir: 'src',
  dir: { public: '../public' },
  build: { transpile: ['primevue'] },
  postcss: {
    plugins: {
      autoprefixer: {},
      tailwindcss: {}
    }
  },
  plugins: ['./plugins/primevue.ts'],
  css: ['~/shared/assets/globals.css'],
  i18n: {
    defaultLocale: 'en',
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
  modules: [
    '@nuxtjs/i18n'
  ]
});