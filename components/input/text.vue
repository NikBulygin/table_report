<template>
  <div class="relative">
    <label
      v-if="label"
      class="block mb-2 text-text-secondary dark:text-dark-text-secondary high-contrast:text-high-contrast-text-secondary"
    >
      {{ label }}
    </label>
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :required="required"
      class="w-full px-3 py-2 bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary high-contrast:focus:ring-high-contrast-primary transition-colors"
      :class="[
        error
          ? 'border-danger dark:border-danger high-contrast:border-danger'
          : 'border-border dark:border-dark-border high-contrast:border-high-contrast-border'
      ]"
      @input="handleInput"
    />
    <p v-if="error" class="mt-1 text-sm text-danger">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

interface Props {
  modelValue: string
  regex: string
  errorMessage: string
  label: string
  placeholder: string
  type?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  disabled: false,
  readonly: false,
  required: false
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const error = ref(false)

// Validate input against regex pattern
const validateInput = (value: string) => {
  if (!props.regex || !value) return true
  const pattern = new RegExp(props.regex)
  return pattern.test(value)
}

// Handle input changes
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const newValue = target.value

  // Update error state
  error.value = !validateInput(newValue)

  // Emit the new value
  emit('update:modelValue', newValue)
}
</script>
