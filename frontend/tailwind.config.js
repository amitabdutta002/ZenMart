/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        japan: ['Zen old Munich','sans-serif'],
        Montserrat: ['Montserrat','sans-serif']
      }
    },
  },
  plugins: [],
}