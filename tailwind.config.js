/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4FD1C5',
          DEFAULT: '#38B2AC',
          dark: '#319795',
        },
        secondary: {
          light: '#9F7AEA',
          DEFAULT: '#805AD5',
          dark: '#6B46C1',
        },
        // Add more custom colors as needed
      },
    },
  },
  plugins: [],
}
