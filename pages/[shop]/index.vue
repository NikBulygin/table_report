<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">
        {{ shopStore.shopName === 'shop2' ? 'Шлак' : 'Ильменит' }}
      </h1>
      <div v-if="isLoading" class="flex items-center">
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-500"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span class="text-gray-500">Загрузка данных...</span>
      </div>
    </div>

    <Filter />
    <Summary />

    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Данные</h3>
        <div class="mt-4">
          <DataTable v-if="!isLoading && shopStore.items.length >= 0" />
          <div v-else class="text-center py-4">
            <p class="text-gray-500">Загрузка данных...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useShopStore } from '~/stores/shop'

const route = useRoute()
const shopStore = useShopStore()
const isLoading = ref(false)

// Устанавливаем текущий магазин при загрузке страницы
onMounted(() => {
  const shop = route.params.shop as string
  shopStore.setShopName(shop)
  loadData()
})

// Загрузка данных при изменении фильтров
watch(
  () => shopStore.filters,
  () => {
    loadData()
  },
  { deep: true }
)

// Функция загрузки данных
const loadData = async () => {
  try {
    isLoading.value = true
    await shopStore.fetchItems()
  } catch (error) {
    console.error('Error loading data:', error)
  } finally {
    isLoading.value = false
  }
}
</script>
