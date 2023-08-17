/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#F4FFF3",
        // white2: "#ADADAD",
        // yellow: "#F0CC80", // green 4E9F3D
        // green: "#1E5128", // dark green 1E5128
        // yellow2: "#89764B", // soft green 346751
        // grey: "#262626", //separator
        // blue: "#191A19", // 1D2226 - linkedIn color
        // input: "#1D2226",
        // black: "#040303", //121211 - softer black like on hover tabs
        // error: "#FF4A4A",
        // valid: "#2eb97c",
        // theme2 - green:
        softWhite:"#C6C5C5",
        accent: "#76D08A",
        secondary: "#AAFD9C",
        bgContainers: "#1C1C1F",
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
      boxShadow: {
        sm: "0 0 5px 3px rgba(189, 178, 163, 0.13)",
        md: "7px 6px 4px -3px rgba(118,208,138, 0.6)",
      },
    },
  },
};
