<template>
  <div class="theme-container min-h-screen min-w-screen">
    <NuxtLayout :secondary-navigation-items="navigationItems">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import type { NavigationItem } from '~/types'

// Глобальное состояние для навигационных элементов
const navigationItems = useState<NavigationItem[]>(
  'navigationItems',
  () => []
)
</script>
