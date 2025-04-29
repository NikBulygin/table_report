<template>
  <div class="space-y-6">
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Фильтр по месяцу
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Выберите месяц для фильтрации данных
          </p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form class="space-y-6" @submit.prevent="applyFilter">
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label
                  for="month"
                  class="block text-sm font-medium text-gray-700"
                  >Месяц</label
                >
                <div class="mt-1 relative">
                  <input
                    type="month"
                    v-model="store.filter.month"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md cursor-pointer"
                    @click="openDatePicker"
                  />
                  <div
                    class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none"
                  >
                    <svg
                      class="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <div class="sm:col-span-3">
                <label
                  for="pageSize"
                  class="block text-sm font-medium text-gray-700"
                  >Количество карточек</label
                >
                <div class="mt-1">
                  <select
                    id="pageSize"
                    v-model.number="store.filter.pagination.pageSize"
                    @change="onPageSizeChange"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  >
                    <option :value="10">10</option>
                    <option :value="20">20</option>
                    <option :value="50">50</option>
                    <option :value="100">100</option>
                  </select>
                </div>
              </div>
              <div class="sm:col-span-3">
                <label class="block text-sm font-medium text-gray-700"
                  >Номера инвойсов</label
                >
                <div class="mt-1">
                  <Multiselect
                    v-model="store.filter.invoiceNumbers"
                    :options="invoiceNumberOptions"
                    :searchable="true"
                    :create-option="false"
                    mode="multiple"
                    valueProp="value"
                    track-by="value"
                    label="label"
                    placeholder="Выберите номера инвойсов"
                    :can-clear="true"
                    :can-deselect="true"
                    :close-on-select="false"
                    :search-results-text="'Найдено {count} вариантов'"
                    :no-results-text="'Ничего не найдено'"
                    :no-options-text="'Нет доступных вариантов'"
                    :select-text="'Выбрать'"
                    :deselect-text="'Удалить'"
                    :clear-text="'Очистить'"
                    class="multiselect-wrapper"
                  />
                  <p class="mt-1 text-sm text-gray-500">
                    Начните вводить для поиска или выберите из списка
                  </p>
                </div>
              </div>
              <div class="sm:col-span-3">
                <label class="block text-sm font-medium text-gray-700"
                  >Номера ГТД</label
                >
                <div class="mt-1">
                  <Multiselect
                    v-model="store.filter.gtdNumbers"
                    :options="gtdNumberOptions"
                    :searchable="true"
                    :create-option="false"
                    mode="multiple"
                    valueProp="value"
                    track-by="value"
                    label="label"
                    placeholder="Выберите номера ГТД"
                    :can-clear="true"
                    :can-deselect="true"
                    :close-on-select="false"
                    :search-results-text="'Найдено {count} вариантов'"
                    :no-results-text="'Ничего не найдено'"
                    :no-options-text="'Нет доступных вариантов'"
                    :select-text="'Выбрать'"
                    :deselect-text="'Удалить'"
                    :clear-text="'Очистить'"
                    class="multiselect-wrapper"
                  />
                  <p class="mt-1 text-sm text-gray-500">
                    Начните вводить для поиска или выберите из списка
                  </p>
                </div>
              </div>
            </div>
            <div class="flex justify-end">
              <button
                type="button"
                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
                @click="store.toggleEditMode()"
                v-if="!store.isEditMode"
              >
                Редактировать
              </button>
              <template v-else>
                <button
                  type="button"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                  @click="store.cancelEdit()"
                >
                  Отменить
                </button>
                <button
                  type="button"
                  class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700"
                  @click="store.applyEdit()"
                >
                  Применить
                </button>
              </template>
              <button
                type="button"
                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
                :disabled="!store.selectedIds.length"
                @click="store.deleteSelected()"
              >
                Удалить выбранные
              </button>
              <button
                type="submit"
                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Применить фильтр
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="space-y-4">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Результаты
        </h3>
        <div v-if="store.loading" class="text-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"
          ></div>
        </div>
        <div v-else-if="store.error" class="text-red-600">
          {{ store.error }}
        </div>
        <div v-else class="space-y-2">
          <div class="text-sm text-gray-500">
            Всего записей: {{ store.pagination.total || 0 }}
          </div>
          <div class="text-sm text-gray-500">
            Текущая страница: {{ store.pagination.currentPage || 0 }} из
            {{ store.pagination.totalPages || 0 }}
          </div>
          <div
            v-if="store.totalStandart80Tio2"
            class="text-sm text-gray-500"
          >
            Сумма Standart 80 TIO2:
            {{ store.totalStandart80Tio2.toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
    <div class="mt-8">
      <TableShop2 v-if="shop === 'shop2'" :items="store.items" />
      <TableShop12 v-if="shop === 'shop12'" :items="store.items" />
    </div>

    <Pagination
      v-if="!store.loading && !store.error"
      :current-page="store.pagination.currentPage"
      :total-pages="store.pagination.totalPages"
      :total="store.pagination.total"
      :page-size="store.filter.pagination.pageSize"
      @page-change="handlePageChange"
    />

    <!-- <span>
      {{ store.items }}
    </span> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useShopDataStore } from '~/stores/shopData'
import Pagination from '~/components/Pagination.vue'
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'

const store = useShopDataStore()
const route = useRoute()
const shop = computed(() => route.params.shop as 'shop2' | 'shop12')

// Следим за изменением месяца и обновляем данные
watch(
  () => store.filter.month,
  async newMonth => {
    if (newMonth) {
      await store.fetchData()
    }
  }
)

onMounted(() => {
  store.setShopType(shop.value)
  // Установить текущий месяц и загрузить данные
  const now = new Date()
  const month = now.toISOString().slice(0, 7)
  store.setMonth(month)
  store.fetchData()
})

const openDatePicker = () => {
  const input = document.querySelector(
    'input[type="month"]'
  ) as HTMLInputElement
  if (input) {
    input.showPicker()
  }
}

function onPageSizeChange(e: Event) {
  const value = Number((e.target as HTMLSelectElement).value)
  store.setPageSize(value)
  store.fetchData()
}

function applyFilter() {
  store.setMonth(store.filter.month)
  store.setPage(1)
  store.fetchData()
}

function handlePageChange(page: number) {
  store.setPage(page)
  store.fetchData()
}

const invoiceNumberOptions = computed(() => {
  const set = new Set<string>()
  store.items.forEach(gtd => {
    // Если выбраны ГТД, показываем только инвойсы из выбранных ГТД
    if (
      store.filter.gtdNumbers.length === 0 ||
      store.filter.gtdNumbers.includes(gtd.GtdNumber)
    ) {
      ;(gtd.Invoices || []).forEach(inv => {
        if (inv.InvoiceNumber) set.add(inv.InvoiceNumber)
      })
    }
  })
  return Array.from(set)
    .sort((a, b) => b.localeCompare(a)) // Сортировка по убыванию
    .map(value => ({ value, label: value }))
})

const gtdNumberOptions = computed(() => {
  const set = new Set<string>()
  store.items.forEach(gtd => {
    // Если выбраны инвойсы, показываем только ГТД, содержащие выбранные инвойсы
    if (
      store.filter.invoiceNumbers.length === 0 ||
      gtd.Invoices.some(inv =>
        store.filter.invoiceNumbers.includes(inv.InvoiceNumber)
      )
    ) {
      if (gtd.GtdNumber) set.add(gtd.GtdNumber)
    }
  })
  return Array.from(set)
    .sort((a, b) => b.localeCompare(a)) // Сортировка по убыванию
    .map(value => ({ value, label: value }))
})
</script>

<style>
@import '~/assets/main.css';

/* Hide default calendar icon for input[type=month] */
input[type='month']::-webkit-calendar-picker-indicator {
  opacity: 0;
  display: none;
}
input[type='month']::-webkit-input-placeholder {
  color: transparent;
}
input[type='month']::-moz-placeholder {
  color: transparent;
}
input[type='month']:-ms-input-placeholder {
  color: transparent;
}
input[type='month']::placeholder {
  color: transparent;
}
input[type='month'] {
  position: relative;
  z-index: 1;
  background-color: transparent;
}

.multiselect-wrapper {
  --ms-tag-bg: #4f46e5;
  --ms-tag-color: #ffffff;
  --ms-ring-color: #4f46e5;
  --ms-option-bg-selected: #4f46e5;
  --ms-option-bg-pointed: #f3f4f6;
  --ms-option-color-pointed: #111827;
  --ms-option-color-selected: #ffffff;
  --ms-option-color-disabled: #9ca3af;
  --ms-option-bg-disabled: #f3f4f6;
  --ms-option-bg-selected-pointed: #4338ca;
  --ms-option-color-selected-pointed: #ffffff;
  --ms-option-bg-selected-disabled: #4f46e5;
  --ms-option-color-selected-disabled: #9ca3af;
  --ms-tag-bg-disabled: #9ca3af;
  --ms-tag-color-disabled: #ffffff;
  --ms-tag-bg-selected: #4f46e5;
  --ms-tag-color-selected: #ffffff;
  --ms-tag-bg-selected-pointed: #4338ca;
  --ms-tag-color-selected-pointed: #ffffff;
  --ms-tag-bg-selected-disabled: #9ca3af;
  --ms-tag-color-selected-disabled: #ffffff;
  --ms-tag-bg-pointed: #4338ca;
  --ms-tag-color-pointed: #ffffff;
  --ms-tag-bg-disabled-pointed: #9ca3af;
  --ms-tag-color-disabled-pointed: #ffffff;
  --ms-tag-bg-selected-disabled-pointed: #9ca3af;
  --ms-tag-color-selected-disabled-pointed: #ffffff;
}

.multiselect {
  min-height: 38px;
  border-radius: 0.375rem;
  border-color: #d1d5db;
  transition: all 0.2s ease-in-out;
}

.multiselect.is-active {
  border-color: #4f46e5;
  box-shadow: 0 0 0 1px #4f46e5;
}

.multiselect-search {
  background-color: transparent;
  padding: 0.5rem;
  font-size: 0.875rem;
}

.multiselect-dropdown {
  border-color: #d1d5db;
  border-radius: 0.375rem;
  margin-top: 2px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.multiselect-option {
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  transition: all 0.2s ease-in-out;
}

.multiselect-option.is-selected {
  background-color: #4f46e5;
  color: white;
}

.multiselect-option.is-pointed {
  background-color: #f3f4f6;
  color: black;
}

.multiselect-placeholder {
  color: #6b7280;
  padding: 0.5rem;
}

.multiselect-tag {
  background-color: #4f46e5;
  color: white;
  border-radius: 0.25rem;
  padding: 0.25rem 0.5rem;
  margin: 0.125rem;
  font-size: 0.75rem;
  display: inline-flex;
  align-items: center;
  transition: all 0.2s ease-in-out;
}

.multiselect-tag:hover {
  background-color: #4338ca;
}

.multiselect-tag-remove {
  margin-left: 0.25rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s ease-in-out;
}

.multiselect-tag-remove:hover {
  opacity: 1;
}
</style>
