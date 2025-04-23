<template>
  <div
    class="min-h-screen bg-background dark:bg-dark-background high-contrast:bg-high-contrast-background"
  >
    <nav
      class="bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface border-b border-border dark:border-dark-border high-contrast:border-high-contrast-border"
    >
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex justify-between h-16">
          <div class="flex">
            <NuxtLink
              v-for="shop in shops"
              :key="shop.id"
              :to="{ path: '/', query: { shop: shop.id } }"
              class="inline-flex items-center px-4 border-b-2 transition-colors"
              :class="[
                $route.query.shop === shop.id
                  ? 'border-primary dark:border-dark-primary high-contrast:border-high-contrast-primary text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary'
                  : 'border-transparent text-text-secondary dark:text-dark-text-secondary high-contrast:text-high-contrast-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary high-contrast:hover:text-high-contrast-text-primary'
              ]"
            >
              {{ shop.name }}
            </NuxtLink>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
    <main class="max-w-7xl mx-auto px-4 py-6">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import ThemeToggle from '~/components/tools/ThemeToggle.vue'

const shops = [
  { id: '2', name: 'Цех 2' },
  { id: '12', name: 'Цех 12' }
]
</script>
