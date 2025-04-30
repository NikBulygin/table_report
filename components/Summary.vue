<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">Сводка</h3>
      <div
        class="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      >
        <div
          v-for="field in summaryFields"
          :key="field"
          class="bg-gray-50 rounded-lg p-4"
        >
          <h4 class="text-sm font-medium text-gray-500">
            {{ getFieldLabel(field) }}
          </h4>
          <p class="mt-2 text-2xl font-semibold text-gray-900">
            {{ getSummaryValue(field) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useShopStore } from '~/stores/shop'
import { shop2Config } from '~/composable/shop2'
import { shop12Config } from '~/composable/shop12'

const shopStore = useShopStore()

// Получаем конфигурацию в зависимости от магазина
const config = computed(() => {
  switch (shopStore.shopName) {
    case 'shop2':
      return shop2Config
    case 'shop12':
      return shop12Config
    default:
      return null
  }
})

const summaryFields = computed(() => config.value?.summary.fields || [])

const getFieldLabel = (field: string) => {
  const column = config.value?.columns.find(col => col.key === field)
  return column?.label || field
}

const getSummaryValue = (field: string) => {
  const values = shopStore.filteredItems
    .map(item => {
      const value = item[field]
      return typeof value === 'number' ? value : 0
    })
    .filter(value => !isNaN(value))

  if (values.length === 0) return '0.00'

  const sum = values.reduce((acc, val) => acc + val, 0)
  return sum.toFixed(2)
}
</script>
