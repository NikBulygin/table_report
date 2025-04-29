<template>
  <div>
    <div class="flex justify-between items-center mb-2">
      <div>
        <button
          @click="addItem"
          class="mr-2 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Добавить
        </button>
        <button
          @click="toggleEditMode"
          class="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          {{ isEditMode ? 'Сохранить' : 'Редактировать' }}
        </button>
      </div>
      <button
        @click="sendToServer"
        class="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600"
      >
        Отправить на сервер
      </button>
    </div>
    <table class="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th class="p-2 border-b">
            <input
              type="checkbox"
              @change="toggleAll"
              :checked="allSelected"
            />
          </th>
          <th v-for="col in columns" :key="col.key" class="p-2 border-b">
            {{ col.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in pagedItems"
          :key="item.id"
          :class="{ 'bg-yellow-50': isEditMode && isEdited(item) }"
        >
          <td class="p-2 border-b">
            <input
              type="checkbox"
              :value="item.id"
              v-model="selectedIds"
            />
          </td>
          <td v-for="col in columns" :key="col.key" class="p-2 border-b">
            <template v-if="isEditMode">
              <input
                v-model="editBuffer[item.id][col.key]"
                :type="col.type"
                class="border rounded px-1 py-0.5 w-full"
                @input="onEdit(item.id)"
              />
            </template>
            <template v-else>
              {{ item[col.key] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="flex justify-between items-center mt-4">
      <div>
        <button
          @click="deleteSelected"
          class="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 mr-2"
          :disabled="!selectedIds.length"
        >
          Удалить
        </button>
        <button
          @click="copySelected"
          class="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
          :disabled="!selectedIds.length"
        >
          Копировать
        </button>
      </div>
      <div class="flex items-center space-x-2">
        <button @click="prevPage" :disabled="pagination.currentPage === 1">
          &lt;
        </button>
        <span
          >Страница {{ pagination.currentPage }} из
          {{ pagination.totalPages }}</span
        >
        <button
          @click="nextPage"
          :disabled="pagination.currentPage === pagination.totalPages"
        >
          &gt;
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useShopDataStore } from '~/stores/shopData'
import { storeToRefs } from 'pinia'

const store = useShopDataStore()
const { items, pagination, itemsDelete, itemsEdit } = storeToRefs(store)

const isEditMode = ref(false)
const selectedIds = ref<number[]>([])
const editBuffer = ref<{ [id: number]: any }>({})

// Определяем колонки динамически по первому элементу
const columns = computed(() => {
  const first = items.value[0]
  if (!first) return []
  return Object.keys(first)
    .filter(key => key !== 'id')
    .map(key => ({
      key,
      label: key,
      type:
        typeof first[key] === 'number'
          ? 'number'
          : first[key] instanceof Date
          ? 'date'
          : 'text'
    }))
})

const pagedItems = computed(() => items.value)
const allSelected = computed(
  () =>
    selectedIds.value.length === items.value.length &&
    items.value.length > 0
)

function toggleAll(e: Event) {
  if ((e.target as HTMLInputElement).checked) {
    selectedIds.value = items.value.map(i => i.id)
  } else {
    selectedIds.value = []
  }
}

function addItem() {
  const newId =
    Math.max(
      0,
      ...items.value.map(i => i.id || 0),
      ...itemsEdit.value.map(i => i.id || 0)
    ) + 1
  const empty: any = { id: newId }
  columns.value.forEach(col => {
    empty[col.key] = col.type === 'number' ? 0 : ''
  })
  items.value.unshift(empty)
  editBuffer.value[newId] = { ...empty }
  isEditMode.value = true
}

function toggleEditMode() {
  if (!isEditMode.value) {
    // Входим в режим редактирования
    isEditMode.value = true
    // Копируем все значения в editBuffer
    items.value.forEach(item => {
      editBuffer.value[item.id] = { ...item }
    })
  } else {
    // Сохраняем изменения
    for (const id in editBuffer.value) {
      const orig = items.value.find(i => i.id === +id)
      if (
        orig &&
        JSON.stringify(orig) !== JSON.stringify(editBuffer.value[id])
      ) {
        store.editItem({ ...editBuffer.value[id] })
      }
    }
    isEditMode.value = false
    editBuffer.value = {}
  }
}

function isEdited(item: any) {
  return !!itemsEdit.value.find(i => i.id === item.id)
}

function onEdit(id: number) {
  // При любом изменении сразу помещаем в editItem
  store.editItem({ ...editBuffer.value[id] })
}

function deleteSelected() {
  selectedIds.value.forEach(id => store.deleteItem(id))
  selectedIds.value = []
}

function copySelected() {
  selectedIds.value.forEach(id => {
    const orig = items.value.find(i => i.id === id)
    if (orig) {
      const copy = {
        ...orig,
        id:
          Math.max(
            0,
            ...items.value.map(i => i.id),
            ...itemsEdit.value.map(i => i.id)
          ) + 1
      }
      items.value.unshift(copy)
      store.editItem(copy)
    }
  })
  selectedIds.value = []
}

function prevPage() {
  if (pagination.value.currentPage > 1) {
    store.setPage(pagination.value.currentPage - 1)
    store.fetchData()
  }
}
function nextPage() {
  if (pagination.value.currentPage < pagination.value.totalPages) {
    store.setPage(pagination.value.currentPage + 1)
    store.fetchData()
  }
}

function sendToServer() {
  // Просто выводим в консоль
  console.log('Удалённые:', itemsDelete.value)
  console.log('Изменённые:', itemsEdit.value)
}
</script>
