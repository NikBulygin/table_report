/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif']
      },
      fontSize: {
        h1: ['2.5rem', { lineHeight: '3rem', fontWeight: '700' }],
        h2: ['2rem', { lineHeight: '2.5rem', fontWeight: '600' }],
        h3: ['1.75rem', { lineHeight: '2.25rem', fontWeight: '600' }],
        h4: ['1.5rem', { lineHeight: '2rem', fontWeight: '500' }],
        h5: ['1.25rem', { lineHeight: '1.75rem', fontWeight: '500' }],
        h6: ['1rem', { lineHeight: '1.5rem', fontWeight: '500' }]
      },
      colors: {
        // Light theme (default)
        primary: {
          DEFAULT: '#000080',
          50: '#e6e6ff',
          100: '#ccccff',
          200: '#9999ff',
          300: '#6666ff',
          400: '#3333ff',
          500: '#000080',
          600: '#00007a',
          700: '#000066',
          800: '#000052',
          900: '#00003d',
          950: '#000029'
        },
        background: '#ffffff',
        surface: '#f8fafc',
        text: {
          primary: '#171717',
          secondary: '#404040',
          tertiary: '#737373'
        },
        border: '#e5e5e5',

        // Dark theme
        dark: {
          primary: {
            DEFAULT: '#3333ff',
            50: '#000029',
            100: '#00003d',
            200: '#000052',
            300: '#000066',
            400: '#00007a',
            500: '#000080',
            600: '#3333ff',
            700: '#6666ff',
            800: '#9999ff',
            900: '#ccccff',
            950: '#e6e6ff'
          },
          background: '#0a0a0a',
          surface: '#171717',
          text: {
            primary: '#f8fafc',
            secondary: '#e5e5e5',
            tertiary: '#a3a3a3'
          },
          border: '#404040'
        },

        // High contrast theme
        'high-contrast': {
          primary: {
            DEFAULT: '#000000',
            50: '#ffffff',
            100: '#ffffff',
            200: '#000000',
            300: '#000000',
            400: '#000000',
            500: '#000000',
            600: '#ffffff',
            700: '#ffffff',
            800: '#000000',
            900: '#000000',
            950: '#000000'
          },
          background: '#ffffff',
          surface: '#ffffff',
          text: {
            primary: '#000000',
            secondary: '#000000',
            tertiary: '#000000'
          },
          border: '#000000',
          // Dark high contrast variant
          dark: {
            primary: {
              DEFAULT: '#ffffff',
              50: '#000000',
              100: '#000000',
              200: '#ffffff',
              300: '#ffffff',
              400: '#ffffff',
              500: '#ffffff',
              600: '#000000',
              700: '#000000',
              800: '#ffffff',
              900: '#ffffff',
              950: '#ffffff'
            },
            background: '#000000',
            surface: '#000000',
            text: {
              primary: '#ffffff',
              secondary: '#ffffff',
              tertiary: '#ffffff'
            },
            border: '#ffffff'
          }
        },

        // Status colors (same for all themes)
        success: {
          light: '#ecfdf5',
          DEFAULT: '#10b981',
          dark: '#065f46'
        },
        info: {
          light: '#eff6ff',
          DEFAULT: '#3b82f6',
          dark: '#1e40af'
        },
        warning: {
          light: '#fffbeb',
          DEFAULT: '#f59e0b',
          dark: '#92400e'
        },
        danger: {
          light: '#fef2f2',
          DEFAULT: '#ef4444',
          dark: '#991b1b'
        }
      }
    }
  },
  plugins: [
    function ({
      addVariant
    }: {
      addVariant: (name: string, definition: string) => void
    }) {
      // Add high-contrast variants
      addVariant('high-contrast', '.high-contrast &')
      addVariant('high-contrast-dark', '.high-contrast.dark &')
    }
  ]
}
