/** @type {import('tailwindcss').Config} */
// tailwind.config.js
module.exports = {
  prefix: 'tw-',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        'slide-in': {
          '0%': { opacity: 0, transform: 'translateY(-50px) scale(.9)' },
          '100%': { opacity: 1, transform: 'translateY(0px)  scale(1)' },
        },
        'slide-in-bottom': {
          '0%': { opacity: 0, transform: 'translateY(50px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'slide-in': 'slide-in .3s forwards ease-out',
        'slide-in-bottom': 'slide-in-bottom .3s both ease-out',
        'fade-in': 'fade-in .3s forwards ease-out',
      },
      zIndex: {
        max: '9999999999',
      },
      fontFamily: {
        'grand-hotel': ['"Grand Hotel"', 'cursive'],
        'noto-sans': ['"Noto Sans"', 'sans-serif'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
