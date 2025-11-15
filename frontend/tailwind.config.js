/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        notoSans: ['"Noto Sans"', 'sans-serif'],
        robotoSerif: ['"Roboto Serif"', 'serif'],
      },
      colors: {
        ecoGreen: '#065c30',
        figGray: '#6d89b3',
        figBlue: '#122036',
      },
    },
  },
  plugins: [],
};
