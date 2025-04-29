<template>
  <button
    @click="toggleTheme"
    class="fixed bottom-4 right-4 p-2 rounded-full bg-white shadow-lg hover:shadow-xl transition-all duration-200"
    :class="{
      'high-contrast:border-2 high-contrast:border-current': true
    }"
    :title="
      isHighContrast
        ? 'Switch to normal theme'
        : 'Switch to high contrast theme'
    "
  >
    <svg
      v-if="!isHighContrast"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-gray-800"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-gray-800"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M4 4l16 16"
      />
    </svg>
  </button>
</template>

<script setup lang="ts">
const isHighContrast = ref(false)

// Check if theme is stored in localStorage
onMounted(() => {
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme === 'high-contrast') {
    isHighContrast.value = true
    document.documentElement.classList.add('high-contrast')
  }
})

const toggleTheme = () => {
  isHighContrast.value = !isHighContrast.value
  if (isHighContrast.value) {
    document.documentElement.classList.add('high-contrast')
    localStorage.setItem('theme', 'high-contrast')
  } else {
    document.documentElement.classList.remove('high-contrast')
    localStorage.setItem('theme', 'normal')
  }
}
</script>
