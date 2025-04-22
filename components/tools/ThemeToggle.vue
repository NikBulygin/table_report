<script setup lang="ts">
import { useColorMode } from '#imports'
import SunIcon from './icons/flags/sun.vue'
import MoonIcon from './icons/flags/moon.vue'
import EyeIcon from './icons/flags/eye.vue'

const colorMode = useColorMode()

const themes = [
  { name: 'light', icon: SunIcon, label: 'Светлая' },
  { name: 'dark', icon: MoonIcon, label: 'Темная' },
  { name: 'high-contrast', icon: EyeIcon, label: 'Контраст' }
]

const currentThemeIndex = computed(() => {
  return themes.findIndex(theme => theme.name === colorMode.value)
})

const sliderPosition = computed(() => {
  return `calc(${currentThemeIndex.value} * (100% / 3))`
})

function setTheme(themeName: string) {
  colorMode.preference = themeName
  document.documentElement.setAttribute('data-theme', themeName)
}
</script>

<template>
  <div class="relative select-none">
    <!-- Container -->
    <div
      class="flex items-center bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface rounded-lg border border-border dark:border-dark-border high-contrast:border-high-contrast-border p-1 relative w-[7.5rem] h-9"
    >
      <!-- Sliding indicator -->
      <div
        class="absolute h-7 w-[calc(100%/3-0.25rem)] bg-primary dark:bg-dark-primary high-contrast:bg-high-contrast-primary transition-all duration-300 ease-in-out rounded"
        :style="{ left: sliderPosition }"
      />

      <!-- Theme buttons -->
      <template v-for="(theme, index) in themes" :key="theme.name">
        <button
          @click="setTheme(theme.name)"
          class="relative z-10 flex-1 h-7 flex items-center justify-center rounded transition-colors duration-200"
          :class="[
            currentThemeIndex === index
              ? 'text-white'
              : 'text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary',
            currentThemeIndex !== index ? 'hover:scale-110' : ''
          ]"
          :title="theme.label"
        >
          <component
            :is="theme.icon"
            class="w-5 h-5 transition-transform duration-200"
            :class="{ 'scale-110': currentThemeIndex === index }"
          />
        </button>
      </template>
    </div>
  </div>
</template>

<style>
/* Smooth theme transition */
::view-transition-old(root),
::view-transition-new(root) {
  animation: none;
  mix-blend-mode: normal;
}

::view-transition-old(root) {
  z-index: 1;
}
::view-transition-new(root) {
  z-index: 2;
}

.dark::view-transition-old(root) {
  z-index: 2;
}
.dark::view-transition-new(root) {
  z-index: 1;
}
</style>

<style scoped>
.theme-transition {
  transition: transform 0.3s ease-in-out;
}
</style>
