<script setup lang="ts">
import { ref, type PropType } from 'vue'
import type { NavigationItem } from '~/types'

const props = defineProps({
  items: {
    type: Array as PropType<NavigationItem[]>,
    required: true
  }
})

const route = useRoute()

// Для отслеживания открытых подменю
const openSubmenus = ref<Set<string>>(new Set())

// Проверка активного маршрута
const isActiveRoute = (url: string) => {
  return route.path === url
}

// Проверка, содержит ли элемент активный маршрут
const hasActiveChild = (item: NavigationItem): boolean => {
  if (item.url && isActiveRoute(item.url)) return true
  if (!item.children) return false
  return item.children.some(child => hasActiveChild(child))
}

const toggleSubmenu = (title: string) => {
  // Если подменю уже открыто, просто закрываем его
  if (openSubmenus.value.has(title)) {
    openSubmenus.value.delete(title)
    return
  }

  // Находим корневой элемент
  const rootItem = props.items.find(item => item.title === title)
  if (rootItem) {
    // Если это корневой элемент, закрываем все остальные корневые элементы
    const otherRootTitles = props.items
      .map(item => item.title)
      .filter(t => t !== title)
    otherRootTitles.forEach(t => openSubmenus.value.delete(t))
  }

  // Открываем выбранное подменю
  openSubmenus.value.add(title)
}
</script>

<template>
  <nav
    class="w-full bg-background dark:bg-dark-background high-contrast:bg-high-contrast-background border-r border-border dark:border-dark-border high-contrast:border-high-contrast-border"
  >
    <div class="p-4">
      <!-- Дерево навигации -->
      <div
        class="flex flex-row flex-wrap items-center justify-around gap-4"
      >
        <template v-for="item in items" :key="item.title">
          <!-- Корневой элемент -->
          <div class="group w-full sm:w-auto min-w-[200px]">
            <div
              class="flex items-center w-full py-2 px-3 text-left transition-all duration-200 rounded-md group hover:bg-surface hover:text-primary dark:hover:bg-dark-surface dark:hover:text-dark-primary high-contrast:hover:bg-high-contrast-surface high-contrast:hover:text-high-contrast-primary"
              :class="[
                openSubmenus.has(item.title) && item.children?.length
                  ? 'bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-primary dark:text-dark-primary high-contrast:text-high-contrast-primary font-medium'
                  : '',
                hasActiveChild(item)
                  ? 'bg-success/10 text-success dark:bg-dark-success/10 dark:text-dark-success high-contrast:bg-high-contrast-success/10 high-contrast:text-high-contrast-success'
                  : ''
              ]"
            >
              <!-- Иконка раскрытия для элементов с дочерними -->
              <button
                v-if="item.children?.length"
                @click="toggleSubmenu(item.title)"
                class="flex items-center justify-between w-full group"
              >
                <span class="flex items-center">
                  <svg
                    class="w-4 h-4 mr-2 transition-transform duration-200"
                    :class="{ 'rotate-90': openSubmenus.has(item.title) }"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                  {{ item.title }}
                </span>
                <!-- Индикатор количества дочерних элементов -->
                <span
                  class="px-2 py-0.5 text-xs rounded-full bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface"
                >
                  {{ item.children.length }}
                </span>
              </button>
              <!-- Ссылка для элементов без дочерних -->
              <NuxtLink
                v-else
                :to="item.url"
                class="flex items-center w-full"
                :class="{
                  'text-success dark:text-dark-success high-contrast:text-high-contrast-success':
                    isActiveRoute(item.url)
                }"
              >
                {{ item.title }}
              </NuxtLink>
            </div>

            <!-- Дочерние элементы -->
            <div
              v-if="item.children?.length && openSubmenus.has(item.title)"
              class="absolute ml-4 mt-1 border-l-2 border-border dark:border-dark-border high-contrast:border-high-contrast-border"
            >
              <template v-for="child in item.children" :key="child.title">
                <!-- Дочерний элемент -->
                <div class="group">
                  <div
                    class="flex items-center w-full py-2 px-3 text-left transition-all duration-200 rounded-md group hover:bg-surface hover:text-primary dark:hover:bg-dark-surface dark:hover:text-dark-primary high-contrast:hover:bg-high-contrast-surface high-contrast:hover:text-high-contrast-primary"
                    :class="[
                      openSubmenus.has(child.title) &&
                      child.children?.length
                        ? 'bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-primary dark:text-dark-primary high-contrast:text-high-contrast-primary font-medium'
                        : '',
                      hasActiveChild(child)
                        ? 'bg-success/10 text-success dark:bg-dark-success/10 dark:text-dark-success high-contrast:bg-high-contrast-success/10 high-contrast:text-high-contrast-success'
                        : ''
                    ]"
                  >
                    <!-- Иконка раскрытия для дочерних с вложенными -->
                    <button
                      v-if="child.children?.length"
                      @click="toggleSubmenu(child.title)"
                      class="flex items-center justify-between w-full group"
                    >
                      <span class="flex items-center">
                        <svg
                          class="w-4 h-4 mr-2 transition-transform duration-200"
                          :class="{
                            'rotate-90': openSubmenus.has(child.title)
                          }"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                        {{ child.title }}
                      </span>
                      <!-- Индикатор количества вложенных элементов -->
                      <span
                        class="px-2 py-0.5 text-xs rounded-full bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface"
                      >
                        {{ child.children.length }}
                      </span>
                    </button>
                    <!-- Ссылка для дочерних без вложенных -->
                    <NuxtLink
                      v-else
                      :to="child.url"
                      class="flex items-center w-full"
                      :class="{
                        'text-success dark:text-dark-success high-contrast:text-high-contrast-success':
                          isActiveRoute(child.url)
                      }"
                    >
                      {{ child.title }}
                    </NuxtLink>
                  </div>

                  <!-- Вложенные элементы (третий уровень) -->
                  <div
                    v-if="
                      child.children?.length &&
                      openSubmenus.has(child.title)
                    "
                    class="ml-4 mt-1 border-l-2 border-border dark:border-dark-border high-contrast:border-high-contrast-border"
                  >
                    <template
                      v-for="grandChild in child.children"
                      :key="grandChild.title"
                    >
                      <div class="py-2 px-3">
                        <NuxtLink
                          :to="grandChild.url"
                          class="flex items-center w-full transition-all duration-200 hover:bg-surface hover:text-primary dark:hover:bg-dark-surface dark:hover:text-dark-primary high-contrast:hover:bg-high-contrast-surface high-contrast:hover:text-high-contrast-primary rounded-md"
                          :class="{
                            'text-success dark:text-dark-success high-contrast:text-high-contrast-success':
                              isActiveRoute(grandChild.url)
                          }"
                        >
                          {{ grandChild.title }}
                        </NuxtLink>
                      </div>
                    </template>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </template>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.group:hover .group-hover\:visible {
  visibility: visible;
}
</style>
