/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        neuromorphic: {
          light: "#f5f7fa",
          dark: "#e0e5ec",
          shadow: "rgba(0, 0, 0, 0.1)",
          highlight: "rgba(255, 255, 255, 0.3)",
        }
      },
      boxShadow: {
        neuro: "9px 9px 16px rgba(0, 0, 0, 0.1), -9px -9px 16px rgba(255, 255, 255, 0.7)",
        neuro_inset: "inset 9px 9px 16px rgba(0, 0, 0, 0.1), inset -9px -9px 16px rgba(255, 255, 255, 0.7)",
        neuro_hover: "5px 5px 12px rgba(0, 0, 0, 0.15), -5px -5px 12px rgba(255, 255, 255, 0.8)",
      },
    },
  },
  plugins: [],
}
