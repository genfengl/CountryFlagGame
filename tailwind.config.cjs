/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainText: '#242424',
        mainBackground: 'rgba(255, 255, 255, 0.87)'
      },

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
        topInfiniteSlide: 'topInfiniteSlide 30s linear infinite',
        botInfiniteSlide: 'botInfiniteSlide 30s linear infinite',
      }
    },
  },
  plugins: [],
}
