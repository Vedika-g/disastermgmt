/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        command: {
          bg: '#080b11',
          surface: '#0d121d',
          card: '#131b2a',
          cardHover: '#182236',
          border: '#1f2d44',
          borderLight: '#2c3e5d',
          accent: '#2563eb',
        },
        tactical: {
          critical: '#ef4444',
          high: '#f97316',
          moderate: '#eab308',
          operational: '#10b981',
          info: '#0ea5e9',
          neutral: '#94a3b8'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'ping-slow': 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      }
    },
  },
  plugins: [],
}
