/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'green': '#21723E',
      'yellow': '#E8BB1F',
      'yellow-lemon': '#FFDE2C',
      'red': '#CD001A',
      'gray': '#D9D9D9',
      'gray-dark': '#CCCCCC',
      'page-light': '#F5F5F5',
      'party-red': '#E83434',
      'party-blue': '#2A5DAA',
      'party-blue-dark': '#130C8C',
      'party-orange': '#EE7421',
    },
    extend: {
      borderRadius: {
        '10': '10px',
        '15': '15px',
      },
    },
  },
  plugins: [],
};
