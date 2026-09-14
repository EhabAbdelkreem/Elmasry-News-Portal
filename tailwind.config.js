/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Cairo', 'system-ui', 'sans-serif'],
        display: ['Amiri', 'Cairo', 'serif'],
        serif: ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
}
