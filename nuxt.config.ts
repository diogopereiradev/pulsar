// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n'],
  plugins: ['./plugins/primevue.ts'],
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
  build: { transpile: ['primevue'] },
  postcss: {
    plugins: {
      autoprefixer: {},
      tailwindcss: {}
    }
  },
  css: ['~/shared/assets/globals.css']
});