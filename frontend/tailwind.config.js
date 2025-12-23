/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'navy-deep': '#0a1929',
        'navy-medium': '#132f4c',
        'navy-light': '#1e4976',
        'slate-dark': '#2d3748',
        'slate-medium': '#4a5568',
        'slate-light': '#718096',
        'teal-accent': '#00d9ff',
        'teal-glow': 'rgba(0, 217, 255, 0.3)',
        'blue-electric': '#3b82f6',
        'success-green': '#10b981',
        'error-red': '#ef4444',
        'warning-amber': '#f59e0b',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}

