/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jih: {
          navy: {
            DEFAULT: '#0B2545',
            dark: '#07192F',
            light: '#13315C',
            muted: '#1E3A64'
          },
          blue: {
            DEFAULT: '#134074',
            accent: '#0066CC',
            hover: '#0E2E52',
            subtle: '#2E6BA8'
          },
          light: {
            DEFAULT: '#EEF4F8',
            surface: '#F4F8FB',
            border: '#D1E1EC',
            card: '#FFFFFF'
          }
        }
      }
    },
  },
  plugins: [],
}
