/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['"Space Grotesk"', '"Funnel Display"', 'Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#f2f2f2',
          muted: 'rgba(242, 242, 242, 0.64)',
          faint: 'rgba(242, 242, 242, 0.38)',
        },
        surface: {
          bg: '#0f1012',
          wash: '#16181c',
          fill: '#1f2228',
          fill2: '#2a2e37',
          line: '#262932',
        },
        signal: {
          amber: '#f0b24a',
          orange: '#ff8a4c',
          emerald: '#34d399',
          sky: '#6ea0ff',
          crimson: '#ff6b6b',
        }
      }
    },
  },
  plugins: [],
}
