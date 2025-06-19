/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        danger: '#f04824',
        'medium-dark': '#4c4c4e',
        gray: '#F8F1E9',
        // new

        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },
      // new
      fontFamily: {
        nunitoSans: ['var(--font-nunitoSans)'],
      },
      backgroundImage: {
        banner:
          'url(https://celesteadore.com/cdn/shop/files/PERSONALISED_JEWELLERY_1800_x_1000_px_9_1.jpg?v=1745420754&width=1920)',
        // banner1:
        //   'url(https://beyours-theme-beauty.myshopify.com/cdn/shop/files/banner-6.jpg?v=1655430252&width=3000)',
        // banner2:
        //   'url(https://beyours-theme-beauty.myshopify.com/cdn/shop/files/lookbook-1.jpg?v=1699506080&width=3000)',
        // popup:
        //   'url(https://octaneairsrc.com/jusqzqfke1dn6prl/quizimg/486c4953-673f-4002-b754-dcca75a9ef8b)',
      },
      zIndex: {
        500: 500,
      },
      keyframes: {
        tada: {
          from: {
            transform: 'scale3d(1, 1, 1)',
          },
          '10%,20%': {
            transform: 'scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg)',
          },
          '30%,50%,70%,90%': {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg)',
          },
          '40%,60%,80%': {
            transform: 'scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg)',
          },
          to: {
            transform: 'scale3d(1, 1, 1)',
          },
        },
        'fade-in': {
          from: {
            opacity: 0,
          },
          to: {
            opacity: 1,
          },
        },
        'popup-in': {
          '0%': {
            transform: 'scale(.93)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        'zoom-fade-small': {
          '0%': {
            opacity: 0,
            transform: 'scale(1.1)',
          },
          '100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
        },
      },
      animation: {
        tada: 'tada 1s ease-in-out infinite',
        fadeIn: 'fade-in 500ms ease',
        popupIn: 'popup-in 500ms ease',
        'zoom-fade-small': 'zoom-fade-small 1s ease forwards',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  darkMode: ['class', 'class'],
};
