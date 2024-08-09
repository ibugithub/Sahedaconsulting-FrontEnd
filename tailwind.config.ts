import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        fadeIn: 'fadeIn 1.5s ease-in-out',
        slideIn: 'slideIn 1.5s ease-in-out',
        grow: 'grow 1s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' }, 
          '100%': { opacity: '1' }, 
        },
        slideIn: {
          '0%': { transform: 'translateY(20px)', opacity: '0' }, 
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        grow: {
          '0%': { width: '0' }, 
          '100%': { width: '400px' }, 
        },
      },
    },
  },
  plugins: [],
}
export default config
