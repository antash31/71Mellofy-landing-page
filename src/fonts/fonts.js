// src/fonts/fonts.js
import { Inter, Playfair_Display, Montserrat, Roboto, Poppins, Oswald } from 'next/font/google';

// Font instances with proper configuration
export const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-inter',
});

export const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '600', '700', '800'],
  variable: '--font-playfair',
});

export const montserrat = Montserrat({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-montserrat',
});

export const roboto = Roboto({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-roboto',
});

export const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-poppins',
});

export const oswald = Oswald({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--font-oswald',
});
