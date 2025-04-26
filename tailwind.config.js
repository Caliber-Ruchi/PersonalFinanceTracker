/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
      "./node_modules/shadcn/**/*.{js,ts,jsx,tsx}", // Make sure to include this line
    ],
    theme: {
      extend: {
        colors: {
          // Add any custom colors if needed
        },
        fontFamily: {
          // Add custom fonts if needed
        },
      },
    },
    plugins: [
      require('@tailwindcss/forms'), // If you need form styling
      // Add more plugins if needed
    ],
  }
  