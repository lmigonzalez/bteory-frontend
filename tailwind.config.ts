/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        my_blue: "#146C94",
        my_black: "#1A120B",
        my_green: "#1B9C85",
        my_red: "#EA5455",
        my_grey: "#9BA4B5",
        white: "#EEEEEE",
      },
    },
  },
  plugins: [require("daisyui")],
};
