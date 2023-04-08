/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        topInfiniteSlide: {
          '0%': { transform: 'translateX(0%)'},
          '100%': {transform: 'translateX(-2400px)'}
        },
        botInfiniteSlide: {
          '0%': { transform: 'translateX(-2400px)'},
          '100%': {transform: 'translateX(0%)'}
        }
      },
      animation: {
        topInfiniteSlide: 'topInfiniteSlide 20s linear infinite',
        botInfiniteSlide: 'botInfiniteSlide 20s linear infinite',
      }
    },
  },
  plugins: [],
}
