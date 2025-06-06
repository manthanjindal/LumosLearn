/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
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
        'montserrat': ['Montserrat', 'sans-serif']
      },
      animation: {
        'bounce-slow': 'bounce 3s infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'gradient-move': 'gradientMove 15s ease infinite'
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
        }
      }
    },
  },
  plugins: [],
};