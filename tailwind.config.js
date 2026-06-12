/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070707',
          900: '#0a0a0a',
          850: '#0f0f0f',
          800: '#141414',
          700: '#1f1f1f',
          600: '#2a2a2a',
          500: '#3d3d3d',
          400: '#5a5a5a',
          300: '#7a7a7a',
          200: '#a0a0a0',
          100: '#cccccc',
          50:  '#ededed',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem' }],
      },
      letterSpacing: {
        wider2: '0.1em',
      },
      maxWidth: {
        page: '1100px',
      },
      animation: {
        'cursor-blink': 'cursorBlink 1.05s steps(2, jump-none) infinite',
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.7s ease-out forwards',
        'pulse-dot': 'pulseDot 2.4s ease-in-out infinite',
        'scan': 'scan 8s linear infinite',
      },
      keyframes: {
        cursorBlink: {
          '0%, 50%': { opacity: '1' },
          '50.01%, 100%': { opacity: '0' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.55', transform: 'scale(0.85)' },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
};
