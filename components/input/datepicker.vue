<template>
  <div ref="containerRef" class="relative datepicker-container">
    <label
      v-if="label"
      class="block mb-2 text-text-secondary dark:text-dark-text-secondary high-contrast:text-high-contrast-text-secondary"
    >
      {{ label }}
    </label>

    <!-- Input field -->
    <div class="relative">
      <input
        ref="inputRef"
        type="text"
        :value="inputValue"
        :placeholder="placeholder || formatExample"
        :disabled="disabled"
        :readonly="readonly"
        :required="required"
        class="w-full px-3 py-2 bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 high-contrast:focus:ring-high-contrast-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        :class="[
          error
            ? 'border-danger dark:border-danger high-contrast:border-danger'
            : 'border-border dark:border-dark-border high-contrast:border-high-contrast-border',
          readonly ? 'cursor-pointer' : 'cursor-text'
        ]"
        @click="handleClick"
        @input="handleInput"
        @blur="handleBlur"
        @focus="handleFocus"
        @keydown.enter="handleEnter"
      />

      <!-- Calendar icon -->
      <div
        class="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary"
        :class="{ 'opacity-50 cursor-not-allowed': disabled }"
        @click="togglePicker"
        @mousedown.prevent
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
            clip-rule="evenodd"
          />
        </svg>
      </div>
    </div>

    <!-- Date picker dropdown -->
    <div
      v-if="isOpen"
      ref="dropdownRef"
      class="fixed z-[9999] mt-1 w-[320px] bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface border rounded-lg shadow-lg"
      :style="dropdownStyle"
      :class="[
        error
          ? 'border-danger dark:border-danger high-contrast:border-danger'
          : 'border-border dark:border-dark-border high-contrast:border-high-contrast-border'
      ]"
    >
      <!-- Header with navigation -->
      <div
        class="flex items-center justify-between p-2 border-b border-border dark:border-dark-border high-contrast:border-high-contrast-border"
      >
        <button
          type="button"
          class="p-1 rounded-lg text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-high-contrast-primary/10 transition-colors"
          @click="previousPeriod"
        >
          ◀
        </button>

        <div class="flex gap-2">
          <!-- Year selection -->
          <select
            v-model="currentYear"
            class="bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary border border-border dark:border-dark-border high-contrast:border-high-contrast-border rounded px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 high-contrast:focus:ring-high-contrast-primary hover:border-primary dark:hover:border-dark-primary high-contrast:hover:border-high-contrast-primary transition-colors"
            @change="updateCurrentDate"
          >
            <option
              v-for="year in yearRange"
              :key="year"
              :value="year"
              class="bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary"
            >
              {{ year }}
            </option>
          </select>

          <!-- Month selection (if needed) -->
          <select
            v-if="showMonths"
            v-model="currentMonth"
            class="bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary border border-border dark:border-dark-border high-contrast:border-high-contrast-border rounded px-2 py-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 high-contrast:focus:ring-high-contrast-primary hover:border-primary dark:hover:border-dark-primary high-contrast:hover:border-high-contrast-primary transition-colors"
            @change="updateCurrentDate"
          >
            <option
              v-for="(month, index) in months"
              :key="index"
              :value="index"
              class="bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary"
            >
              {{ month }}
            </option>
          </select>
        </div>

        <button
          type="button"
          class="p-1 rounded-lg text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-high-contrast-primary/10 transition-colors"
          @click="nextPeriod"
        >
          ▶
        </button>
      </div>

      <!-- Calendar grid (if showing full date) -->
      <div v-if="showDays" class="p-2">
        <!-- Week days header -->
        <div class="grid grid-cols-7 gap-1 mb-2">
          <div
            v-for="day in weekDays"
            :key="day"
            class="text-center text-sm text-text-secondary dark:text-dark-text-secondary high-contrast:text-high-contrast-text-secondary"
          >
            {{ day }}
          </div>
        </div>

        <!-- Days grid -->
        <div class="grid grid-cols-7 gap-1">
          <button
            v-for="{
              day,
              isCurrentMonth,
              isSelected,
              isInRange,
              isDisabled
            } in daysInMonth"
            :key="day.toISOString()"
            type="button"
            class="p-2 rounded-lg text-center transition-colors"
            :class="[
              isCurrentMonth
                ? 'text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary'
                : 'text-text-tertiary dark:text-dark-text-tertiary high-contrast:text-high-contrast-text-tertiary',
              isSelected
                ? 'bg-primary dark:bg-dark-primary high-contrast:bg-black text-white dark:text-white high-contrast:text-white'
                : 'hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-black/10',
              isInRange
                ? 'bg-primary/10 dark:bg-dark-primary/10 high-contrast:bg-high-contrast-primary/10'
                : '',
              isDisabled
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-pointer'
            ]"
            :disabled="isDisabled"
            @click="selectDate(day)"
          >
            {{ day.getDate() }}
          </button>
        </div>
      </div>

      <!-- Month grid (if showing month picker) -->
      <div v-else-if="showMonths" class="p-2 grid grid-cols-3 gap-2">
        <button
          v-for="(month, index) in months"
          :key="month"
          type="button"
          class="p-2 rounded-lg text-center transition-colors"
          :class="[
            currentMonth === index
              ? 'bg-primary dark:bg-dark-primary high-contrast:bg-black text-white dark:text-white high-contrast:text-white'
              : 'text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-black/10'
          ]"
          @click="selectMonth(index)"
        >
          {{ month }}
        </button>
      </div>

      <!-- Year grid (if showing year picker) -->
      <div
        v-else
        class="p-2 grid grid-cols-3 gap-2 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-border dark:scrollbar-thumb-dark-border high-contrast:scrollbar-thumb-high-contrast-border"
      >
        <button
          v-for="year in yearRange"
          :key="year"
          type="button"
          class="p-2 rounded-lg text-center transition-colors"
          :class="[
            currentYear === year
              ? 'bg-primary dark:bg-dark-primary high-contrast:bg-black text-white dark:text-white high-contrast:text-white'
              : 'text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-black/10'
          ]"
          @click="selectYear(year)"
        >
          {{ year }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue'
import { format, parse, isValid } from 'date-fns'
import { onClickOutside, useWindowSize } from '@vueuse/core'

type DateFormat =
  | 'dd.MM.yyyy'
  | 'MM.yyyy'
  | 'yyyy'
  | 'dd-MM-yyyy'
  | 'MM-yyyy'
  | 'dd/MM/yyyy'
  | 'MM/yyyy'

interface Props {
  modelValue: Date | null | [Date | null, Date | null]
  label?: string
  placeholder?: string
  disabled?: boolean
  readonly?: boolean
  required?: boolean
  format?: DateFormat
  minDate?: Date
  maxDate?: Date
  errorMessage?: string
  range?: boolean
  allowInput?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  readonly: false,
  required: false,
  format: 'dd.MM.yyyy',
  errorMessage: 'Invalid date',
  range: false,
  allowInput: false
})

