import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'rpg-bg': '#0a0a0f',
        'rpg-blue': '#00aaff',
        'rpg-blue-dark': '#0088cc',
        'rpg-red': '#ff3333',
        'rpg-gold': '#ffd700',
        'rpg-green': '#00ff88',
        'rpg-purple': '#a855f7',
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