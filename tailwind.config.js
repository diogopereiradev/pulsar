/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/components/**/*.{js,vue,ts}",
    "./src/layouts/**/*.vue",
    "./src/pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./src/app.vue"
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
        background: '#030014'
      }
    }
  },
  plugins: []
}