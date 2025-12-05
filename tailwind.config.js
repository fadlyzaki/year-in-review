/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add specific fonts here if needed for themes like 'Journal'
        handwriting: ['"Patrick Hand"', 'cursive'],
        serif: ['"Merriweather"', 'serif'],
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

