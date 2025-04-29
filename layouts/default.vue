<template>
  <div class="min-h-screen bg-gray-100">
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex space-x-8">
              <NuxtLink
                to="/shop2"
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="[
                  $route.path.includes('shop2')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                ]"
                @click="resetStore"
              >
                Shop 2
              </NuxtLink>
              <NuxtLink
                to="/shop12"
                class="inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
                :class="[
                  $route.path.includes('shop12')
                    ? 'border-indigo-500 text-gray-900'
                    : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                ]"
                @click="resetStore"
              >
                Shop 12
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <main class="w-full mx-auto px-16 py-8 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useShopDataStore } from '~/stores/shopData'

const store = useShopDataStore()

function resetStore() {
  store.reset()
}
</script>
