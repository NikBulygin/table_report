<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <h3 class="text-lg font-medium leading-6 text-gray-900">Сводка</h3>

      <!-- Сводная таблица -->
      <div class="mt-4 overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ГТД
              </th>
              <th
                scope="col"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Инвойс
              </th>
              <th
                v-for="field in numericFields"
                :key="field"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {{ getFieldLabel(field) }}
              </th>
            </tr>
          </thead>
          <tbody
            v-if="shopStore.groupedSummary"
            class="bg-white divide-y divide-gray-200"
          >
            <template
              v-for="(gtdGroup, gtd) in shopStore.groupedSummary
                .groupedData"
              :key="gtd"
            >
              <template
                v-for="(invoiceData, invoice) in gtdGroup"
                :key="invoice"
              >
                <tr class="hover:bg-gray-50">
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                  >
                    {{ gtd }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {{ invoice }}
                  </td>
                  <td
                    v-for="field in numericFields"
                    :key="field"
                    class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                  >
                    {{ formatNumber(invoiceData[field]) }}
                  </td>
                </tr>
              </template>
            </template>
            <!-- Общий итог -->
            <tr class="bg-gray-100 font-bold">
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
              >
                Общий итог
              </td>
              <td
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
              ></td>
              <td
                v-for="field in numericFields"
                :key="field"
                class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
              >
                {{ formatNumber(shopStore.groupedSummary.totals[field]) }}
              </td>
            </tr>
          </tbody>
          <tbody v-else>
            <tr>
              <td
                :colspan="numericFields.length + 2"
                class="px-6 py-4 text-center text-sm text-gray-500"
              >
                Загрузка данных...
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
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

// Получаем только числовые поля для отображения в таблице
const numericFields = computed(() => {
  return (
    config.value?.columns
      .filter(
        col =>
          col.key === 'weight' ||
          col.key === 'tio2Analysis' ||
          col.key === 'h2oAnalysis' ||
          col.key === 'recalculatedWeight' ||
          col.key === 'perMetVklCert' ||
          col.key === 'perTioCert' ||
          col.key === 'perH2oCert' ||
          col.key === 'H2OWeight' ||
          col.key === 'DryWeight' ||
          col.key === 'MetalTon' ||
          col.key === 'MinusMetal' ||
          col.key === 'standart80Tio2'
      )
      .map(col => col.key) || []
  )
})

const getFieldLabel = (field: string) => {
  const column = config.value?.columns.find(col => col.key === field)
  return column?.label || field
}

const formatNumber = (value: number) => {
  return value?.toFixed(2) || '0.00'
}

// Загружаем сводные данные при монтировании компонента и при изменении фильтров
onMounted(() => {
  shopStore.fetchSummary()
})

watch(
  () => shopStore.filters,
  () => {
    shopStore.fetchSummary()
  },
  { deep: true }
)
</script>
