/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: '#ffffff',
          muted: '#f8f9fb',
          subtle: '#f3f4f6',
        },
        border: '#e5e7eb',
        primary: {
          DEFAULT: '#1e88e5',
          50: '#e3f2fd',
          100: '#bbdefb',
          600: '#1e88e5',
          700: '#1565c0',
        },
        accent: {
          DEFAULT: '#f6c343',
          700: '#b38b00',
        },
        foreground: '#111827',
        muted: '#6b7280',
      },
      borderRadius: {
        xl: '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        soft: '0 10px 25px rgba(17, 24, 39, 0.08)',
        card: '0 4px 14px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
}
