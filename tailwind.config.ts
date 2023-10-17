import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors: {
        'slate-350': '#afbccc',
      },
    },
  },
  plugins: [],
}
export default config
