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
  darkMode: 'class', // Включаем поддержку темной темы через класс
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
        primary: {
          DEFAULT: 'rgb(0,0,124)', // Основной цвет
          50: '#e6e6ff',
          100: '#ccccff',
          200: '#9999ff',
          300: '#6666ff',
          400: '#3333ff',
          500: 'rgb(0,0,124)', // Наш новый основной цвет
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

        // Светлая тема
        light: {
          primary: {
            DEFAULT: 'rgb(0,0,124)',
            50: '#e6e6ff',
            100: '#ccccff',
            200: '#9999ff',
            300: '#6666ff',
            400: '#3333ff',
            500: 'rgb(0,0,124)',
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
          border: '#e5e5e5'
        },
        // Темная тема (инверсия)
        dark: {
          primary: {
            DEFAULT: 'rgb(0,0,124)',
            50: '#000029',
            100: '#00003d',
            200: '#000052',
            300: '#000066',
            400: '#00007a',
            500: 'rgb(0,0,124)',
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
        // Цвета для уведомлений (одинаковые для обеих тем)
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
  plugins: []
}
