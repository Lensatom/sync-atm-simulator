/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{ts,tsx,js,jsx}",
    "./src/pages/**/*.{ts,tsx,js,jsx}",
    "./src/components/**/*.{ts,tsx,js,jsx}",
    "./src/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#EB5017",
        "atm-dark-gray": "#2E3038",
        "atm-light-gray": "#747682",
        "success": "#27AE60",
        "error": "#EE0001",
      }
    },
  },
  plugins: [],
};