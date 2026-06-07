import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy design tokens — now driven by CSS variables (RGB channels) so
        // they react to the light/dark theme toggle and support opacity modifiers.
        bg: {
          900: "rgb(var(--bg-900) / <alpha-value>)",
          800: "rgb(var(--bg-800) / <alpha-value>)",
          700: "rgb(var(--bg-700) / <alpha-value>)",
        },
        neon: {
          cyan: "rgb(var(--neon-cyan) / <alpha-value>)",
          violet: "rgb(var(--neon-violet) / <alpha-value>)",
          fuchsia: "rgb(var(--neon-fuchsia) / <alpha-value>)",
        },
        ink: {
          100: "rgb(var(--text-100) / <alpha-value>)",
          300: "rgb(var(--text-300) / <alpha-value>)",
          500: "rgb(var(--text-500) / <alpha-value>)",
        },
        // shadcn/ui tokens (RGB channels via CSS variables). `accent` is intentionally
        // omitted — `bg-accent` is reserved for the gradient (see backgroundImage).
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "rgb(var(--card) / <alpha-value>)",
          foreground: "rgb(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "rgb(var(--popover) / <alpha-value>)",
          foreground: "rgb(var(--popover-foreground) / <alpha-value>)",
        },
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "rgb(var(--muted) / <alpha-value>)",
          foreground: "rgb(var(--muted-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "rgb(var(--destructive) / <alpha-value>)",
          foreground: "rgb(var(--destructive-foreground) / <alpha-value>)",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      borderRadius: {
        glass: "20px",
        panel: "28px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glass:
          "0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.25)",
        "glow-cyan": "0 0 24px rgba(255,224,194,0.35)",
        "glow-violet": "0 0 28px rgba(200,160,122,0.40)",
      },
      backgroundImage: {
        accent:
          "linear-gradient(135deg, #ffe0c2, #ffdfb5 55%, #c8a07a)",
      },
      keyframes: {
        "aurora-drift": {
          "0%, 100%": { transform: "translate3d(0,0,0) scale(1)" },
          "50%": { transform: "translate3d(4%, -3%, 0) scale(1.08)" },
        },
        "sheen": {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(120%)" },
        },
        spotlight: {
          "0%": { opacity: "0", transform: "translate(-72%, -62%) scale(0.5)" },
          "100%": { opacity: "1", transform: "translate(-50%, -40%) scale(1)" },
        },
      },
      animation: {
        "aurora-drift": "aurora-drift 22s ease-in-out infinite",
        "aurora-drift-slow": "aurora-drift 30s ease-in-out infinite",
        spotlight: "spotlight 2s ease 0.75s 1 forwards",
      },
    },
  },
  plugins: [],
};

export default config;
