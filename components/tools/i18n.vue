<script setup>
import { onClickOutside } from '@vueuse/core'
import RuFlag from './icons/flags/ru.vue'
import KzFlag from './icons/flags/kz.vue'
import GbFlag from './icons/flags/gb.vue'

const { locales, locale, setLocale } = useI18n()
const isOpen = ref(false)
const buttonRef = ref(null)
const dropdownRef = ref(null)

// Get current locale object
const currentLocale = computed(() => {
  return locales.value.find(l => l.code === locale.value)
})

// Close dropdown when clicking outside
onClickOutside(dropdownRef, () => {
  isOpen.value = false
})

// Flag component mapping
const flagComponents = {
  ru: RuFlag,
  kz: KzFlag,
  en: GbFlag
}

// Dropdown width state
const dropdownWidth = ref(0)

// Update dropdown width when button width changes
onMounted(() => {
  if (buttonRef.value) {
    dropdownWidth.value = buttonRef.value.offsetWidth
  }
})
</script>

<template>
  <div class="relative" ref="dropdownRef">
    <!-- Current language button -->
    <button
      ref="buttonRef"
      @click="isOpen = !isOpen"
      class="flex items-center gap-2 px-3 py-2 rounded-lg border border-border dark:border-dark-border hover:bg-surface dark:hover:bg-dark-surface transition-colors w-full"
    >
      <component
        :is="flagComponents[currentLocale.code]"
        class="w-5 h-5 flex-shrink-0"
      />
      <span
        class="font-medium text-text-primary dark:text-dark-text-primary"
      >
        {{ currentLocale.code.toUpperCase() }}
      </span>
      <!-- Dropdown arrow -->
      <svg
        class="w-4 h-4 transition-transform ml-auto"
        :class="{ 'rotate-180': isOpen }"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </button>

    <!-- Dropdown menu -->
    <div
      v-show="isOpen"
      class="absolute top-full mt-0 bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-lg shadow-lg overflow-hidden z-50 w-full"
    >
      <button
        v-for="lang in locales"
        :key="lang.code"
        @click="
          () => {
            setLocale(lang.code)
            isOpen = false
          }
        "
        class="flex items-center w-full px-3 py-2 hover:bg-surface dark:hover:bg-dark-surface transition-colors"
        :class="{
          'bg-surface dark:bg-dark-surface': lang.code === locale
        }"
      >
        <div class="flex items-center gap-2 min-w-[60px]">
          <component
            :is="flagComponents[lang.code]"
            class="w-5 h-5 flex-shrink-0"
          />
          <span
            class="font-medium text-text-primary dark:text-dark-text-primary"
          >
            {{ lang.code.toUpperCase() }}
          </span>
        </div>
      </button>
    </div>
  </div>
</template>