const emit = defineEmits<{
  (
    e: 'update:modelValue',
    value: Date | null | [Date | null, Date | null]
  ): void
}>()

// State
const inputRef = ref<HTMLInputElement | null>(null)
const isOpen = ref(false)
const error = ref(false)
const isFocused = ref(false)
const currentDate = ref(
  Array.isArray(props.modelValue)
    ? props.modelValue[0] || new Date()
    : props.modelValue || new Date()
)
const currentYear = ref(currentDate.value.getFullYear())
const currentMonth = ref(currentDate.value.getMonth())
const rangeStart = ref<Date | null>(
  Array.isArray(props.modelValue)
    ? props.modelValue[0]
    : new Date(new Date().getFullYear(), new Date().getMonth(), 1)
)
const rangeEnd = ref<Date | null>(
  Array.isArray(props.modelValue)
    ? props.modelValue[1]
    : new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0)
)

// Constants
const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
]

// Computed properties
const showDays = computed(() => props.format.includes('dd'))
const showMonths = computed(() => props.format.includes('MM'))

const formatExample = computed(() => {
  switch (props.format) {
    case 'dd.MM.yyyy':
      return '31.12.2024'
    case 'MM.yyyy':
      return '12.2024'
    case 'yyyy':
      return '2024'
    case 'dd-MM-yyyy':
      return '31-12-2024'
    case 'MM-yyyy':
      return '12-2024'
    case 'dd/MM/yyyy':
      return '31/12/2024'
    case 'MM/yyyy':
      return '12/2024'
    default:
      return '31.12.2024'
  }
})

const yearRange = computed(() => {
  const currentYear = new Date().getFullYear()
  const minYear = props.minDate
    ? props.minDate.getFullYear()
    : currentYear - 100
  const maxYear = props.maxDate
    ? props.maxDate.getFullYear()
    : currentYear + 100
  return Array.from(
    { length: maxYear - minYear + 1 },
    (_, i) => minYear + i
  )
})

const formattedDate = computed(() => {
  if (!props.modelValue) return ''
  try {
    if (Array.isArray(props.modelValue)) {
      const [start, end] = props.modelValue
      if (!start && !end) return ''
      if (!end) return format(start!, props.format)
      return `${format(start!, props.format)} - ${format(
        end,
        props.format
      )}`
    }
    return format(props.modelValue, props.format)
  } catch {
    return ''
  }
})

const inputValue = ref(formattedDate.value)

