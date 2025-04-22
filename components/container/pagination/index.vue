<template>
  <div class="pagination flex items-center gap-1">
    <div class="flex items-center gap-4">
      <div
        class="text-sm text-text-secondary dark:text-dark-text-secondary high-contrast:text-high-contrast-text-secondary high-contrast.dark:text-high-contrast-dark-text-secondary"
      >
        {{ (currentPage - 1) * itemsPerPage + 1 }}
        - {{ Math.min(currentPage * itemsPerPage, totalItems) }} of
        {{ totalItems }}
      </div>

      <div class="flex items-center gap-1">
        <!-- First page -->
        <button
          class="min-w-[32px] min-h-[32px] p-1.5 bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary border border-border dark:border-dark-border high-contrast:border-high-contrast-border rounded hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-high-contrast-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="currentPage === 1"
          @click="$emit('update:page', 1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
          </svg>
        </button>

        <!-- Previous page -->
        <button
          class="min-w-[32px] min-h-[32px] p-1.5 bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary border border-border dark:border-dark-border high-contrast:border-high-contrast-border rounded hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-high-contrast-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="currentPage === 1"
          @click="$emit('update:page', currentPage - 1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <!-- Page numbers -->
        <div class="flex items-center gap-1">
          <template v-for="pageNum in displayedPages" :key="pageNum">
            <button
              v-if="pageNum !== '...'"
              class="min-w-[32px] min-h-[32px] p-1.5 bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary border border-border dark:border-dark-border high-contrast:border-high-contrast-border rounded hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-high-contrast-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              :class="
                pageNum === currentPage
                  ? 'bg-primary dark:bg-dark-primary high-contrast:bg-high-contrast-primary dark:text-white high-contrast:text-black border-primary dark:border-dark-primary high-contrast:border-high-contrast-primary'
                  : ''
              "
              @click="$emit('update:page', pageNum)"
            >
              {{ pageNum }}
            </button>
            <span
              v-else
              class="px-0.5 text-sm text-text-secondary dark:text-dark-text-secondary high-contrast:text-high-contrast-text-secondary"
            >
              {{ pageNum }}
            </span>
          </template>
        </div>

        <!-- Next page -->
        <button
          class="min-w-[32px] min-h-[32px] p-1.5 bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary border border-border dark:border-dark-border high-contrast:border-high-contrast-border rounded hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-high-contrast-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="currentPage === totalPages"
          @click="$emit('update:page', currentPage + 1)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        <!-- Last page -->
        <button
          class="min-w-[32px] min-h-[32px] p-1.5 bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary border border-border dark:border-dark-border high-contrast:border-high-contrast-border rounded hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-high-contrast-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="currentPage === totalPages"
          @click="$emit('update:page', totalPages)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="w-4 h-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
          >
            <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  currentPage: number
  totalPages: number
  totalItems: number
  itemsPerPage: number
}

const props = defineProps<Props>()

const { currentPage, totalPages } = toRefs(props)

const displayedPages = computed(() => {
  const current = currentPage.value
  const total = totalPages.value
  const delta = 1 // Показывать по 1 странице с каждой стороны

  const range = []
  const rangeWithDots = []
  let l

  range.push(1)

  for (let i = current - delta; i <= current + delta; i++) {
    if (i < total && i > 1) {
      range.push(i)
    }
  }

  if (total !== 1) {
    range.push(total)
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1)
      } else if (i - l !== 1) {
        rangeWithDots.push('...')
      }
    }
    rangeWithDots.push(i)
    l = i
  }

  return rangeWithDots
})
</script>
