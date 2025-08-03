/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in forwards',
        'fade-out': 'fadeOut 1s ease-out forwards 2.5s',
        'typing': 'typing 2s steps(20, end), blink 0.75s step-end infinite',
        'blink': 'blink 0.75s step-end infinite',
        'bgMove': 'bgMove 5s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0', visibility: 'hidden' },
        },
        typing: {
          from: { width: '0' },
          to: { width: '12ch' },
        },
        blink: {
          '0%, 100%': { borderColor: 'transparent' },
          '50%': { borderColor: '#BA704F' },
        },
        bgMove: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
}
