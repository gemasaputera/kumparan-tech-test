module.exports = {
  purge: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/component/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: { opacity: ["disabled"] },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
