/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      "open-500": ["OpenMedium", "sans-serif"],
      "ubuntu-500": ["UbuntuMedium", "sans-serif"],
      "ubuntu-300": ["UbuntuThin", "sans-serif"],
    },
    colors: {
      white: "#F4FFF3",
      grey: "#AEAEAE",
      green: "#9EF5CF",
      "secondary-green": "#0D2B1E",
      "dark-green": "#080D0B",
      "soft-black": "#060606",
      black: "#010201",
    },
    boxShadow: {
      sm: "0 1px 8px 0px rgba(30, 30, 30, 0.5)",
    },
  },
};
