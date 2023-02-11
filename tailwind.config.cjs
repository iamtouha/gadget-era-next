const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: colors.orange,
      },
    },
  },
  plugins: [require("@headlessui/tailwindcss")],
};
