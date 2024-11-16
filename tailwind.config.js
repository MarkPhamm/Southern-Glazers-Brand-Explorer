/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}', // Include all files in the `app` directory
    './pages/**/*.{js,ts,jsx,tsx}', // For the `pages` directory if using the Pages Router
    './components/**/*.{js,ts,jsx,tsx}', // For your components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
