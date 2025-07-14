/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        // Primary font pairs
        'sans': ['var(--font-inter)', 'system-ui', 'sans-serif'],
        'inter': ['var(--font-inter)', 'system-ui', 'sans-serif'],
        
        // Secondary font pairs
        'montserrat': ['var(--font-montserrat)', 'sans-serif'],
        'roboto': ['var(--font-roboto)', 'sans-serif'],
        
        // Tertiary font pairs
        'poppins': ['var(--font-poppins)', 'sans-serif'],
        'oswald': ['var(--font-oswald)', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],        // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],    // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],       // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],    // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],     // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],        // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],   // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],     // 36px
        '5xl': ['3rem', { lineHeight: '1.15' }],          // 48px
        '6xl': ['3.75rem', { lineHeight: '1.1' }],        // 60px
      },
      fontWeight: {
        light: '300',
        normal: '400',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      letterSpacing: {
        'tighter': '-0.05em',
        'tight': '-0.025em',
        'normal': '0',
        'wide': '0.025em',
        'wider': '0.05em',
        'widest': '0.1em',
        'ultra': '0.2em',
        'elegant': '0.1em',
      },
      lineHeight: {
        'none': '1',
        'tight': '1.25',
        'snug': '1.375',
        'normal': '1.5',
        'relaxed': '1.625',
        'loose': '2',
        'luxurious': '1.6',
      },
    },
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.h1': {
          '@apply font-poppins font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight': {},
        },
        '.h2': {
          '@apply font-poppins font-semibold text-2xl md:text-3xl lg:text-4xl tracking-normal': {},
        },
        '.h3': {
          '@apply font-poppins font-semibold text-xl md:text-2xl lg:text-3xl tracking-normal': {},
        },
        '.body-text': {
          '@apply font-inter font-normal text-base md:text-lg tracking-normal': {},
        },
        '.body-light': {
          '@apply font-inter font-light text-base md:text-lg tracking-normal': {},
        },
        '.cta-text': {
          '@apply font-inter font-bold text-lg md:text-xl tracking-wide': {},
        },
      });
    },
  ],
} 