/** @type {import('tailwindcss').Config} */
import 'tailwindcss-animate'

export default {
  darkMode: ['class'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    fontFamily: {
      // https://github.com/system-fonts/modern-font-stacks
      systemui: ['system-ui', 'sans-serif'],
      transitional: [
        'Charter',
        'Bitstream Charter',
        'Sitka Text',
        'Cambria',
        'serif',
      ],
      oldstyle: [
        'Iowan Old Style',
        'Palatino Linotype',
        'URW Palladio L',
        'P052',
        'serif',
      ],
      humanist: [
        'Seravek',
        'Gill Sans Nova',
        'Ubuntu',
        'Calibri',
        'DejaVu Sans',
        'source-sans-pro',
        'sans-serif',
      ],
      geohumanist: [
        'Avenir',
        'Montserrat',
        'Corbel',
        'URW Gothic',
        'source-sans-pro',
        'sans-serif',
      ],
      classhuman: [
        'Optima',
        'Candara',
        'Noto Sans',
        'source-sans-pro',
        'sans-serif',
      ],
      neogrote: [
        'Inter',
        'Roboto',
        'Helvetica Neue',
        'Arial Nova',
        'Nimbus Sans',
        'Arial',
        'sans-serif',
      ],
      monoslab: ['Nimbus Mono PS', 'Courier New', 'monospace'],
      monocode: [
        'ui-monospace',
        'Cascadia Code',
        'Source Code Pro',
        'Menlo',
        'Consolas',
        'DejaVu Sans Mono',
        'monospace',
      ],
      industrial: [
        'Bahnschrift',
        'DIN Alternate',
        'Franklin Gothic Medium',
        'Nimbus Sans Narrow',
        'sans-serif-condensed',
        'sans-serif',
      ],
      roundsans: [
        'ui-rounded',
        'Hiragino Maru Gothic ProN',
        'Quicksand',
        'Comfortaa',
        'Manjari',
        'Arial Rounded MT',
        'Arial Rounded MT Bold',
        'Calibri',
        'source-sans-pro',
        'sans-serif',
      ],
      slabserif: [
        'Rockwell',
        'Rockwell Nova',
        'Roboto Slab',
        'DejaVu Serif',
        'Sitka Small',
        'serif',
      ],
      antique: [
        'Superclarendon',
        'Bookman Old Style',
        'URW Bookman',
        'URW Bookman L',
        'Georgia Pro',
        'Georgia',
        'serif',
      ],
      didone: [
        'Didot',
        'Bodoni MT',
        'Noto Serif Display',
        'URW Palladio L',
        'P052',
        'Sylfaen',
        'serif',
      ],
      handwritten: [
        'Segoe Print',
        'Bradley Hand',
        'Chilanka',
        'TSCu_Comic',
        'casual',
        'cursive',
      ],
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: ['tailwindcss-animate'],
}

