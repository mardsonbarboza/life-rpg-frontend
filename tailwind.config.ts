import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Shadcn colors */
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",

        /* Custom RPG colors (keeping existing) */
        'rpg-bg': '#0a0a0f',
        'rpg-blue': '#00aaff',
        'rpg-blue-dark': '#0088cc',
        'rpg-red': '#ff3333',
        'rpg-gold': '#ffd700',
        'rpg-green': '#00ff88',
        'rpg-purple': '#a855f7',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 170, 255, 0.6)',
        'glow-red': '0 0 20px rgba(255, 51, 51, 0.6)',
        'glow-gold': '0 0 20px rgba(255, 215, 0, 0.6)',
        'glow-green': '0 0 20px rgba(0, 255, 136, 0.6)',
      },
      backdropBlur: {
        'rpg': '20px',
      },
    },
  },
  plugins: [],
} satisfies Config;