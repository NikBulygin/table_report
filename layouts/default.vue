<template>
  <header>
    <div class="flex items-center justify-between p-4">
      <div class="logo w-64 h-16">
        <NuxtLink to="/">
          <!-- <img src="/logo.svg" alt="Logo" /> -->
          logo
        </NuxtLink>
      </div>

      <TreeNavigation :items="navigationItems" />
      <div class="flex flex-col gap-2">
        <themeSelector />
        <langselector />
      </div>
    </div>
  </header>
  <div v-if="secondaryNavigationItems.length > 0">
    <SideNavigation
      :items="secondaryNavigationItems"
      :is-open="isMenuOpen"
      @update:isOpen="toggleMenu"
    />
    <button
      @click="toggleMenu"
      class="fixed bottom-8 right-8 p-3 rounded-full bg-primary dark:bg-dark-primary high-contrast:bg-high-contrast-primary text-white shadow-lg hover:opacity-90 transition-opacity"
      aria-label="Toggle menu"
    >
      <svg
        class="w-6 h-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
  </div>
  <slot />
</template>

<script setup lang="ts">
import TreeNavigation from '@/components/navigation/TreeNavigation.vue'
import SideNavigation from '@/components/navigation/SideNavigation.vue'
import themeSelector from '@/components/tools/ThemeToggle.vue'
import langselector from '@/components/tools/i18n.vue'

// Define props
const props = defineProps<{
  secondaryNavigationItems?: NavigationItem[]
}>()

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const navigationItems = ref<NavigationItem[]>([
  { title: 'Главная', url: '/' },
  {
    title: 'TestWithChild',
    url: '/test',
    children: [
      { title: 'Child1', url: '/child1' },
      {
        title: 'Child2',
        url: '/child2',
        children: [
          { title: 'Child2.1', url: '/child2.1' },
          { title: 'Child2.2', url: '/child2.2' },
          { title: 'Child2.3', url: '/child2.3' }
        ]
      }
    ]
  }
])
</script>
