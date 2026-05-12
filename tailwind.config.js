export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        orange: {
          DEFAULT: '#ff8800',
        },
        white: {
          DEFAULT: '#ffffff',
        },
        green: {
          dark: '#14532d',
        },
      },
      borderRadius: {
        'xl': '20px',
      },
    },
  },
  plugins: [],
}
