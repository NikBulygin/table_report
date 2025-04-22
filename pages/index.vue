<template>
  <div class="p-4">
    <h1 class="text-2xl mb-4">Пример таблицы</h1>
    <container-table
      :meta="tableMeta"
      :data="tableData"
      :pagination="pagination"
      :sorted="sortState"
      @sort="handleSort"
      @save="handleSave"
      @delete="handleDelete"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import ContainerTable from '~/composables/components/container/table.vue'

// Метаданные таблицы
const tableMeta = {
  columns: [
    {
      key: 'a',
      title: 'A',
      type: 'number',
      validation: {
        required: true,
        min: 0,
        max: 100
      }
    },
    {
      key: 'b',
      title: 'B',
      type: 'number',
      validation: {
        required: true,
        min: 0,
        max: 100
      }
    },
    {
      key: 'sum',
      title: 'A + B',
      type: 'formula',
      formula: (row: any) => (row.a || 0) + (row.b || 0)
    },
    {
      key: 'date',
      title: 'Дата',
      type: 'date',
      validation: {
        required: true
      }
    },
    {
      key: 'text',
      title: 'Текст',
      type: 'text',
      validation: {
        required: true,
        minLength: 3,
        maxLength: 50
      }
    }
  ]
}

// Данные таблицы
const tableData = ref([
  {
    a: 5,
    b: 3,
    date: new Date('2024-03-20'),
    text: 'Пример 1'
  },
  {
    a: 10,
    b: 7,
    date: new Date('2024-03-21'),
    text: 'Пример 2'
  },
  {
    a: 15,
    b: 12,
    date: new Date('2024-03-22'),
    text: 'Пример 3'
  }
])

// Пагинация
const pagination = ref({
  currentPage: 1,
  totalItems: 3,
  itemsPerPage: 10
})

// Состояние сортировки
const sortState = ref({
  key: 'a',
  direction: 'asc' as 'asc' | 'desc'
})

// Обработчики событий
const handleSort = (sort: { key: string; direction: 'asc' | 'desc' }) => {
  sortState.value = sort
  // Здесь можно добавить логику сортировки
}

const handleSave = (changes: { edited: any; new: any[] }) => {
  console.log('Сохранено:', changes)
  // Здесь можно добавить логику сохранения
}

const handleDelete = (indices: number[]) => {
  console.log('Удалено:', indices)
  // Здесь можно добавить логику удаления
}
</script>
