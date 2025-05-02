<template>
  <div class="bg-white shadow rounded-lg">
    <div class="px-4 py-5 sm:p-6">
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Сводка</h3>
        <button
          @click="printSummary"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
            />
          </svg>
          Печать
        </button>
      </div>

      <!-- Сводная таблица -->
      <div class="mt-4 overflow-x-auto" ref="summaryTable">
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
import { computed, onMounted, watch, ref } from 'vue'
import { useShopStore } from '~/stores/shop'
import { shop2Config } from '~/composable/shop2'
import { shop12Config } from '~/composable/shop12'

const shopStore = useShopStore()
const summaryTable = ref<HTMLElement | null>(null)

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

const printSummary = () => {
  const printWindow = window.open('', '_blank')
  if (!printWindow) return

  // Определяем ориентацию на основе ширины таблицы
  const tableWidth = summaryTable.value?.offsetWidth || 0
  const orientation = tableWidth > 800 ? 'landscape' : 'portrait'

  const style = `
    <style>
      @page { size: A4 ${orientation}; margin: 1cm; }
      body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
      table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
      th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
      th { background-color: #f3f4f6; }
      tr:nth-child(even) { background-color: #f9fafb; }
      .total-row { font-weight: bold; background-color: #f3f4f6; }
      @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
    </style>
  `

  const title =
    shopStore.shopName === 'shop2'
      ? 'Сводка по шлаку'
      : 'Сводка по ильмениту'
  const date = new Date().toLocaleDateString('ru-RU')

  const content = [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    `<title>${title}</title>`,
    style,
    '</head>',
    '<body>',
    `<h2>${title}</h2>`,
    `<p>Дата формирования: ${date}</p>`,
    summaryTable.value?.innerHTML || '',
    '<script>',
    'window.onload = () => { window.print(); window.close(); }',
    '<\/script>',
    '</body>',
    '</html>'
  ].join('\n')

  printWindow.document.write(content)
  printWindow.document.close()
}
</script>

<style>
/* Скрываем все элементы при печати, кроме таблицы */
@media print {
  body > *:not(.summary-table) {
    display: none !important;
  }
  .summary-table {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
  }
}
</style>
