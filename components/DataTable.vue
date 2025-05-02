<template>
  <div class="space-y-4">
    <!-- Верхняя панель управления -->
    <div class="flex justify-between items-center">
      <div class="flex space-x-2">
        <button
          v-if="!isEditing"
          @click="startEditing"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Редактировать
        </button>
        <button
          v-else
          @click="saveChanges"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Сохранить
        </button>
        <button
          v-if="isEditing"
          @click="cancelEditing"
          class="inline-flex items-center px-3 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Отмена
        </button>
      </div>
      <div v-if="isEditing" class="flex space-x-2">
        <button
          @click="addRow"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Добавить
        </button>
        <button
          v-if="filteredItems.length > 0"
          @click="copySelected"
          :disabled="!hasSelected"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 disabled:opacity-50"
        >
          Копировать
        </button>
        <button
          v-if="filteredItems.length > 0"
          @click="deleteSelected"
          :disabled="!hasSelected"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
        >
          Удалить
        </button>
      </div>
    </div>

    <!-- Таблица -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-if="isEditing"
              scope="col"
              class="relative w-12 px-6 sm:w-16 sm:px-8"
            >
              <input
                v-if="filteredItems.length > 0"
                type="checkbox"
                class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                :checked="isAllSelected"
                @change="toggleSelectAll"
              />
            </th>
            <th
              v-for="column in columns"
              :key="column.key"
              scope="col"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ column.label }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-if="filteredItems.length === 0">
            <td
              :colspan="isEditing ? columns.length + 1 : columns.length"
              class="px-6 py-4 text-center text-sm text-gray-500"
            >
              {{
                isEditing
                  ? 'Нажмите "Добавить" для создания новой записи'
                  : 'Нет данных для отображения'
              }}
            </td>
          </tr>
          <tr
            v-for="(item, index) in paginatedItems"
            v-else
            :key="item.id || index"
            :class="{
              'bg-gray-50': isEditing && selectedItems.includes(item)
            }"
          >
            <td
              v-if="isEditing"
              class="relative w-12 px-6 sm:w-16 sm:px-8"
            >
              <input
                type="checkbox"
                class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                :checked="selectedItems.includes(item)"
                @change="toggleSelectItem(item)"
              />
            </td>
            <td
              v-for="column in columns"
              :key="column.key"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            >
              <template v-if="isEditing">
                <input
                  v-if="column.key.includes('Date')"
                  type="date"
                  v-model="item[column.key]"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <input
                  v-else-if="
                    column.key === 'weight' ||
                    column.key === 'tio2Analysis' ||
                    column.key === 'h2oAnalysis'
                  "
                  type="number"
                  step="0.01"
                  v-model.number="item[column.key]"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <input
                  v-else
                  type="text"
                  v-model="item[column.key]"
                  class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </template>
              <template v-else>
                {{ item[column.key] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Нижняя панель управления -->
    <div class="flex justify-between items-center">
      <div class="flex space-x-2">
        <button
          v-if="isEditing"
          @click="saveChanges"
          class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
        >
          Сохранить
        </button>
      </div>
      <div
        v-if="filteredItems.length > 0"
        class="flex items-center space-x-2"
      >
        <span class="text-sm text-gray-700">
          Показано {{ paginatedItems.length }} из
          {{ filteredItems.length }}
        </span>
        <select
          v-model="itemsPerPage"
          class="block w-20 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        >
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <div class="flex space-x-1">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Назад
          </button>
          <span class="px-3 py-1 text-sm text-gray-700">
            Страница {{ currentPage }} из {{ totalPages }}
          </span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-3 py-1 rounded-md border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            Вперед
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useShopStore } from '~/stores/shop'
import { shop2Config } from '~/composable/shop2'
import { shop12Config } from '~/composable/shop12'
import type { DataChanges } from '~/types'

interface Column {
  key: string
  label: string
  isCalculated?: boolean
}

const shopStore = useShopStore()
const isEditing = ref(false)
const selectedItems = ref<any[]>([])
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Временное хранилище для редактирования
const tempItems = ref<any[]>([])

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

const columns = computed(() => {
  if (!config.value) return []

  // В режиме редактирования скрываем вычисляемые поля
  if (isEditing.value) {
    return config.value.columns.filter(column => !column.isCalculated)
  }

  return config.value.columns
})

const filteredItems = computed(() =>
  isEditing.value ? tempItems.value : shopStore.filteredItems
)

// Пагинация
const totalPages = computed(() =>
  Math.ceil(filteredItems.value.length / itemsPerPage.value)
)
const paginatedItems = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredItems.value.slice(start, end)
})

