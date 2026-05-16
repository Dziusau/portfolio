/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          0: '#0a0a0a',
          1: '#0f0f0f',
          2: '#1a1a1a',
          3: '#222222',
          4: '#333333',
        },
        muted: '#888888',
        quiet: '#555555',
      },
      fontFamily: {
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        wider2: '0.2em',
      },
    },
  },
  plugins: [],
};
