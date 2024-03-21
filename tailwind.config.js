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

        honeydew: "#e3fff0",
        azure: "#def5ff",
        "alice-blue": "#eaf1f7",
        "lavender-blush": "#f9eaf0",
        "robin-egg-blue": "#00ccc5",
        platinum: "#e6e6e6",
      },
    },
  },
  plugins: [],
};
