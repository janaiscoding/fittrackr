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
        white2: "#ADADAD",
        yellow: "#F0CC80", // green 4E9F3D
        green: "#1E5128", // dark green 1E5128
        yellow2: "#89764B", // soft green 346751
        grey: "#262626", //separator
        blue: "#191A19", // 1D2226 - linkedIn color
        input: "#1D2226",
        black: "#040303", //121211 - softer black like on hover tabs
        error: "#df4444",
        valid: "#2eb97c",
      },
      fontFamily: {
        open: ["OpenMedium", "sans-serif"],
        "ubuntu-500": ["UbuntuMedium", "sans-serif"],
        ubuntu: ["UbuntuThin", "sans-serif"],
      },
      boxShadow: {
        sm: "0 0 5px 3px rgba(189, 178, 163, 0.13)",
        md: "0 0 5px 3px rgba(240,204,128, 0.2)",
      },
    },
  },
};
