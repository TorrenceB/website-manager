/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "dark-indigo": "#2C2C54",
        "deep-purple-gray": "#474787",
        "cool-gray": "#AAABB8",
        "light-gray": "#ECECEC",
      },
    },
  },
  plugins: [],
};
