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
  modules: [
    [
      '@nuxtjs/i18n',
      {
        vueI18n: './i18n.config.ts',
        defaultLocale: 'en',
        locales: [
          {
            code: 'en',
            name: 'English',
            file: './shared/locales/en.json'
          },
          {
            code: 'pt',
            name: 'Português',
            file: './shared/locales/pt.json'
          },
        ]
      }
    ]
  ]
});