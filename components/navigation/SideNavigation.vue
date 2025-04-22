<script setup lang="ts">
import { ref, type PropType } from 'vue'
import type { NavigationItem } from '~/types'
import XMark from '~/components/tools/icons/XMark.vue'

// Определяем пропсы для NavigationItemComponent
interface NavigationItemProps {
  item: NavigationItem
  level: number
}

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  items: {
    type: Array as PropType<NavigationItem[]>,
    required: true
  }
})

const emit = defineEmits(['update:isOpen'])

const close = () => {
  emit('update:isOpen', false)
}

// Для отслеживания открытых подменю
const openSubmenus = ref<Set<string>>(new Set())

const toggleSubmenu = (title: string) => {
  if (openSubmenus.value.has(title)) {
    openSubmenus.value.delete(title)
  } else {
    openSubmenus.value.add(title)
  }
}

// Определяем размер экрана
const { $screen } = useNuxtApp()

// Рекурсивный компонент для отображения пунктов меню
const NavigationItemComponent = defineComponent({
  name: 'NavigationItemComponent',
  props: {
    item: {
      type: Object as PropType<NavigationItem>,
      required: true
    },
    level: {
      type: Number,
      default: 0
    }
  },
  setup(props: NavigationItemProps) {
    const hasChildren = computed(
      () => props.item.children && props.item.children.length > 0
    )
    const isOpen = computed(() => openSubmenus.value.has(props.item.title))
    const paddingLeft = computed(() => `${props.level * 1}rem`)

    return {
      hasChildren,
      isOpen,
      paddingLeft,
      toggleSubmenu
    }
  }
})
</script>

<template>
  <ClientOnly>
    <!-- 
      Base styles apply to mobile (sm or less)
      Different styles apply for sm and above using sm: prefix 
    -->
    <div
      class="fixed inset-y-0 right-0 z-50 transform transition-transform duration-300 ease-in-out w-full sm:w-96"
      :class="{
        'translate-x-0': isOpen,
        'translate-x-full': !isOpen
      }"
    >
      <!-- Overlay only shows on mobile -->
      <div
        class="fixed inset-0 bg-black bg-opacity-50 sm:hidden"
        @click="close"
      />
      <!-- Меню -->
      <div
        class="absolute right-0 h-full w-full max-w-sm bg-background dark:bg-dark-background high-contrast:bg-high-contrast-background shadow-xl overflow-y-auto border-l border-border dark:border-dark-border high-contrast:border-high-contrast-border"
      >
        <!-- Заголовок и кнопка закрытия -->
        <div
          class="sticky top-0 z-10 flex items-center justify-between p-4 border-b border-border dark:border-dark-border high-contrast:border-high-contrast-border bg-inherit"
        >
          <h2 class="text-lg font-semibold">Навигация</h2>
          <button
            @click="close"
            class="p-2 rounded-full hover:bg-surface dark:hover:bg-dark-surface high-contrast:hover:bg-high-contrast-surface transition-colors duration-200"
            aria-label="Закрыть меню"
          >
            <XMark class="w-6 h-6" />
          </button>
        </div>

        <!-- Список навигации -->
        <nav class="py-2">
          <template v-for="item in items" :key="item.title">
            <div class="w-full">
              <div
                class="flex items-center justify-between py-2 px-4 hover:bg-surface dark:hover:bg-dark-surface high-contrast:hover:bg-high-contrast-surface transition-colors duration-200"
                :style="{ paddingLeft: '0rem' }"
              >
                <button
                  v-if="item.children && item.children.length > 0"
                  class="flex items-center justify-between w-full text-left"
                  @click="toggleSubmenu(item.title)"
                >
                  <span>{{ item.title }}</span>
                  <svg
                    class="w-4 h-4 transition-transform"
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
                </button>
                <NuxtLink
                  v-else
                  :to="item.url"
                  class="block w-full hover:text-primary dark:hover:text-dark-primary high-contrast:hover:text-high-contrast-primary"
                >
                  {{ item.title }}
                </NuxtLink>
              </div>
              <div
                v-if="
                  item.children &&
                  item.children.length > 0 &&
                  openSubmenus.has(item.title)
                "
                class="border-l-2 ml-4 border-border dark:border-dark-border high-contrast:border-high-contrast-border"
              >
                <template
                  v-for="child in item.children"
                  :key="child.title"
                >
                  <div class="w-full">
                    <div
                      class="flex items-center justify-between py-2 px-4 hover:bg-surface dark:hover:bg-dark-surface high-contrast:hover:bg-high-contrast-surface transition-colors duration-200"
                      :style="{ paddingLeft: '1rem' }"
                    >
                      <button
                        v-if="child.children && child.children.length > 0"
                        class="flex items-center justify-between w-full text-left"
                        @click="toggleSubmenu(child.title)"
                      >
                        <span>{{ child.title }}</span>
                        <svg
                          class="w-4 h-4 transition-transform"
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
                      </button>
                      <NuxtLink
                        v-else
                        :to="child.url"
                        class="block w-full hover:text-primary dark:hover:text-dark-primary high-contrast:hover:text-high-contrast-primary"
                      >
                        {{ child.title }}
                      </NuxtLink>
                    </div>
                    <!-- Третий уровень вложенности -->
                    <div
                      v-if="
                        child.children &&
                        child.children.length > 0 &&
                        openSubmenus.has(child.title)
                      "
                      class="border-l-2 ml-4 border-border dark:border-dark-border high-contrast:border-high-contrast-border"
                    >
                      <template
                        v-for="grandChild in child.children"
                        :key="grandChild.title"
                      >
                        <div
                          class="flex items-center justify-between py-2 px-4 hover:bg-surface dark:hover:bg-dark-surface high-contrast:hover:bg-high-contrast-surface transition-colors duration-200"
                          :style="{ paddingLeft: '2rem' }"
                        >
                          <NuxtLink
                            :to="grandChild.url"
                            class="block w-full hover:text-primary dark:hover:text-dark-primary high-contrast:hover:text-high-contrast-primary"
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
        </nav>
      </div>
    </div>
  </ClientOnly>
</template>
