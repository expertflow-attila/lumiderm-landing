/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Fraunces', 'Georgia', 'serif'],
      },
      colors: {
        brand: {
          blue: '#5794E2',
          blueDark: '#4a84d0',
          blueBright: '#3b82f6',
        },
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        nebulaA: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(7%, 5%) scale(1.12)' },
        },
        nebulaB: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1.1)' },
          '50%': { transform: 'translate(-6%, 6%) scale(1)' },
        },
        nebulaC: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(5%, -6%) scale(1.14)' },
        },
        nebulaD: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1.06)' },
          '50%': { transform: 'translate(-5%, -4%) scale(1)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'fade-in': 'fade-in 1s ease-out forwards',
        'nebula-a': 'nebulaA 26s ease-in-out infinite',
        'nebula-b': 'nebulaB 34s ease-in-out infinite',
        'nebula-c': 'nebulaC 30s ease-in-out infinite',
        'nebula-d': 'nebulaD 38s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
