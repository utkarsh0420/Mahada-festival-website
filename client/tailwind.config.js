/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: {
          950: '#260307',
          900: '#3D050E',
          850: '#4D0711',
          800: '#5B0914',
          700: '#780C1E',
          600: '#941328',
          500: '#B21E36',
          100: '#FDE8EB',
          50: '#FFF1F3',
        },
        gold: {
          900: '#4A3403',
          800: '#684904',
          700: '#8C6506',
          600: '#B8860B',
          500: '#D4AF37',
          400: '#F3C644',
          300: '#FCD768',
          200: '#FEE89D',
          100: '#FFF6D1',
          50: '#FFFDEB',
        },
        festive: {
          saffron: '#EA580C',
          orange: '#FF7A00',
          vermilion: '#E11D48',
          cream: '#FFFDF9',
          parchment: '#FAF5EC',
          border: '#E8D5B5',
        }
      },
      fontFamily: {
        heading: ['"Noto Serif Devanagari"', '"Mukta"', 'serif'],
        body: ['"Mukta"', '"Inter"', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'marquee-slow': 'marquee 40s linear infinite',
        'pulse-glow': 'pulseGlow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'diya-flicker': 'diyaFlicker 1.5s ease-in-out infinite alternate',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1', filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.6))' },
          '50%': { opacity: '0.85', filter: 'drop-shadow(0 0 16px rgba(243, 198, 68, 0.9))' },
        },
        diyaFlicker: {
          '0%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.9' },
          '100%': { transform: 'scale(1.08) rotate(1deg)', opacity: '1' },
        }
      }
    },
  },
  plugins: [],
}