const isInRange = (date: Date) => {
  if (!props.range || !rangeStart.value || !rangeEnd.value) return false
  return date >= rangeStart.value && date <= rangeEnd.value
}

const daysInMonth = computed(() => {
  const year = currentYear.value
  const month = currentMonth.value
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysArray = []

  const firstDayOfWeek = firstDay.getDay() || 7
  const daysFromPrevMonth = firstDayOfWeek - 1

  // Предыдущий месяц
  for (let i = daysFromPrevMonth; i > 0; i--) {
    const day = new Date(year, month, 1 - i)
    daysArray.push({
      day,
      isCurrentMonth: false,
      isSelected: props.range
        ? isSameDate(day, rangeStart.value) ||
          isSameDate(day, rangeEnd.value)
        : isSameDate(day, props.modelValue as Date),
      isInRange: isInRange(day),
      isDisabled: isDateDisabled(day)
    })
  }

  // Текущий месяц
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const day = new Date(year, month, i)
    daysArray.push({
      day,
      isCurrentMonth: true,
      isSelected: props.range
        ? isSameDate(day, rangeStart.value) ||
          isSameDate(day, rangeEnd.value)
        : isSameDate(day, props.modelValue as Date),
      isInRange: isInRange(day),
      isDisabled: isDateDisabled(day)
    })
  }

  // Следующий месяц
  const remainingDays = 42 - daysArray.length
  for (let i = 1; i <= remainingDays; i++) {
    const day = new Date(year, month + 1, i)
    daysArray.push({
      day,
      isCurrentMonth: false,
      isSelected: props.range
        ? isSameDate(day, rangeStart.value) ||
          isSameDate(day, rangeEnd.value)
        : isSameDate(day, props.modelValue as Date),
      isInRange: isInRange(day),
      isDisabled: isDateDisabled(day)
    })
  }

  return daysArray
})

// Helper functions
const isSameDate = (date1: Date | null, date2: Date | null) => {
  if (!date1 || !date2) return false
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  )
}

const isDateDisabled = (date: Date) => {
  if (props.minDate && date < props.minDate) return true
  if (props.maxDate && date > props.maxDate) return true
  return false
}

// Event handlers
const togglePicker = () => {
  if (props.disabled || props.readonly) return
  isOpen.value = !isOpen.value

  // Reset position when opening
  if (isOpen.value) {
    inputRef.value?.focus()
    nextTick(() => {
      if (dropdownRef.value) {
        const style = dropdownStyle.value
        Object.assign(dropdownRef.value.style, style)
      }
    })
  }
}

const updateCurrentDate = () => {
  currentDate.value = new Date(currentYear.value, currentMonth.value)
}

const previousPeriod = () => {
  if (showDays.value) {
    if (currentMonth.value === 0) {
      currentYear.value--
      currentMonth.value = 11
    } else {
      currentMonth.value--
    }
  } else if (showMonths.value) {
    currentYear.value--
  } else {
    currentYear.value = Math.max(
      currentYear.value - 10,
      yearRange.value[0]
    )
  }
  updateCurrentDate()
}

const nextPeriod = () => {
  if (showDays.value) {
    if (currentMonth.value === 11) {
      currentYear.value++
      currentMonth.value = 0
    } else {
      currentMonth.value++
    }
  } else if (showMonths.value) {
    currentYear.value++
  } else {
    currentYear.value = Math.min(
      currentYear.value + 10,
      yearRange.value[yearRange.value.length - 1]
    )
  }
  updateCurrentDate()
}

const selectDate = (date: Date) => {
  if (isDateDisabled(date)) return

  if (props.range) {
    if (!rangeStart.value || (rangeStart.value && rangeEnd.value)) {
      rangeStart.value = date
      rangeEnd.value = null
    } else {
      if (date < rangeStart.value) {
        rangeEnd.value = rangeStart.value
        rangeStart.value = date
      } else {
        rangeEnd.value = date
      }
      // Close picker only after selecting both dates in range mode
      isOpen.value = false
    }

    emit('update:modelValue', [rangeStart.value, rangeEnd.value])
  } else {
    emit('update:modelValue', date)
    // Close picker immediately in single date mode
    isOpen.value = false
  }
}

const selectMonth = (month: number) => {
  currentMonth.value = month
  if (!showDays.value) {
    const date = new Date(currentYear.value, month, 1)
    emit('update:modelValue', date)
    isOpen.value = false
  }
}

const selectYear = (year: number) => {
  currentYear.value = year
  if (!showMonths.value) {
    const date = new Date(year, 0, 1)
    emit('update:modelValue', date)
    isOpen.value = false
  }
}

const handleClick = () => {
  if (props.disabled || props.readonly) return
  if (isFocused.value) {
    togglePicker()
  }
}

