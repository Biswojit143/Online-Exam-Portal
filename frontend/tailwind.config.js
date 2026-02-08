export default {
  darkMode: "class", // ✅ REQUIRED
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        fade: {
          "0%": {
            opacity: "0",
            transform: "translateY(-6px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        fade: "fade 0.2s ease-out",
      },
    },
  },
  plugins: [],
};
