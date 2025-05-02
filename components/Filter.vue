<template>
  <div class="bg-white shadow rounded-lg p-4">
    <h3 class="text-lg font-medium leading-6 text-gray-900 mb-4">
      Фильтры
    </h3>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div>
        <label for="date" class="block text-sm font-medium text-gray-700">
          Месяц-Год
        </label>
        <input
          type="month"
          id="date"
          v-model="dateFilter"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
      </div>
      <div>
        <label
          for="invoice"
          class="block text-sm font-medium text-gray-700"
        >
          Номер инвойса
        </label>
        <input
          type="text"
          id="invoice"
          v-model="invoiceFilter"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Введите номер инвойса"
        />
      </div>
      <div>
        <label for="gtd" class="block text-sm font-medium text-gray-700">
          Номер ГТД
        </label>
        <input
          type="text"
          id="gtd"
          v-model="gtdFilter"
          class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          placeholder="Введите номер ГТД"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useShopStore } from '~/stores/shop'

const shopStore = useShopStore()
const dateFilter = ref('')
const invoiceFilter = ref('')
const gtdFilter = ref('')

// Функция для форматирования даты в формат YYYY-MM
const formatDateForInput = (date: string) => {
  if (!date) return ''
  const [month, year] = date.split('-')
  return `${year}-${month.padStart(2, '0')}`
}

// Функция для форматирования даты в формат месяц-год
const formatDateForStore = (date: string) => {
  if (!date) return ''
  const [year, month] = date.split('-')
  return `${month}-${year}`
}

// Инициализация начальных значений
onMounted(() => {
  dateFilter.value = formatDateForInput(shopStore.filters.date)
  invoiceFilter.value = shopStore.filters.invoice
  gtdFilter.value = shopStore.filters.gtd
})

// Отслеживаем изменения фильтров
watch(
  [dateFilter, invoiceFilter, gtdFilter],
  ([newDate, newInvoice, newGtd]) => {
    // Обновляем фильтры в хранилище
    shopStore.setFilters({
      date: formatDateForStore(newDate),
      invoice: newInvoice,
      gtd: newGtd
    })
  }
)
</script>
