import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontSize: { 40: '40px' },
      colors: {
        primary: '#09bcef', // 设置 Tailwind 中的 primary 颜色
        danger: '#f04824',
      },
      backgroundImage: {
        banner:
          'url(https://beyours-theme-beauty.myshopify.com/cdn/shop/files/slide-1.jpg?v=1666079941&width=3000)',
        banner1:
          'url(https://beyours-theme-beauty.myshopify.com/cdn/shop/files/banner-6.jpg?v=1655430252&width=3000)',
        banner2:
          'url(https://beyours-theme-beauty.myshopify.com/cdn/shop/files/lookbook-1.jpg?v=1699506080&width=3000)',
      },
      fontFamily: {
        sans: ['var(--font-sans)'],
        mono: ['var(--font-mono)'],
        dynaPuff: ['var(--font-dynaPuff)'],
        'cherry-bomb': ['var(--font-cherry-bomb)'],
        'lilita-one': ['var(--font-lilita-one)'],
        //
      },
      zIndex: {
        500: 500,
      },
      keyframes: {
        tada: {
          from: { transform: 'scale3d(1, 1, 1)' },
          '10%,20%': {
            transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)',
          },
          '30%,50%,70%,90%': {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
          },
          '40%,60%,80%': {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
          },
          to: { transform: 'scale3d(1, 1, 1)' },
        },
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'popup-in': {
          '0%': { transform: 'scale(.93)' },
          '100%': { transform: 'scale(1)' },
        },
        'zoom-fade-small': {
          '0%': { opacity: 0, transform: 'scale(1.1)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        tada: 'tada 1s ease-in-out infinite',
        fadeIn: 'fade-in 500ms ease',
        popupIn: 'popup-in 500ms ease',
        'zoom-fade-small': 'zoom-fade-small 1s ease forwards',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
};
