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
    extend: {
      fontFamily: {
        southern: [
          'SctoGroteskA-Light',
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Ubuntu',
          'Helvetica Neue',
          'Oxygen',
          'Cantarell',
          'sans-serif',
        ],
      },
      colors:{
        'custom-gray': '#3c3d41',
        'custom-dark-yello': '#d1bf8f'
      }
    },
  },
  plugins: [],
}
