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
      black: "#010101",
      black2: "#000000f5",
      green: "#9EF5CF",
      "soft-green": "#aad9c54a",
      white: "#F3F3F3",
      grey: "#AEAEAE",
      "soft-grey": "#ffffffa1",
      input: "#f8f7f717",
      focused: "#f59e9e69",
      red: "#d78181",
    },
  },
};
