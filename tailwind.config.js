/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
			background: "var(--background)",
			foreground: "var(--foreground)",
			card: {
				DEFAULT: "var(--card)",
				foreground: "var(--card-foreground)",
			},
			popover: {
				DEFAULT: "var(--popover)",
				foreground: "var(--popover-foreground)",
			},
			primary: {
				DEFAULT: "var(--primary)",
				foreground: "var(--primary-foreground)",
			},
			secondary: {
				DEFAULT: "var(--secondary)",
				foreground: "var(--secondary-foreground)",
			},
			muted: {
				DEFAULT: "var(--muted)",
				foreground: "var(--muted-foreground)",
			},
			accent: {
				DEFAULT: "var(--accent)",
				foreground: "var(--accent-foreground)",
			},
			destructive: {
				DEFAULT: "var(--destructive)",
				foreground: "var(--destructive-foreground)",
			},
			border: "var(--border)",
			input: "var(--input)",
			ring: "var(--ring)",
			chart: {
				"1": "var(--chart-1)",
				"2": "var(--chart-2)",
				"3": "var(--chart-3)",
				"4": "var(--chart-4)",
				"5": "var(--chart-5)",
			},
			sidebar: {
				DEFAULT: "var(--sidebar)",
				foreground: "var(--sidebar-foreground)",
				primary: "var(--sidebar-primary)",
				"primary-foreground": "var(--sidebar-primary-foreground)",
				accent: "var(--sidebar-accent)",
				"accent-foreground": "var(--sidebar-accent-foreground)",
				border: "var(--sidebar-border)",
				ring: "var(--sidebar-ring)",
			},
		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
  				'system-ui',
  				'sans-serif'
  			],
  			inter: [
  				'var(--font-inter)',
  				'system-ui',
  				'sans-serif'
  			],
  			montserrat: [
  				'var(--font-montserrat)',
  				'sans-serif'
  			],
  			roboto: [
  				'var(--font-roboto)',
  				'sans-serif'
  			],
  			poppins: [
  				'var(--font-poppins)',
  				'sans-serif'
  			],
  			oswald: [
  				'var(--font-oswald)',
  				'sans-serif'
  			]
  		},
  		keyframes: {
  			gradient: {
  				'0%, 100%': {
  					'background-position': '0% 50%',
  					'background-size': '200% 200%'
  				},
  				'50%': {
  					'background-position': '100% 50%',
  					'background-size': '200% 200%'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			gradient: 'gradient 3s ease-in-out infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		fontSize: {
  			xs: [
  				'0.75rem',
  				{
  					lineHeight: '1rem'
  				}
  			],
  			sm: [
  				'0.875rem',
  				{
  					lineHeight: '1.25rem'
  				}
  			],
  			base: [
  				'1rem',
  				{
  					lineHeight: '1.5rem'
  				}
  			],
  			lg: [
  				'1.125rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			xl: [
  				'1.25rem',
  				{
  					lineHeight: '1.75rem'
  				}
  			],
  			'2xl': [
  				'1.5rem',
  				{
  					lineHeight: '2rem'
  				}
  			],
  			'3xl': [
  				'1.875rem',
  				{
  					lineHeight: '2.25rem'
  				}
  			],
  			'4xl': [
  				'2.25rem',
  				{
  					lineHeight: '2.5rem'
  				}
  			],
  			'5xl': [
  				'3rem',
  				{
  					lineHeight: '1.15'
  				}
  			],
  			'6xl': [
  				'3.75rem',
  				{
  					lineHeight: '1.1'
  				}
  			]
  		},
  		fontWeight: {
  			light: '300',
  			normal: '400',
  			semibold: '600',
  			bold: '700',
  			extrabold: '800'
  		},
  		letterSpacing: {
  			tighter: '-0.05em',
  			tight: '-0.025em',
  			normal: '0',
  			wide: '0.025em',
  			wider: '0.05em',
  			widest: '0.1em',
  			ultra: '0.2em',
  			elegant: '0.1em'
  		},
  		lineHeight: {
  			none: '1',
  			tight: '1.25',
  			snug: '1.375',
  			normal: '1.5',
  			relaxed: '1.625',
  			loose: '2',
  			luxurious: '1.6'
  		}
  	}
  },
  plugins: [
    function ({ addComponents }) {
      addComponents({
        ".h1": {
          "@apply font-poppins font-extrabold text-3xl md:text-4xl lg:text-5xl tracking-tight":
            {},
        },
        ".h2": {
          "@apply font-poppins font-semibold text-2xl md:text-3xl lg:text-4xl tracking-normal":
            {},
        },
        ".h3": {
          "@apply font-poppins font-semibold text-xl md:text-2xl lg:text-3xl tracking-normal":
            {},
        },
        ".body-text": {
          "@apply font-inter font-normal text-base md:text-lg tracking-normal":
            {},
        },
        ".body-light": {
          "@apply font-inter font-light text-base md:text-lg tracking-normal":
            {},
        },
        ".cta-text": {
          "@apply font-inter font-bold text-lg md:text-xl tracking-wide": {},
        },
      });
    },
      require("tailwindcss-animate")
],
};
