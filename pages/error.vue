<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div
      class="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-lg"
    >
      <div class="text-center">
        <svg
          v-if="error.statusCode === 403"
          class="mx-auto h-12 w-12 text-red-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
          />
        </svg>
        <svg
          v-else
          class="mx-auto h-12 w-12 text-yellow-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
        <h2 class="mt-6 text-3xl font-extrabold text-gray-900">
          {{
            error.statusCode === 403
              ? 'У вас нет доступа'
              : 'Что-то пошло не так'
          }}
        </h2>
        <p class="mt-2 text-sm text-gray-600">
          {{
            error.statusCode === 403
              ? 'Ваш IP-адрес не входит в список разрешенных'
              : 'Пожалуйста, попробуйте позже'
          }}
        </p>
      </div>
      <div class="mt-8">
        <button
          @click="handleError"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Вернуться на главную
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  error: {
    type: Object,
    required: true
  }
})

const handleError = () => {
  clearError({ redirect: '/' })
}
</script>
