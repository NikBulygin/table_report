<template>
  <div>
    <h1>Hello World</h1>
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      @click="toggleNavigation"
    >
      {{ hasNavigation ? 'Скрыть' : 'Показать' }} дополнительное меню
    </button>
  </div>
</template>

<script setup lang="ts">
import type { NavigationItem } from '~/types'

const navigationItems = useState<NavigationItem[]>('navigationItems')
const hasNavigation = computed(() => navigationItems.value.length > 0)

const sampleNavigation: NavigationItem[] = [
  {
    title: 'Дополнительное меню',
    url: '/additional',
    children: [
      { title: 'Пункт 1', url: '/additional/1' },
      {
        title: 'Пункт 2',
        url: '/additional/2',
        children: [
          { title: 'Подпункт 2.1', url: '/additional/2/1' },
          { title: 'Подпункт 2.2', url: '/additional/2/2' }
        ]
      }
    ]
  }
]

const toggleNavigation = () => {
  navigationItems.value = hasNavigation.value ? [] : sampleNavigation
}
</script>
