/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./src/shared/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./src/app.vue",
    "./src/error.vue",
    "./src/app/**/*.vue",
    "./node_modules/primevue/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1566px',
        '2xl': '1180px',
        xl: '900px',
        lg: '768px',
        md: '468px',
        sm: '320px'
      },
      colors: {
        background: '#0f111b',
        primary: '#7665d7',
        secondary: '#1a1d2e',
        secondary_darken: '#131524',
        divider: '#2b304a'
      },
      textColor: {
        primary: '#f0f0f0',
        secondary: '#7665d7',
        darken: '#131524'
      },
      fontFamily: {
        default: ['Roboto', 'Inter', 'open-sans', 'sans-serif']
      }
    }
  },
  plugins: []
}