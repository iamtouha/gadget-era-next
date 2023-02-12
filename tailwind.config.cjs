const colors = require("tailwindcss/colors");
const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: colors.orange,
      },
      fontFamily: {
        sans: ["var(--font-poppins)", ...fontFamily.sans],
      },
    },
  },
  plugins: [
    require("@headlessui/tailwindcss"),
    require("@tailwindcss/typography"),
  ],
};
