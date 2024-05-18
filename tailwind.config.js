/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        purrBlue: '#28b6f8',
        purrGreen: '#c3ff01',
        purrOrange: '#ff9900',
        purrPurple: '#a69afe',
        purrRed: '#ff7278',
        purrYellow: '#ffe260',
      },
    },
  },
  plugins: [],
}
