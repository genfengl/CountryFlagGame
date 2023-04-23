/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login-pattern': 
          "linear-gradient(75deg, #7dd3fc 39%, #2980b9 66%, #6dd5fa 83.5%, #ffffff 100%)"
      },

      colors: {
        mainText: '#242424',
        mainBackground: 'rgba(255, 255, 255, 0.87)'
      },

      backgroundSize: {
        '300%': '300%',
      },

      keyframes: {
        topInfiniteSlide: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-2400px)' }
        },
        botInfiniteSlide: {
          '0%': { transform: 'translateX(-2400px)' },
          '100%': { transform: 'translateX(0%)' }
        }
      },
      animation: {
        topInfiniteSlide: 'topInfiniteSlide 36s linear infinite',
        botInfiniteSlide: 'botInfiniteSlide 36s linear infinite',
      }
    },
  },
  plugins: [],
}
