/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#62D2B6",
        "secondary": "#F2FFFC",

      },
      screens: {
        "max-xs": { "max": "639px" },
        "max-sm": { "max": "767px" },
        "max-md": { "max": "1023px" },
        "max-lg": { "max": "1279px" },
        "max-xl": { "max": "1535px" },
      },
      }
    },
  
  plugins: [],
}

