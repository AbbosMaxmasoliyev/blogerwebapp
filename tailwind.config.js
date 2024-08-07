/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // yoki 'media'
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mont: ['Montserrat', 'sans-serif'], // Font oilasi nomi va fallback
      },
    },
  },
  plugins: [],
}