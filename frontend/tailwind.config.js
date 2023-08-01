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
      "ubuntu": ["UbuntuThin", "sans-serif"],
    },
    colors: {
      white: '#F4FFF3',
      white2: '#ADADAD',
      yellow: '#F0CC80',
      yellow2: '#89764B',
      grey: '#262626',
      blue: '#1E1F24',
      black: '#111111', 
    },
    boxShadow: {
      sm: "0 1px 8px 0px rgba(30, 30, 30, 0.5)",
    },
  },
};
