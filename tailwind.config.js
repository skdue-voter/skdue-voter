/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'green': '#21723E',
        'green-lime': '#48BF53',
        'yellow': '#E8BB1F',
        'yellow-lemon': '#FFDE2C',
        'red': '#E34234',
        'gray': '#D9D9D9',
        'gray-dark': '#CCCCCC',
        'party-red': '#E83434',
        'party-blue': '#2A5DAA',
        'party-blue-dark': '#130C8C',
        'party-orange': '#EE7421',
      },
    },
  },
  plugins: [],
};
