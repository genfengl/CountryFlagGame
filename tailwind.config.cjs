/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        infiniteSlide: {
          '0%': { transform: 'translateX(0%)'},
          '100%': {transform: 'translateX(-2400px)'}
        }
      },
      animation: {
        infiniteSlide: 'infiniteSlide 20s linear infinite'
      }
    },
  },
  plugins: [],
}
