// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // enable dark mode via .dark class
  safelist: [
    // Force include gradient classes for service cards
    "from-slate-50",
    "via-white", 
    "to-slate-200",
    "dark:from-slate-900",
    "dark:via-slate-800", 
    "dark:to-slate-700",
    "bg-gradient-to-br",
    // Force include common slate colors
    {
      pattern: /(from|via|to|dark:from|dark:via|dark:to)-(slate)-(50|100|200|700|800|900)/,
    },
  ],
  theme: {
    extend: {
      /* 🎨 Colors (from CSS variables) */
      colors: {
        // === Base / Neutral ===
        background: "var(--color-background)", // page/app background
        surface: "var(--color-surface)", // cards, modals
        border: "var(--color-border)", // dividers, outlines
        muted: "var(--color-muted)", // subtle bg (inputs, secondary UI)

        "on-background": "var(--color-on-background)", // text/icons on background
        "on-surface": "var(--color-on-surface)", // text/icons on surfaces

        // === Brand / Accent ===
        primary: "var(--color-primary)", // main brand color
        "on-primary": "var(--color-on-primary)", // text/icons on primary
        secondary: "var(--color-secondary)",
        "on-secondary": "var(--color-on-secondary)",
        tertiary: "var(--color-tertiary)",
        "on-tertiary": "var(--color-on-tertiary)",

        // === Status ===
        success: "var(--color-success)",
        "on-success": "var(--color-on-success)",
        warning: "var(--color-warning)",
        "on-warning": "var(--color-on-warning)",
        error: "var(--color-error)",
        "on-error": "var(--color-on-error)",

        // === Interactive States ===
        "primary-hover": "color-mix(in srgb, var(--color-primary) 90%, black)",
        "primary-active": "color-mix(in srgb, var(--color-primary) 80%, black)",

        "surface-hover": "color-mix(in srgb, var(--color-surface) 95%, black)",
        "surface-active": "color-mix(in srgb, var(--color-surface) 90%, black)",

        disabled: "#d1d5db", // neutral gray
        "on-disabled": "#9ca3af",
      },

      /* 📏 Spacing (linked to custom vars for responsive scaling) */
      spacing: {
        1: "var(--spacing-1)",
        2: "var(--spacing-2)",
        3: "var(--spacing-3)",
        4: "var(--spacing-4)",
        5: "var(--spacing-5)",
        6: "var(--spacing-6)",
        8: "var(--spacing-8)",
        10: "var(--spacing-10)",
        12: "var(--spacing-12)",
        16: "var(--spacing-16)",
      },

      /* 🔲 Border Radius */
      borderRadius: {
        sm: "var(--radius-sm)",
        DEFAULT: "var(--radius)", // base radius
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
        "2xl": "var(--radius-2xl)",
      },

      /* 🔤 Fonts */
      fontFamily: {
        sans: "var(--font-sans)",
        mono: "var(--font-mono)",
      },

      /* 🎴 Card Gradients */
      backgroundImage: {
        "card-light": "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
        "card-dark": "linear-gradient(135deg, #1e293b 0%, #334155 100%)",
        "card-premium": "linear-gradient(135deg, #3b82f6 0%, #6366f1 100%)",
        "card-premium-purple":
          "linear-gradient(135deg, #8b5cf6 0%, #a855f7 100%)",
        "card-premium-teal":
          "linear-gradient(135deg, #0d9488 0%, #0891b2 100%)",
      },
    },
  },
  plugins: [],
};
