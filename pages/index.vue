<template>
  <div class="w-1/2 bg-red-500 break-all whitespace-pre-wrap">
    test testtest testtest testtest testtest testtest testtest testtest
    testtest testtest testtest testtest testtest testtest testtest testtest
    testtest testtest testtest testtest testtest testtest testtest testtest
    testtest testtest testtest test
  </div>
  >
  <div v-if="currentShop" class="space-y-4">
    <!-- Filters -->
    <div
      class="bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface p-4 rounded-lg border border-border dark:border-dark-border high-contrast:border-high-contrast-border"
    >
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <!-- Date range -->
        <div>
          <InputDate
            v-model="filters.dateRange"
            label="Период"
            format="dd-MM-yyyy"
            :range="true"
            :required="true"
          />
        </div>
        <!-- Code number -->
        <div>
          <InputText
            v-model="filters.codeNumber"
            label="Код номер"
            placeholder="Введите код"
            :required="true"
            regex="^[а-яА-Я0-9-]+$"
            error-message="Код может содержать только буквы, цифры и дефис"
          />
        </div>
        <!-- Apply filters button -->
        <div class="flex items-end">
          <button
            @click="loadData"
            class="px-4 py-2 rounded hover:bg-primary-dark dark:hover:bg-dark-primary-dark high-contrast:hover:bg-high-contrast-primary-dark transition-colors"
          >
            Применить
          </button>
        </div>
      </div>
    </div>

    <!-- Table -->
    <container-table
      v-if="tableMeta"
      :meta="{ columns: tableMeta }"
      :data="tableData"
      :pagination="pagination"
      :sorted="sortState"
      @sort="handleSort"
      @save="handleSave"
      @delete="handleDelete"
      @update:page="handlePageChange"
      @update:itemsPerPage="handleItemsPerPageChange"
    />
  </div>
  <div
    v-else
    class="text-center py-8 text-text-secondary dark:text-dark-text-secondary high-contrast:text-high-contrast-text-secondary"
  >
    Выберите цех для просмотра данных
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import ContainerTable from '~/composables/components/container/table.vue'
import InputDate from '~/components/input/datepicker.vue'
import InputText from '~/components/input/text.vue'

// Get shop from query parameters
const route = useRoute()
const currentShop = ref<string | null>(null)

// Initialize date range for current month
const getCurrentMonthRange = () => {
  const now = new Date()
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0)
  return [startOfMonth, endOfMonth] as [Date, Date]
}

// Filter state
const filters = ref({
  dateRange: getCurrentMonthRange(),
  codeNumber: ''
})

// Table state
const tableData = ref<any[]>([])
const tableMeta = ref<any[]>([])
const pagination = ref({
  currentPage: 1,
  totalItems: 0,
  itemsPerPage: 10
})
const sortState = ref({
  key: 'date', // Sort by date by default
  direction: 'desc' as 'asc' | 'desc' // Most recent first
})

// Load metadata
const loadMetadata = async () => {
  if (!currentShop.value) return

  try {
    const response = await $fetch(`/api/shop${currentShop.value}`, {
      method: 'GET',
      params: {
        meta: true
      }
    })
    tableMeta.value = response.meta.columns
  } catch (error) {
    console.error('Error loading metadata:', error)
  }
}

// Load data
const loadData = async () => {
  if (!currentShop.value) return

  try {
    const response = await $fetch(`/api/shop${currentShop.value}`, {
      method: 'GET',
      params: {
        page: pagination.value.currentPage,
        pageSize: pagination.value.itemsPerPage,
        sortField: sortState.value.key,
        sortOrder: sortState.value.direction,
        dateFrom: filters.value.dateRange?.[0]?.toISOString(),
        dateTo: filters.value.dateRange?.[1]?.toISOString(),
        codeNumber: filters.value.codeNumber
      }
    })
    tableData.value = response.data
    pagination.value.totalItems = response.total
  } catch (error) {
    console.error('Error loading data:', error)
  }
}

// Event handlers
const handleSort = async (sort: {
  key: string
  direction: 'asc' | 'desc'
}) => {
  sortState.value = sort
  await loadData()
}

const handleSave = async (changes: {
  edited: { [key: number]: any }
  new: any[]
}) => {
  if (!currentShop.value) return

  try {
    await $fetch(`/api/shop${currentShop.value}`, {
      method: 'POST',
      body: changes
    })
    await loadData()
  } catch (error) {
    console.error('Error saving data:', error)
  }
}

const handleDelete = async (indices: number[]) => {
  if (!currentShop.value) return

  try {
    const idsToDelete = indices.map(index => tableData.value[index].id)
    await $fetch(`/api/shop${currentShop.value}`, {
      method: 'DELETE',
      body: { ids: idsToDelete }
    })
    await loadData()
  } catch (error) {
    console.error('Error deleting data:', error)
  }
}

const handlePageChange = async (page: number) => {
  pagination.value.currentPage = page
  await loadData()
}

const handleItemsPerPageChange = async (pageSize: number) => {
  pagination.value.itemsPerPage = pageSize
  pagination.value.currentPage = 1
  await loadData()
}

// Watch for shop changes in URL
watch(
  () => route.query.shop,
  async newShop => {
    currentShop.value = (newShop as string) || null
    if (currentShop.value) {
      await loadMetadata()
      await loadData()
    } else {
      tableData.value = []
      tableMeta.value = []
    }
  },
  { immediate: true }
)
</script>
