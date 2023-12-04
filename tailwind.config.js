/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#283549",
        secondary: "#67B4C0",
        tertiary: "#F3F3F3",
        "dark-blue": "#283549",
        "ligth-blue": "#67b4c0",
      },
      fontFamily: {
        Monserrat: ['"Montserrat"'],
      },
    },
    plugins: [],
  },
};
