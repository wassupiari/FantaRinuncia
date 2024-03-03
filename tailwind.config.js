/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        indigo:{
          50: "#e8eaf6",
          100:
          "#c5cae9",
          200:
          "#9fa8da",
          300:
          "#7986cb",
          400:
          "#5c6bc0",
          500:
          "#3f51b5",
          600:
          "#3949ab",
          700:
          "#303f9f",
          800:
          "#283593",
          900:
          "#1a237e"
        }
      }
    }, patterns: {
      opacities: {
        100: "1",
        80: ".80",
        60: ".60",
        40: ".40",
        20: ".20",
        10: ".10",
        5: ".05",
      },
      sizes: {
        1: "0.25rem",
        2: "0.5rem",
        4: "1rem",
        6: "1.5rem",
        8: "2rem",
        16: "4rem",
        20: "5rem",
        24: "6rem",
        32: "8rem",
      }
    }
  },
  plugins: [
    require('tailwindcss-bg-patterns')
  ],
});

