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
      v-model="numberValue"
      label="Custom Number"
      :showSpinner="false"
    />
    <datepicker
      v-model="date"
      format="dd.MM.yyyy"
      label="Дата с вводом"
      :allow-input="true"
      placeholder="Введите или выберите дату"
    />
    <datepicker
      v-model="date"
      format="dd.MM.yyyy"
      label="Дата только выбор"
      placeholder="Выберите дату"
    />
    <datepicker
      v-model="monthDate"
      format="MM.yyyy"
      label="Месяц и год с вводом"
      :allow-input="true"
      placeholder="Введите или выберите месяц"
    />
    <datepicker
      v-model="yearDate"
      format="yyyy"
      label="Год с вводом"
      :allow-input="true"
      placeholder="Введите или выберите год"
    />
    <datepicker
      v-model="restrictedDate"
      :min-date="new Date(2020, 0, 1)"
      :max-date="new Date(2025, 11, 31)"
      format="dd.MM.yyyy"
      label="Дата в диапазоне"
      placeholder="Выберите дату с 2020 по 2025"
    />
    <datepicker
      v-model="dateRange"
      format="dd.MM.yyyy"
      label="Период только выбор"
      range
      placeholder="Выберите период"
    />
    <datepicker
      v-model="dateRange"
      format="dd.MM.yyyy"
      label="Период с вводом"
      range
      :allow-input="true"
      placeholder="Введите или выберите период"
    />
    <datepicker
      v-model="monthRange"
      format="MM.yyyy"
      label="Период по месяцам с вводом"
      range
      :allow-input="true"
      placeholder="Введите или выберите период по месяцам"
    />
    <datepicker
      v-model="yearRange"
      format="yyyy"
      label="Период по годам с вводом"
      range
      :allow-input="true"
      placeholder="Введите или выберите период по годам"
    />
    <datepicker
      v-model="restrictedRange"
      :min-date="new Date(2024, 0, 1)"
      :max-date="new Date(2024, 11, 31)"
      format="dd.MM.yyyy"
      label="Период в 2024 году"
      range
      placeholder="Выберите период в 2024 году"
    />
  </div>
</template>

<script setup lang="ts">
import type { NavigationItem } from '~/types'
import textfield from '~/components/input/text.vue'
import numberInput from '~/components/input/number.vue'
import datepicker from '~/components/input/datepicker.vue'

const value = ref('')
const price = ref(0)
const quantity = ref(1)
const numberValue = ref(0)
const date = ref<Date | null>(null)
const monthDate = ref<Date | null>(null)
const yearDate = ref<Date | null>(null)
const restrictedDate = ref<Date | null>(null)
const dateRange = ref<[Date | null, Date | null]>([null, null])
const monthRange = ref<[Date | null, Date | null]>([null, null])
const yearRange = ref<[Date | null, Date | null]>([null, null])
const restrictedRange = ref<[Date | null, Date | null]>([null, null])
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
