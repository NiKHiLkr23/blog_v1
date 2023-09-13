/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        bodyFont: "Poppins",
        titleFont: "Montserrat",
      },
      colors: {
        primaryColor: "#9be0f7",
        secondaryColor: "#9b59b6",
        bgColor: "rgb(36,36,36)",
      },
      boxShadow: {
        btnShadow: "0px 0px 18px 3px rgba(52,73,94,1)",
      },
    },
  },
  plugins: [],
};
