<template>
  <div class="relative">
    <label
      v-if="label"
      class="block mb-2 text-text-secondary dark:text-dark-text-secondary high-contrast:text-high-contrast-text-secondary"
    >
      {{ label }}
    </label>
    <div class="relative">
      <input
        ref="inputRef"
        type="text"
        :value="displayValue"
        :placeholder="placeholder"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        class="w-full px-3 py-2 bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary dark:focus:ring-dark-primary high-contrast:focus:ring-high-contrast-primary transition-colors"
        :class="[
          error
            ? 'border-danger dark:border-danger high-contrast:border-danger'
            : 'border-border dark:border-dark-border high-contrast:border-high-contrast-border',
          showSpinner ? 'pr-10' : ''
        ]"
        @input="handleInput"
        @keydown="handleKeyDown"
        @blur="handleBlur"
      />
      <div
        v-if="showSpinner"
        class="absolute right-[1px] top-[1px] bottom-[1px] flex flex-col border-l border-border dark:border-dark-border high-contrast:border-high-contrast-border overflow-hidden rounded-r-[7px]"
        :class="{
          'high-contrast:border-l-2': true,
          'high-contrast:right-[2px]': true,
          'high-contrast:top-[2px]': true,
          'high-contrast:bottom-[2px]': true,
          'high-contrast:rounded-r-[6px]': true
        }"
      >
        <button
          type="button"
          class="flex-1 w-8 flex items-center justify-center hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-high-contrast-primary/10 text-xs"
          :class="{
            'high-contrast:border-0': true,
            'high-contrast:border-b': true,
            'high-contrast:border-b-high-contrast-border': true
          }"
          @click="increment"
          :disabled="isAtMax"
        >
          ▲
        </button>
        <button
          type="button"
          class="flex-1 w-8 flex items-center justify-center hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-high-contrast-primary/10 text-xs"
          :class="{
            'high-contrast:border-0': true
          }"
          @click="decrement"
          :disabled="isAtMin"
        >
          ▼
        </button>
      </div>
    </div>
    <p v-if="error" class="mt-1 text-sm text-danger">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface FloatOptions {
  precision?: number
  separator?: '.' | ','
  step?: number
}

interface Props {
  modelValue: number | null
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  min?: number
  max?: number
  float?: FloatOptions
  showSpinner?: boolean
  errorMessage?: string
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  readonly: false,
  required: false,
  showSpinner: true,
  float: () => ({
    precision: 2,
    separator: '.',
    step: 1
  }),
  errorMessage: 'Invalid number'
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: number | null): void
}>()

const inputRef = ref<HTMLInputElement | null>(null)
const error = ref(false)
const internalValue = ref<number | null>(props.modelValue)

// Computed properties for validation
const isAtMax = computed(
  () =>
    typeof props.max === 'number' &&
    typeof internalValue.value === 'number' &&
    internalValue.value >= props.max
)

const isAtMin = computed(
  () =>
    typeof props.min === 'number' &&
    typeof internalValue.value === 'number' &&
    internalValue.value <= props.min
)

// Format number for display
const formatNumber = (num: number | null): string => {
  if (num === null) return ''

  const { precision, separator } = props.float || {
    precision: 2,
    separator: '.'
  }
  const multiplier = Math.pow(10, precision)
  const roundedNum = Math.round(num * multiplier) / multiplier

  return roundedNum.toString().replace('.', separator)
}

// Parse display value to number
const parseNumber = (value: string): number | null => {
  if (!value) return null

  const { separator } = props.float || { separator: '.' }
  const normalizedValue = value.replace(separator, '.')
  const num = parseFloat(normalizedValue)

  return isNaN(num) ? null : num
}

// Computed display value
const displayValue = computed(() => formatNumber(internalValue.value))

// Validate number
const validateNumber = (num: number | null): boolean => {
  if (num === null) {
    const inputValue = inputRef.value?.value || ''
    if (inputValue.trim() === '') return !props.required
    return false
  }

  const isValid = !isNaN(num)
  const isInRange =
    (typeof props.min !== 'number' || num >= props.min) &&
    (typeof props.max !== 'number' || num <= props.max)

  return isValid && isInRange
}

// Handle input changes
const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const newValue = parseNumber(target.value)

  // Если поле пустое или содержит только пробелы, считаем это null
  if (target.value.trim() === '') {
    internalValue.value = null
    error.value = props.required
    emit('update:modelValue', null)
    return
  }

  internalValue.value = newValue
  error.value = !validateNumber(newValue)
  emit('update:modelValue', newValue)
}

// Handle keyboard input
const handleKeyDown = (event: KeyboardEvent) => {
  if (props.readonly || props.disabled) return

  const { separator } = props.float || { separator: '.' }

  // Allow: backspace, delete, tab, escape, enter, dots, commas
  const controlKeys = [
    'Backspace',
    'Delete',
    'Tab',
    'Escape',
    'Enter',
    '.',
    ','
  ]
  // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
  const ctrlCombination =
    (event.ctrlKey || event.metaKey) &&
    ['a', 'c', 'v', 'x'].includes(event.key.toLowerCase())
  // Allow: home, end, left, right
  const navigationKeys = ['Home', 'End', 'ArrowLeft', 'ArrowRight']
  // Allow: numbers
  const isNumber = /^\d$/.test(event.key)

  if (event.key === 'ArrowUp') {
    event.preventDefault()
    increment()
    return
  }
  if (event.key === 'ArrowDown') {
    event.preventDefault()
    decrement()
    return
  }

  // Block invalid input
  if (
    !controlKeys.includes(event.key) &&
    !navigationKeys.includes(event.key) &&
    !isNumber &&
    !ctrlCombination
  ) {
    event.preventDefault()
    return
  }

  // Handle decimal separator
  if (['.', ','].includes(event.key)) {
    const { precision } = props.float || { precision: 2 }
    // If precision is 0, block decimal separator
    if (precision === 0) {
      event.preventDefault()
      return
    }
    // If it's not the configured separator, block it
    if (event.key !== separator) {
      event.preventDefault()
      return
    }
    // If we already have a separator, block it
    if (inputRef.value?.value.includes(separator)) {
      event.preventDefault()
      return
    }
  }
}

// Handle blur event
const handleBlur = () => {
  if (internalValue.value !== null) {
    const { precision } = props.float || { precision: 2 }
    const multiplier = Math.pow(10, precision)
    internalValue.value =
      Math.round(internalValue.value * multiplier) / multiplier
    emit('update:modelValue', internalValue.value)
  }
}

// Increment value
const increment = () => {
  if (props.readonly || props.disabled || isAtMax.value) return

  const step = props.float?.step || 1
  const newValue = (internalValue.value || 0) + step

  if (!isAtMax.value && validateNumber(newValue)) {
    internalValue.value = newValue
    emit('update:modelValue', newValue)
  }
}

// Decrement value
const decrement = () => {
  if (props.readonly || props.disabled || isAtMin.value) return

  const step = props.float?.step || 1
  const newValue = (internalValue.value || 0) - step

  if (!isAtMin.value && validateNumber(newValue)) {
    internalValue.value = newValue
    emit('update:modelValue', newValue)
  }
}
</script>
