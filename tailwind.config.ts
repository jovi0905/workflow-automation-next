import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eefaf4',
          100: '#d4f2e0',
          200: '#aee5c4',
          300: '#7fd39f',
          400: '#4ebb75',
          500: '#27a35a',
          600: '#1a8348',
          700: '#16683b',
          800: '#155332',
          900: '#12452c'
        }
      }
    }
  },
  plugins: []
};

export default config;
