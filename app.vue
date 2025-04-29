<template>
  <div :class="{ 'high-contrast': isHighContrast }">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <ThemeToggle />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const isHighContrast = ref(false)

// Listen for system high contrast mode changes
onMounted(() => {
  if (window.matchMedia) {
    const mediaQuery = window.matchMedia('(forced-colors: active)')
    isHighContrast.value = mediaQuery.matches

    mediaQuery.addEventListener('change', e => {
      isHighContrast.value = e.matches
    })
  }
})
</script>

<style>
@import '~/assets/main.css';
</style>