const handleFocus = () => {
  if (props.disabled || props.readonly) return
  isFocused.value = true
}

const handleInput = (event: Event) => {
  if (!props.allowInput) return

  const target = event.target as HTMLInputElement
  inputValue.value = target.value
}

const handleBlur = (event: FocusEvent) => {
  // Get the next focused element
  const relatedTarget = event.relatedTarget as HTMLElement

  // Check if the next focused element is part of the datepicker
  const isDatepickerElement = relatedTarget?.closest(
    '.datepicker-container'
  )

  if (!isDatepickerElement) {
    isFocused.value = false
    isOpen.value = false

    if (!props.allowInput) return

    try {
      if (props.range) {
        const [startStr, endStr] = inputValue.value
          .split('-')
          .map(s => s.trim())

        let start: Date | null = null
        let end: Date | null = null

        // Handle different format types
        if (props.format.includes('dd')) {
          // Full date format
          start = parse(startStr, props.format, new Date())
          end = endStr ? parse(endStr, props.format, new Date()) : null
        } else if (props.format.includes('MM')) {
          // Month-year format
          start = parse(`01.${startStr}`, 'dd.MM.yyyy', new Date())
          if (endStr) {
            end = parse(`01.${endStr}`, 'dd.MM.yyyy', new Date())
          }
        } else {
          // Year only format
          start = parse(`01.01.${startStr}`, 'dd.MM.yyyy', new Date())
          if (endStr) {
            end = parse(`01.01.${endStr}`, 'dd.MM.yyyy', new Date())
          }
        }

        if (isValid(start) && (!endStr || isValid(end))) {
          if (end && start > end) {
            emit('update:modelValue', [end, start])
            rangeStart.value = end
            rangeEnd.value = start
          } else {
            emit('update:modelValue', [start, end])
            rangeStart.value = start
            rangeEnd.value = end
          }
          error.value = false
        } else {
          error.value = true
          inputValue.value = formattedDate.value
        }
      } else {
        let date: Date | null = null

        // Handle different format types
        if (props.format.includes('dd')) {
          // Full date format
          date = parse(inputValue.value, props.format, new Date())
        } else if (props.format.includes('MM')) {
          // Month-year format
          date = parse(`01.${inputValue.value}`, 'dd.MM.yyyy', new Date())
        } else {
          // Year only format
          date = parse(
            `01.01.${inputValue.value}`,
            'dd.MM.yyyy',
            new Date()
          )
        }

        if (isValid(date) && !isDateDisabled(date)) {
          emit('update:modelValue', date)
          error.value = false
        } else {
          error.value = true
          inputValue.value = formattedDate.value
        }
      }
    } catch {
      error.value = true
      inputValue.value = formattedDate.value
    }
  }
}

const handleEnter = (event: KeyboardEvent) => {
  if (!props.allowInput) return
  event.preventDefault()
  ;(event.target as HTMLInputElement).blur()
}

// Update watchers
watch(
  () => props.modelValue,
  () => {
    inputValue.value = formattedDate.value
  }
)

const containerRef = ref<HTMLElement | null>(null)
const dropdownRef = ref<HTMLElement | null>(null)
const { width: windowWidth, height: windowHeight } = useWindowSize()

// Add new computed property for dropdown positioning
const dropdownStyle = computed(() => {
  if (!containerRef.value || !isOpen.value) return {}

  const inputRect = containerRef.value.getBoundingClientRect()
  const dropdownWidth = 320 // Fixed width of dropdown
  const dropdownHeight = 350 // Approximate max height of dropdown

  // Calculate initial position
  let left = inputRect.left
  let top = inputRect.bottom + 8 // Add small gap

  // Adjust horizontal position if dropdown would overflow right edge
  if (left + dropdownWidth > windowWidth.value) {
    left = Math.max(0, windowWidth.value - dropdownWidth - 16) // 16px padding from window edge
  }

  // Adjust vertical position if dropdown would overflow bottom edge
  if (top + dropdownHeight > windowHeight.value) {
    // Position above input if there's more space
    if (inputRect.top > windowHeight.value - inputRect.bottom) {
      top = inputRect.top - dropdownHeight - 8
    }
  }

  return {
    left: `${left}px`,
    top: `${top}px`,
    maxHeight: `${windowHeight.value - top - 16}px` // Ensure it doesn't overflow bottom
  }
})

// Add window resize handler
watch([windowWidth, windowHeight], () => {
  if (isOpen.value && dropdownRef.value) {
    const style = dropdownStyle.value
    Object.assign(dropdownRef.value.style, style)
  }
})

onClickOutside(containerRef, () => {
  isOpen.value = false
})
</script>

<style scoped>
/* Add your styles here */
</style>
