/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#de2c4d",
        secondary: "#23034b",
    },

    fontFamily:{
      poppins:[ "Poppins", "sans-sherif"],
      averia: ["Averia Libre", "Cursive"],
    },

    container:{
      center:true,
      padding: {
        DEFAULT: '2rem',
        sm: "2rem",
        lg: "0.1rem",
        xl: "5rem",
        "2xl": "6rem",
        
      }
    }
 
  },
  plugins: [],
}
}
