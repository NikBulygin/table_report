<template>
  <div
    class="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6"
  >
    <div class="flex flex-1 justify-between sm:hidden">
      <button
        @click="goToPage(currentPage - 1)"
        :disabled="currentPage === 1"
        class="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Назад
      </button>
      <button
        @click="goToPage(currentPage + 1)"
        :disabled="currentPage === totalPages"
        class="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
      >
        Вперед
      </button>
    </div>
    <div
      class="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between"
    >
      <div>
        <p class="text-sm text-gray-700">
          Показано
          <span class="font-medium">{{
            (currentPage - 1) * pageSize + 1
          }}</span>
          -
          <span class="font-medium">{{
            Math.min(currentPage * pageSize, total)
          }}</span>
          из
          <span class="font-medium">{{ total }}</span>
          результатов
        </p>
      </div>
      <div>
        <nav
          class="isolate inline-flex -space-x-px rounded-md shadow-sm"
          aria-label="Pagination"
        >
          <button
            @click="goToPage(currentPage - 1)"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
          >
            <span class="sr-only">Предыдущая</span>
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
          <template v-for="page in visiblePages" :key="page">
            <button
              v-if="page === '...'"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 ring-1 ring-inset ring-gray-300 focus:outline-offset-0"
              disabled
            >
              ...
            </button>
            <button
              v-else
              @click="goToPage(page)"
              class="relative inline-flex items-center px-4 py-2 text-sm font-semibold"
              :class="{
                'z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600':
                  page === currentPage,
                'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0':
                  page !== currentPage
              }"
            >
              {{ page }}
            </button>
          </template>
          <button
            @click="goToPage(currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            :class="{
              'opacity-50 cursor-not-allowed': currentPage === totalPages
            }"
          >
            <span class="sr-only">Следующая</span>
            <svg
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                clip-rule="evenodd"
              />
            </svg>
          </button>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  currentPage: number
  totalPages: number
  total: number
  pageSize: number
}>()

const emit = defineEmits<{
  (e: 'pageChange', page: number): void
}>()

const visiblePages = computed(() => {
  const pages: (number | string)[] = []
  const maxVisiblePages = 5

  if (props.totalPages <= maxVisiblePages) {
    for (let i = 1; i <= props.totalPages; i++) {
      pages.push(i)
    }
  } else {
    pages.push(1)
    if (props.currentPage > 3) {
      pages.push('...')
    }
    for (
      let i = Math.max(2, props.currentPage - 1);
      i <= Math.min(props.totalPages - 1, props.currentPage + 1);
      i++
    ) {
      pages.push(i)
    }
    if (props.currentPage < props.totalPages - 2) {
      pages.push('...')
    }
    pages.push(props.totalPages)
  }

  return pages
})

const goToPage = (page: number) => {
  if (page >= 1 && page <= props.totalPages) {
    emit('pageChange', page)
  }
}
</script>
