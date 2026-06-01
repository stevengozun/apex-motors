/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#08090c',
          900: '#0b0d12',
          800: '#11141b',
          700: '#181c26',
          600: '#222735',
        },
        accent: {
          DEFAULT: '#DC2626',
          soft: '#ef4444',
          glow: '#f87171',
        },
      },
      fontFamily: {
        display: ['"Bodoni Moda"', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 60px -12px rgba(220, 38, 38, 0.45)',
        card: '0 24px 60px -20px rgba(0, 0, 0, 0.8)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
      },
    },
  },
  plugins: [],
}