// Выбор элементов
const isAllSelected = computed(() => {
  return (
    paginatedItems.value.length > 0 &&
    paginatedItems.value.every(item => selectedItems.value.includes(item))
  )
})

const hasSelected = computed(() => selectedItems.value.length > 0)

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedItems.value = selectedItems.value.filter(
      item => !paginatedItems.value.includes(item)
    )
  } else {
    selectedItems.value = [
      ...new Set([...selectedItems.value, ...paginatedItems.value])
    ]
  }
}

const toggleSelectItem = (item: any) => {
  const index = selectedItems.value.indexOf(item)
  if (index === -1) {
    selectedItems.value.push(item)
  } else {
    selectedItems.value.splice(index, 1)
  }
}

// Редактирование
const startEditing = () => {
  // Сохраняем копию данных для редактирования
  tempItems.value = JSON.parse(JSON.stringify(shopStore.filteredItems))
  isEditing.value = true
}

const cancelEditing = () => {
  // Откатываем изменения
  tempItems.value = []
  isEditing.value = false
  selectedItems.value = []
}

const validateFields = (item: any) => {
  return columns.value.every(column => {
    const value = item[column.key]
    if (value === undefined || value === null) return false

    // Удаляем пробелы и проверяем на пустоту
    const trimmedValue = String(value).trim()
    if (trimmedValue === '') return false

    // Для числовых полей проверяем, что значение является числом
    if (
      column.key === 'weight' ||
      column.key === 'tio2Analysis' ||
      column.key === 'h2oAnalysis'
    ) {
      return !isNaN(Number(trimmedValue))
    }

    return true
  })
}

const saveChanges = async () => {
  try {
    // Проверяем все строки на валидность
    const invalidItems = tempItems.value.filter(
      item => !validateFields(item)
    )
    if (invalidItems.length > 0) {
      alert('Пожалуйста, заполните все поля корректно')
      return
    }

    // Очищаем пробелы в текстовых полях
    tempItems.value = tempItems.value.map(item => {
      const cleanedItem = { ...item }
      columns.value.forEach(column => {
        if (typeof cleanedItem[column.key] === 'string') {
          cleanedItem[column.key] = cleanedItem[column.key].trim()
        }
      })
      return cleanedItem
    })

    // Определяем изменения
    const changes: DataChanges = {
      deleted: [],
      edited: [],
      added: []
    }

    // Сравниваем с исходными данными
    const originalItems = shopStore.filteredItems
    const originalIds = new Set(originalItems.map(item => item.id))

    tempItems.value.forEach(item => {
      if (!item.id) {
        // Новый элемент
        changes.added.push(item)
      } else if (originalIds.has(item.id)) {
        // Измененный элемент
        const originalItem = originalItems.find(
          original => original.id === item.id
        )
        if (JSON.stringify(originalItem) !== JSON.stringify(item)) {
          changes.edited.push(item)
        }
      }
    })

    // Определяем удаленные элементы
    const tempIds = new Set(tempItems.value.map(item => item.id))
    originalItems.forEach(item => {
      if (!tempIds.has(item.id)) {
        changes.deleted.push(item.id!)
      }
    })

    // Сохраняем изменения
    await shopStore.saveChanges(changes)

    // Выходим из режима редактирования
    isEditing.value = false
    selectedItems.value = []
    tempItems.value = []
  } catch (error) {
    console.error('Error saving changes:', error)
    alert('Ошибка при сохранении изменений')
  }
}

const addRow = () => {
  const newItem: any = {}
  columns.value.forEach(column => {
    // Устанавливаем начальные значения в зависимости от типа поля
    if (column.key.includes('Date')) {
      newItem[column.key] = new Date().toISOString().split('T')[0] // Текущая дата
    } else if (
      column.key === 'weight' ||
      column.key === 'tio2Analysis' ||
      column.key === 'h2oAnalysis'
    ) {
      newItem[column.key] = '0' // Числовые поля начинаем с 0
    } else {
      newItem[column.key] = '' // Текстовые поля пустые
    }
  })
  tempItems.value.push(newItem)
}

const copySelected = () => {
  selectedItems.value.forEach(item => {
    const newItem = { ...item, id: undefined }
    tempItems.value.push(newItem)
  })
}

const deleteSelected = () => {
  selectedItems.value.forEach(item => {
    const index = tempItems.value.indexOf(item)
    if (index !== -1) {
      tempItems.value.splice(index, 1)
    }
  })
  selectedItems.value = []
}

// Сброс страницы при изменении фильтров
watch(
  () => shopStore.filters,
  () => {
    currentPage.value = 1
  },
  { deep: true }
)
</script>

<style>
/* Скрываем спиннеры для числовых полей в Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}

/* Скрываем спиннеры для числовых полей в других браузерах */
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
