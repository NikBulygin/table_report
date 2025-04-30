<template>
  <div>
    <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">
      Сводка
    </h3>
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <SummaryCard
        v-for="field in summaryFields"
        :key="field.key"
        :label="field.label"
        :value="getSummaryValue(field.key)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useShopStore } from '~/stores/shop'
import { shop2Config } from '~/composable/shop2'
import { shop12Config } from '~/composable/shop12'

interface Column {
  key: string
  label: string
}

const shopStore = useShopStore()

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

const summaryFields = computed(() => {
  if (!config.value) return []
  return config.value.columns.filter((col: Column) =>
    config.value?.summary.fields.includes(col.key)
  )
})

const getSummaryValue = (key: string) => {
  if (!shopStore.items.length) return 0

  const values = shopStore.items.map(item => {
    // Если значение уже рассчитано, используем его
    if (item[key] !== undefined) return item[key]

    // Иначе пытаемся рассчитать
    const calc = config.value?.calc[key]
    if (calc) return calc(item)

    return 0
  })

  // Суммируем все значения
  return values.reduce((sum, val) => sum + val, 0).toFixed(2)
}
</script>
