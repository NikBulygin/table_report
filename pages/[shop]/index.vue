<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">
        {{ shopStore.shopName === 'shop2' ? 'Шлак' : 'Ильменит' }}
      </h1>
    </div>

    <Filter />
    <Summary />

    <div class="bg-white shadow rounded-lg">
      <div class="px-4 py-5 sm:p-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Данные</h3>
        <div class="mt-4">
          <!-- Здесь будет таблица с данными -->
          <p class="text-gray-500">Данные загружаются...</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useShopStore } from '~/stores/shop'

const route = useRoute()
const shopStore = useShopStore()

// Устанавливаем текущий магазин при загрузке страницы
onMounted(() => {
  const shop = route.params.shop as string
  shopStore.setShopName(shop)
  shopStore.fetchItems()
})
</script>
