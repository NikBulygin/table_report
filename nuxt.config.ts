// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@prisma/nuxt', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
  runtimeConfig: {
    // The private keys which are only available server-side
    ipWhitelist: process.env.IP_WHITELIST?.split(',') || [],
    // Keys within public are also exposed client-side
    public: {
      // Your public keys
    }
  }
})
