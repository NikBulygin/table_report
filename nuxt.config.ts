// https://nuxt.com/docs/api/configuration/nuxt-config
import { defineNuxtConfig } from 'nuxt/config'
import { createRequire } from 'module'
import path from 'path'
const require = createRequire(import.meta.url)
const prismaClientPath = require.resolve('@prisma/client')
const prismaClient = prismaClientPath.replace(
  /@prisma(\/|\\)client(\/|\\).*/,
  '.prisma/client/index-browser.js'
)
const prismaIndexBrowser = path.normalize(
  path.relative(process.cwd(), prismaClient)
)

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: ['@/assets/css/main.css'],
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@prisma/nuxt'
  ],
  prisma: {
    generateClient: true,
    installStudio: false,
    runMigration: false
  },
  colorMode: {
    classSuffix: '',
    preference: 'system',
    fallback: 'light',
    dataValue: 'theme',
    hid: 'nuxt-color-mode-script',
    globalName: '__NUXT_COLOR_MODE__',
    componentName: 'ColorScheme',
    classPrefix: '',
    storageKey: 'nuxt-color-mode',
    storage: 'localStorage'
  },
  i18n: {
    bundle: {
      optimizeTranslationDirective: false
    },
    strategy: 'no_prefix',
    defaultLocale: 'ru',
    baseUrl: import.meta.env.DEV
      ? 'http://localhost:3300/'
      : 'https://core.mfgm.kz/',
    lazy: true,
    locales: [
      { code: 'en', name: 'English', language: 'en', file: 'en.ts' },
      { code: 'kz', name: 'Қазақ', language: 'kk', file: 'kz.ts' },
      { code: 'ru', name: 'Русский', language: 'ru', file: 'ru.ts' }
    ],
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18nRed',
      redirectOn: 'root'
    }
  }
})
