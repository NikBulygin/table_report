<template>
  <div>
    <h1>Hello World</h1>
    <button
      class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      @click="toggleNavigation"
    >
      {{ hasNavigation ? 'Скрыть' : 'Показать' }} дополнительное меню
    </button>
    <textfield
      v-model="value"
      regex="^[a-zA-Z0-9]+$"
      error-message="Поле должно содержать только буквы и цифры"
      label="Имя"
      placeholder="Введите имя"
    />
    <number-input v-model="value" label="Basic Number" />
    <number-input
      v-model="price"
      label="Price"
      :float="{ precision: 2, separator: ',', step: 0.5 }"
      :min="0"
      :max="1000"
    />
    <number-input
      v-model="quantity"
      label="Quantity"
      :float="{ precision: 0, step: 1 }"
      :min="1"
    />
    <number-input
      v-model="value"
      label="Custom Number"
      :showSpinner="false"
    />
  </div>
</template>

<script setup lang="ts">
import type { NavigationItem } from '~/types'
import textfield from '~/components/input/text.vue'
import numberInput from '~/components/input/number.vue'

const value = ref('')
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
