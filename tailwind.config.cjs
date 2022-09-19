/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: ["night", "cmyk"],
  },
  plugins: [require("daisyui")],
};
