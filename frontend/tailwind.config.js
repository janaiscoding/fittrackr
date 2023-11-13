/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        white: "#f9fbfd",
        softWhite: "#C6C5C5",
        accent: "#3F72AF",
        secondary: "#112D4E",
        bgContainers: "#F8F7F7",
        outline: "#50504F",
        grey: "#262626", //separator
        black: "#0D0D0F",
        error: "#FF4A4A",
        valid: "#2eb97c",
      },
      fontFamily: {
        open: ["OpenMedium", "sans-serif"],
        "ubuntu-500": ["UbuntuMedium", "sans-serif"],
        ubuntu: ["UbuntuThin", "sans-serif"],
      },
    },
  },
};
