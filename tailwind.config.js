/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#05152D',
          50: '#E8ECF2',
          100: '#C8D2E0',
          200: '#9FB0C8',
          300: '#6E87A8',
          400: '#4A6488',
          500: '#2E4670',
          600: '#1B3358',
          700: '#102445',
          800: '#0A1B38',
          900: '#05152D',
          950: '#030E1E',
        },
        ink: {
          DEFAULT: '#05152D',
        },
        canvas: {
          DEFAULT: '#FFFFFF',
          subtle: '#F5F6F8',
          muted: '#EEF1F4',
          line: '#E5E7EB',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      maxWidth: {
        '8xl': '88rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(5, 21, 45, 0.04), 0 4px 16px rgba(5, 21, 45, 0.04)',
        card: '0 1px 2px rgba(5, 21, 45, 0.05), 0 12px 32px rgba(5, 21, 45, 0.06)',
        float: '0 8px 40px rgba(5, 21, 45, 0.10)',
        glow: '0 0 0 1px rgba(5, 21, 45, 0.06), 0 20px 60px rgba(5, 21, 45, 0.12)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'dash-flow': {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.6s ease-out both',
        'dash-flow': 'dash-flow 1.2s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
    },
  },
  plugins: [],
};
