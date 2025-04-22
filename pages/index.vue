<script setup lang="ts">
import { ref } from 'vue'
import type { NavigationMenu } from '~/types'
import SideNavigation from '~/components/navigation/SideNavigation.vue'
import TreeNavigation from '~/components/navigation/TreeNavigation.vue'
const isNavigationOpen = ref(false)

const navigationItems: NavigationMenu = [
  {
    title: 'Главная',
    url: '/'
  },
  {
    title: 'О нас',
    url: '/about',
    children: [
      {
        title: 'История',
        url: '/about/history'
      },
      {
        title: 'Команда',
        url: '/about/team'
      }
    ]
  },
  {
    title: 'Услуги',
    url: '/services',
    children: [
      {
        title: 'Консультации',
        url: '/services/consulting'
      },
      {
        title: 'Разработка',
        url: '/services/development',
        children: [
          {
            title: 'Веб-разработка',
            url: '/services/development/web'
          },
          {
            title: 'Мобильная разработка',
            url: '/services/development/mobile'
          }
        ]
      }
    ]
  },
  {
    title: 'Контакты',
    url: '/contacts'
  }
]
</script>

<template>
  <TreeNavigation :items="navigationItems" />
  <div>
    <button
      @click="isNavigationOpen = true"
      class="fixed right-4 bottom-4 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-600 transition-colors duration-200"
    >
      <svg
        class="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        />
      </svg>
    </button>

    <SideNavigation
      v-model:isOpen="isNavigationOpen"
      :items="navigationItems"
    />

    test
  </div>
</template>
