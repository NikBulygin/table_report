<template>
  <div class="space-y-6">
    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Date Range Filter
          </h3>
          <p class="mt-1 text-sm text-gray-500">
            Select date range to filter data
          </p>
        </div>
        <div class="mt-5 md:mt-0 md:col-span-2">
          <form class="space-y-6" @submit.prevent="fetchData">
            <div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div class="sm:col-span-3">
                <label
                  for="startDate"
                  class="block text-sm font-medium text-gray-700"
                  >Start Date</label
                >
                <div class="mt-1">
                  <input
                    type="date"
                    v-model="filter.startDate"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div class="sm:col-span-3">
                <label
                  for="endDate"
                  class="block text-sm font-medium text-gray-700"
                  >End Date</label
                >
                <div class="mt-1">
                  <input
                    type="date"
                    v-model="filter.endDate"
                    class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>

            <div class="flex justify-end">
              <button
                type="submit"
                class="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Apply Filter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <div class="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
      <div class="space-y-4">
        <h3 class="text-lg font-medium leading-6 text-gray-900">
          Results
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
            Total records: {{ result?.pagination?.total || 0 }}
          </div>
          <div class="text-sm text-gray-500">
            Current page: {{ result?.pagination?.currentPage || 0 }} of
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
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { Shop2Filter, Shop2GTD } from '~/composables/shop2'
import { Shop12Filter, Shop12GTD } from '~/composables/shop12'

const route = useRoute()
const shop = computed(() => route.params.shop as string)

const filter = ref({
  startDate: '',
  endDate: '',
  pagination: {
    pageSize: 10,
    currentPage: 1
  }
})

const result = ref<any>(null)
const loading = ref(false)
const error = ref<string | null>(null)

const fetchData = async () => {
  loading.value = true
  error.value = null

  try {
    const startDate = filter.value.startDate
      ? new Date(filter.value.startDate)
      : undefined
    const endDate = filter.value.endDate
      ? new Date(filter.value.endDate)
      : undefined

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
    error.value = e instanceof Error ? e.message : 'An error occurred'
  } finally {
    loading.value = false
  }
}
</script>
