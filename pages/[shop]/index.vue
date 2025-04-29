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
          <form class="space-y-6" @submit.prevent="fetchData">
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
                    v-model="filter.month"
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
            </div>

            <div class="flex justify-end">
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
        <div v-if="loading" class="text-center">
          <div
            class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"
          ></div>
        </div>
        <div v-else-if="error" class="text-red-600">
          {{ error }}
        </div>
        <div v-else class="space-y-2">
          <div class="text-sm text-gray-500">
            Всего записей: {{ result?.pagination?.total || 0 }}
          </div>
          <div class="text-sm text-gray-500">
            Текущая страница: {{ result?.pagination?.currentPage || 0 }} из
            {{ result?.pagination?.totalPages || 0 }}
          </div>
          <pre class="bg-gray-50 p-4 rounded-md overflow-auto max-h-96">{{
            JSON.stringify(result, null, 2)
          }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Shop2Filter, Shop2GTD } from '~/composables/shop2'
import { Shop12Filter, Shop12GTD } from '~/composables/shop12'

const route = useRoute()
const shop = computed(() => route.params.shop as string)

const filter = ref({
  month: '',
  pagination: {
    pageSize: 10,
    currentPage: 1
  }
})

const result = ref<any>(null)
const loading = ref(false)
const error = ref<string | null>(null)

// Set current month as default
onMounted(() => {
  const now = new Date()
  filter.value.month = now.toISOString().slice(0, 7)
})

const openDatePicker = () => {
  const input = document.querySelector(
    'input[type="month"]'
  ) as HTMLInputElement
  if (input) {
    input.showPicker()
  }
}

const fetchData = async () => {
  loading.value = true
  error.value = null

  try {
    const month = filter.value.month
    if (!month) return

    const startDate = new Date(month)
    const endDate = new Date(
      startDate.getFullYear(),
      startDate.getMonth() + 1,
      0
    )

    if (shop.value === 'shop2') {
      const shop2Filter = new Shop2Filter(
        startDate,
        endDate,
        filter.value.pagination
      )
      result.value = await Shop2GTD.findWithFilter(shop2Filter)
    } else if (shop.value === 'shop12') {
      const shop12Filter = new Shop12Filter(
        startDate,
        endDate,
        filter.value.pagination
      )
      result.value = await Shop12GTD.findWithFilter(shop12Filter)
    }
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Произошла ошибка'
  } finally {
    loading.value = false
  }
}
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
</style>
