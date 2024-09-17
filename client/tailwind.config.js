/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true
    },
    screens: {
      'sm': '350px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1920px'
    },
    extend: {
      fontFamily: {
        'Inconsolata': ['Inconsolata', 'sans']
      }
    },
  },
  plugins: [],
}

