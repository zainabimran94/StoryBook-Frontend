import type { Config } from "tailwindcss";


const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f97316",
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(120deg, #f6d365 0%, #fda085 100%)',
        'card': 'linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%)',
        'preference': 'linear-gradient(to right, #f9d423 0%, #ff4e50 100%)',
        'login': "url('/backgroundlogin.png')",
        'register': "url('/final.png')",
        'form1': "url('/register.png')",
        'form2': "url('/login1.png')",
      },
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        caveat: ['Caveat Brush', 'cursive'],
        pacifico: ['Pacifico', 'cursive'],
        kleeOne: ['Klee One', 'cursive']
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
      keyframes: {
        spin: {
          from: {
            transform: "rotate(0deg)",
          },
          to: {
            transform: "rotate(360deg)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
