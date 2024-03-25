/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}', 'node_modules/preline/dist/*.js', 'node_modules/preline/preline.js'],
  theme: {
    extend: {
      colors: {},
    },
  },
  plugins: [require('@tailwindcss/forms'), require('preline/plugin')],
};
