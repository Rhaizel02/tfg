/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: ['./src/**/*.{html,ts}'],
  theme: {},
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

