/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: {
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#0a0a0b'
        },
        vscode: {
          'bg': '#1e1e1e',
          'sidebar': '#252526',
          'active': '#37373d',
          'border': '#323232',
          'text': '#cccccc',
          'highlight': '#2d2d2d',
          'selection': '#264f78',
          'button': '#0e639c',
          'button-hover': '#1177bb',
          'scrollbar': '#424242'
        }
      },
      fontFamily: {
        'pixel': ['"Press Start 2P"', 'cursive'],
        'sora': ['Sora', 'sans-serif'],
        'manrope': ['Manrope', 'sans-serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', 'Helvetica', 'Arial', 'sans-serif'],
        'display': ['"Space Grotesk"', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'gradient-move': 'gradientMove 15s ease infinite',
        'grain-shift': 'grainShift 8s steps(10) infinite'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        gradientMove: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        grainShift: {
          '0%': { transform: 'translate(0,0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
          '100%': { transform: 'translate(0,0)' }
        }
      }
    },
  },
  plugins: [],
};