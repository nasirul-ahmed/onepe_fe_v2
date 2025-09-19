// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Define your theme palette
        light: {
          background: "#ffffff",
          foreground: "#0f172a", // slate-900
          primary: "#2563eb", // blue-600
          secondary: "#64748b", // slate-500
          accent: "#f97316", // orange-500
          muted: "#f1f5f9", // slate-100
          border: "#e2e8f0", // slate-200
        },
        dark: {
          background: "#0f172a", // slate-900
          foreground: "#f8fafc", // slate-50
          primary: "#3b82f6", // blue-500
          secondary: "#94a3b8", // slate-400
          accent: "#fb923c", // orange-400
          muted: "#1e293b", // slate-800
          border: "#334155", // slate-700
        },
      },
    },
  },
  plugins: [],
};
