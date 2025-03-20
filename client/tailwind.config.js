/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#74209e",
        "primary-light": "#be74e3"
      },
    },
  },
  plugins: [],
}

