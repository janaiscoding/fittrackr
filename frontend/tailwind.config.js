/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      black: "#010101",
      green: "#9EF5CF",
      white: "#F3F3F3",
      grey: "#AEAEAE",
      "soft-grey": "#070606",
      input: "#f8f7f717",
      focused: "#f59e9e69",
      red: "#FF5599",
    },
  },
};
