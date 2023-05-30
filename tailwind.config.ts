import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      my_blue: "#146C94",
      my_black: "#1A120B",
      my_green: "#1B9C85",
      my_red: "#EA5455",
      my_grey: "#9BA4B5",
      white:"#EEEEEE"
    },
  },
  plugins: [],
} satisfies Config;
