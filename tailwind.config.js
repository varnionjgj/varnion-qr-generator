/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2A3D82',
          hover: '#3A4D92',
          active: '#1A2D72',
        },
        secondary: {
          light: '#F0F2F8',
          border: '#D0D5E8',
        },
      },
    },
  },
  plugins: [],
};
