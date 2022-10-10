/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        'slide-in': {
          '0%': { opacity: 0, transform: 'translateY(-50px) scale(.9)' },
          '100%': { opacity: 1, transform: 'translateY(0px)  scale(1)' },
        },
      },
      animation: {
        'slide-in': 'slide-in .3s forwards ease-out',
      },
      zIndex: {
        max: '9999999999',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
