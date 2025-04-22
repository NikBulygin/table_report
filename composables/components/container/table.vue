<template>
  <div class="table-wrapper">
    <!-- Toolbar -->
    <div
      class="toolbar mb-2 h-[44px] flex items-center justify-between gap-2"
    >
      <!-- Left side -->
      <div class="flex items-center gap-4">
        <!-- Items per page selector -->
        <div
          class="flex items-center gap-2"
          :class="{ 'opacity-50 pointer-events-none': isEditMode }"
        >
          <span
            class="text-sm text-text-secondary dark:text-dark-text-secondary high-contrast:text-high-contrast-text-secondary"
            >Строк на странице:</span
          >
          <select
            v-model="itemsPerPage"
            class="p-1 rounded border bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary border-border dark:border-dark-border high-contrast:border-high-contrast-border focus:outline-none focus:ring-2 focus:ring-primary/50 dark:focus:ring-dark-primary/50 high-contrast:focus:ring-high-contrast-primary"
            @change="onItemsPerPageChange"
            :disabled="isEditMode"
          >
            <option
              value="10"
              class="text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary"
            >
              10
            </option>
            <option
              value="25"
              class="text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary"
            >
              25
            </option>
            <option
              value="50"
              class="text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary"
            >
              50
            </option>
            <option
              value="100"
              class="text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary"
            >
              100
            </option>
          </select>
        </div>

        <!-- Action buttons in edit mode -->
        <template v-if="isEditMode">
          <button
            v-if="hasSelected"
            @click="deleteSelected"
            class="px-3 py-1 bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary border border-border dark:border-dark-border high-contrast:border-high-contrast-border rounded hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-high-contrast-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Удалить
          </button>
          <button
            v-if="hasSelected"
            @click="copySelected"
            class="px-3 py-1 bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary border border-border dark:border-dark-border high-contrast:border-high-contrast-border rounded hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-high-contrast-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Копировать
          </button>
          <button
            @click="cancelEdit"
            class="px-3 py-1 bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary border border-border dark:border-dark-border high-contrast:border-high-contrast-border rounded hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-high-contrast-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Отмена
          </button>
          <button
            @click="saveChanges"
            class="px-3 py-1 bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary border border-border dark:border-dark-border high-contrast:border-high-contrast-border rounded hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-high-contrast-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Сохранить
          </button>
        </template>
      </div>

      <!-- Right side -->
      <div>
        <button
          v-if="!isEditMode"
          @click="startEdit"
          class="px-3 py-1 bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary border border-border dark:border-dark-border high-contrast:border-high-contrast-border rounded hover:bg-primary/10 dark:hover:bg-dark-primary/10 high-contrast:hover:bg-high-contrast-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Редактировать
        </button>
      </div>
    </div>

    <div
      class="table-container w-full border border-border dark:border-dark-border high-contrast:border-high-contrast-border rounded-lg overflow-auto"
    >
      <div class="table-grid" :style="gridTemplateColumns">
        <!-- Checkbox header -->
        <div
          v-if="isEditMode"
          class="table-header-cell p-2 bg-primary dark:bg-dark-primary high-contrast:bg-high-contrast-primary text-white dark:text-white high-contrast:text-black flex items-center"
        >
          <input
            type="checkbox"
            v-model="selectAll"
            @change="toggleSelectAll"
            class="w-4 h-4 rounded border-border dark:border-dark-border high-contrast:border-high-contrast-border cursor-pointer"
          />
        </div>

        <!-- Loading state -->
        <div
          v-if="loading"
          class="w-full text-center py-4 text-text-secondary dark:text-dark-text-secondary high-contrast:text-high-contrast-text-secondary"
        >
          Загрузка...
        </div>

        <!-- Error state -->
        <div v-else-if="error" class="w-full text-center py-4 text-danger">
          Ошибка загрузки данных
        </div>

        <!-- No data state -->
        <div
          v-else-if="!displayData.length"
          class="w-full text-center py-4 text-text-secondary dark:text-dark-text-secondary high-contrast:text-high-contrast-text-secondary"
        >
          Нет данных
        </div>

        <!-- Column headers -->
        <template v-for="column in props.meta.columns" :key="column.key">
          <div
            class="table-header-cell p-2 bg-primary-600 dark:bg-dark-primary-600 high-contrast:bg-high-contrast-primary text-white dark:text-white high-contrast:text-black flex items-center gap-1 cursor-pointer select-none border-r border-r-white/20 dark:border-r-black/20 high-contrast:border-r-black last:border-r-0 font-bold text-sm uppercase tracking-wider shadow-md"
            @click="
              column.type !== 'formula' &&
                !isEditMode &&
                handleSort(column.key)
            "
            :class="{
              'cursor-not-allowed opacity-75':
                column.type === 'formula' || isEditMode,
              'hover:bg-primary-700 dark:hover:bg-dark-primary-700 high-contrast:hover:bg-high-contrast-primary/90':
                column.type !== 'formula' && !isEditMode
            }"
            :title="
              column.type !== 'formula' && !isEditMode
                ? getSortTitle(column.key)
                : ''
            "
          >
            <span class="flex-1">{{ column.title }}</span>
            <div
              v-if="column.type !== 'formula' && !isEditMode"
              class="flex items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="w-4 h-4 transition-transform"
                :class="{
                  'opacity-30': props.sorted?.key !== column.key,
                  'rotate-180':
                    props.sorted?.key === column.key &&
                    props.sorted.direction === 'desc'
                }"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
              >
                <path d="M12 20V4M5 11l7-7 7 7" />
              </svg>
            </div>
          </div>
        </template>

        <!-- Table rows -->
        <template v-for="(row, rowIndex) in displayData" :key="rowIndex">
          <!-- Checkbox cell -->
          <div
            v-if="isEditMode"
            class="table-cell p-2 flex items-center border-r border-border dark:border-dark-border high-contrast:border-high-contrast-border"
            :class="[
              isNewRow(rowIndex)
                ? 'bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface'
                : rowIndex % 2 === 0
                ? 'bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface'
                : 'bg-primary/5 dark:bg-dark-primary/5 high-contrast:bg-high-contrast-primary/5'
            ]"
          >
            <input
              type="checkbox"
              v-model="selectedRows[rowIndex]"
              class="w-4 h-4 rounded border-border dark:border-dark-border high-contrast:border-high-contrast-border cursor-pointer"
            />
          </div>

          <!-- Data cells -->
          <template
            v-for="column in props.meta.columns"
            :key="`${rowIndex}-${column.key}`"
          >
            <div
              class="table-cell p-2 border-r border-border dark:border-dark-border high-contrast:border-high-contrast-border last:border-r-0"
              :class="[
                isNewRow(rowIndex)
                  ? 'bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface'
                  : rowIndex % 2 === 0
                  ? 'bg-surface dark:bg-dark-surface high-contrast:bg-high-contrast-surface'
                  : 'bg-primary/5 dark:bg-dark-primary/5 high-contrast:bg-high-contrast-primary/5',
                editedDataErrors[rowIndex]?.[column.key] &&
                  'border border-danger dark:border-danger high-contrast:border-danger'
              ]"
            >
              <template v-if="isEditMode && column.type !== 'formula'">
                <InputText
                  v-if="column.type === 'text'"
                  v-model="editedData[rowIndex][column.key]"
                  :regex="
                    getValidationPattern(column.validation)?.toString() ||
                    ''
                  "
                  :error-message="
                    editedDataErrors[rowIndex]?.[column.key] || ''
                  "
                  :label="''"
                  :placeholder="column.title"
                  :disabled="false"
                  :readonly="false"
                  :required="column.validation?.required || false"
                  @update:modelValue="
                    value => {
                      editedData[rowIndex][column.key] = value
                      if (!value && column.validation?.required) {
                        handleValidationError(
                          rowIndex,
                          column.key,
                          'required'
                        )
                      } else {
                        clearValidationError(rowIndex, column.key)
                      }
                    }
                  "
                />
                <InputNumber
                  v-else-if="column.type === 'number'"
                  v-model="editedData[rowIndex][column.key]"
                  :label="''"
                  :placeholder="column.title"
                  :disabled="false"
                  :readonly="false"
                  :required="column.validation?.required || false"
                  :min="column.validation?.min"
                  :max="column.validation?.max"
                  :float="{
                    precision: column.validation?.precision || 0,
                    separator: '.',
                    step: column.validation?.step || 1
                  }"
                  :error-message="
                    editedDataErrors[rowIndex]?.[column.key] || ''
                  "
                  @update:modelValue="
                    value => {
                      editedData[rowIndex][column.key] = value
                      if (value === null && column.validation?.required) {
                        handleValidationError(
                          rowIndex,
                          column.key,
                          'required'
                        )
                      } else if (value !== null) {
                        if (
                          typeof column.validation?.min === 'number' &&
                          value < column.validation.min
                        ) {
                          handleValidationError(
                            rowIndex,
                            column.key,
                            'min',
                            { min: column.validation.min }
                          )
                        } else if (
                          typeof column.validation?.max === 'number' &&
                          value > column.validation.max
                        ) {
                          handleValidationError(
                            rowIndex,
                            column.key,
                            'max',
                            { max: column.validation.max }
                          )
                        } else {
                          clearValidationError(rowIndex, column.key)
                        }
                      }
                    }
                  "
                />
                <InputDate
                  v-else-if="column.type === 'date'"
                  v-model="editedData[rowIndex][column.key]"
                  :label="''"
                  :placeholder="column.title"
                  :disabled="false"
                  :readonly="false"
                  :required="column.validation?.required || false"
                  :format="'dd-MM-yyyy'"
                  :error-message="
                    editedDataErrors[rowIndex]?.[column.key] || ''
                  "
                  :min-date="
                    column.validation?.min
                      ? new Date(column.validation.min)
                      : undefined
                  "
                  :max-date="
                    column.validation?.max
                      ? new Date(column.validation.max)
                      : undefined
                  "
                  :allow-input="true"
                  @update:modelValue="
                    value => {
                      editedData[rowIndex][column.key] = value
                      if (!value && column.validation?.required) {
                        handleValidationError(
                          rowIndex,
                          column.key,
                          'required'
                        )
                      } else {
                        clearValidationError(rowIndex, column.key)
                      }
                    }
                  "
                />
              </template>
              <template v-else>
                <span
                  :class="{
                    'text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary':
                      column.type !== 'formula',
                    'text-text-secondary dark:text-dark-text-secondary high-contrast:text-high-contrast-text-secondary':
                      column.type === 'formula'
                  }"
                >
                  {{
                    column.type === 'formula'
                      ? column.formula(getRowData(rowIndex))
                      : column.type === 'date'
                      ? format(
                          new Date(getRowData(rowIndex)[column.key]),
                          'dd-MM-yyyy'
                        )
                      : column.type === 'number' &&
                        column.validation?.precision
                      ? Number(getRowData(rowIndex)[column.key]).toFixed(
                          column.validation.precision
                        )
                      : getRowData(rowIndex)[column.key]
                  }}
                </span>
              </template>
            </div>
          </template>
        </template>
      </div>
    </div>

    <!-- Add new row button -->
    <div v-if="isEditMode" class="mt-4 flex justify-center">
      <button
        @click="addNewRow"
        class="w-8 h-8 rounded-full bg-primary dark:bg-dark-primary high-contrast:bg-high-contrast-primary text-white dark:text-white high-contrast:text-black flex items-center justify-center hover:bg-primary-dark dark:hover:bg-dark-primary-dark high-contrast:hover:bg-high-contrast-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span class="text-xl">+</span>
      </button>
    </div>

    <!-- Table footer with pagination -->
    <ContainerPagination
      v-if="props.pagination && !isEditMode"
      :current-page="currentPage"
      :total-pages="computedTotalPages"
      :total-items="props.pagination.totalItems"
      :items-per-page="props.pagination.itemsPerPage"
      @update:page="onPageChange"
      class="mt-4 text-text-primary dark:text-dark-text-primary high-contrast:text-high-contrast-text-primary"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import ContainerPagination from '~/components/container/pagination/index.vue'
import InputText from '~/components/input/text.vue'
import InputNumber from '~/components/input/number.vue'
import InputDate from '~/components/input/datepicker.vue'
import { format } from 'date-fns'

interface ValidationMeta {
  required?: boolean
  min?: number
  max?: number
  minLength?: number
  maxLength?: number
  pattern?: string | RegExp
  type?:
    | 'email'
    | 'strongPassword'
    | 'basicPassword'
    | 'numbersOnly'
    | 'lettersOnly'
    | 'url'
    | 'phone'
    | 'custom'
  step?: number
  precision?: number
  format?: string
}

interface ColumnMeta {
  key: string
  title: string
  type: 'text' | 'date' | 'number' | 'formula'
  width?: string
  formula?: (row: any) => any
  validation?: ValidationMeta
}

interface Props {
  meta: {
    columns: ColumnMeta[]
  }
  data: {
    id: number
    [key: string]: any
  }[]
  pagination?: {
    currentPage: number
    totalItems: number
    itemsPerPage: number
  }
  sorted?: {
    key: string
    direction: 'asc' | 'desc'
  }
}

const props = defineProps<Props>()
const emit = defineEmits([
  'copy',
  'delete',
  'update:itemsPerPage',
  'update:page',
  'save',
  'sort',
  'add'
])

const selectedRows = ref<{ [key: number]: boolean }>({})
const selectAll = ref(false)
const itemsPerPage = ref(props.pagination?.itemsPerPage || 10)
const currentPage = ref(props.pagination?.currentPage || 1)
const isEditMode = ref(false)
const editedData = ref<{ [key: number]: { [key: string]: any } }>({})
const editedDataErrors = ref<{ [key: number]: { [key: string]: string } }>(
  {}
)
const newRows = ref<number[]>([])

// Проверка наличия выбранных строк
const hasSelected = computed(() =>
  Object.values(selectedRows.value).some(v => v)
)

// Получение данных строки (с учетом редактирования)
const getRowData = (index: number) => {
  const rowData = editedData.value[index] || props.data[index]
  if (!rowData) return {}

  const processedData = { ...rowData }
  props.meta.columns.forEach(column => {
    if (column.type === 'date') {
      processedData[column.key] = processedData[column.key]
        ? new Date(processedData[column.key])
        : null
    }
  })
  return processedData
}

// Вычисляемые данные для отображения
const displayData = computed(() => {
  const allData = [...props.data]

  // Добавляем новые строки
  newRows.value.forEach(newRowIndex => {
    if (editedData.value[newRowIndex]) {
      allData.push(editedData.value[newRowIndex])
    }
  })

  return allData.map(row => {
    const displayRow = { ...row }
    props.meta.columns.forEach(column => {
      if (column.type === 'date' && displayRow[column.key]) {
        displayRow[column.key] = new Date(displayRow[column.key])
      }
    })
    return displayRow
  })
})

// Функция для проверки, является ли строка новой
const isNewRow = (index: number) => {
  return newRows.value.includes(index)
}

// Получение индексов выбранных строк
const getSelectedIndices = () => {
  return Object.entries(selectedRows.value)
    .filter(([_, selected]) => selected)
    .map(([index]) => parseInt(index))
}

// Инициализация данных для редактирования
const initEditedData = () => {
  editedData.value = props.data.reduce((acc, row, index) => {
    acc[index] = { ...row }
    props.meta.columns.forEach(column => {
      if (column.type === 'date') {
        acc[index][column.key] = acc[index][column.key]
          ? new Date(acc[index][column.key])
          : null
      }
    })
    return acc
  }, {} as { [key: number]: { [key: string]: any } })
}

// Функция начала редактирования
const startEdit = () => {
  isEditMode.value = true
  initEditedData()
}

// Функция отмены редактирования
const cancelEdit = () => {
  isEditMode.value = false
  editedData.value = {}
  editedDataErrors.value = {}
  newRows.value = []
  selectedRows.value = {}
  selectAll.value = false
}

// Добавим новые методы для обработки валидации
const handleValidationError = (
  rowIndex: number,
  columnKey: string,
  errorType: string,
  params?: any
) => {
  if (!editedDataErrors.value[rowIndex]) {
    editedDataErrors.value[rowIndex] = {}
  }
  editedDataErrors.value[rowIndex][columnKey] = getValidationMessage(
    errorType,
    params
  )
}

const clearValidationError = (rowIndex: number, columnKey: string) => {
  if (editedDataErrors.value[rowIndex]) {
    delete editedDataErrors.value[rowIndex][columnKey]
    if (Object.keys(editedDataErrors.value[rowIndex]).length === 0) {
      delete editedDataErrors.value[rowIndex]
    }
  }
}

// Обновим метод saveChanges с проверкой валидации
const saveChanges = () => {
  // Проверяем наличие ошибок валидации
  if (Object.keys(editedDataErrors.value).length > 0) {
    // Если есть ошибки, не позволяем сохранить
    return
  }

  // Собираем все изменения
  const changes = {
    edited: {} as { [key: number]: any },
    new: [] as any[]
  }

  // Обрабатываем отредактированные строки
  Object.entries(editedData.value).forEach(([index, rowData]) => {
    const idx = parseInt(index)
    if (isNewRow(idx)) {
      changes.new.push(rowData)
    } else {
      changes.edited[idx] = rowData
    }
  })

  emit('save', changes)
  cancelEdit()
}

// Обновим метод addNewRow
const addNewRow = () => {
  const newIndex = props.data.length + newRows.value.length

  // Создаем новую строку с значениями по умолчанию
  const newRow = props.meta.columns.reduce((acc, column) => {
    if (column.type !== 'formula') {
      switch (column.type) {
        case 'date':
          acc[column.key] = null
          break
        case 'number':
          acc[column.key] = null
          break
        case 'text':
          acc[column.key] = ''
          break
        default:
          acc[column.key] = null
      }
    }
    return acc
  }, {} as { [key: string]: any })

  // Добавляем временный id для новой строки (будет заменен на серверный после сохранения)
  newRow.id = -1 * (newRows.value.length + 1) // Используем отрицательные id для новых строк

  // Добавляем новую строку в editedData
  editedData.value[newIndex] = newRow

  // Добавляем индекс в список новых строк
  newRows.value.push(newIndex)
}

// Копирование выбранных строк
const copySelected = () => {
  const selectedIndices = getSelectedIndices()

  // Получаем данные выбранных строк
  const selectedData = selectedIndices.map(index => {
    // Определяем, является ли строка новой или существующей
    const sourceData = isNewRow(index)
      ? editedData.value[index]
      : props.data[index]

    // Создаем глубокую копию данных
    const rowData = { ...sourceData }

    // Обрабатываем специальные типы данных
    props.meta.columns.forEach(column => {
      if (column.type === 'date' && rowData[column.key]) {
        // Если значение уже является объектом Date, создаем новый объект Date
        // Если значение - строка, парсим ее в Date
        rowData[column.key] =
          rowData[column.key] instanceof Date
            ? new Date(rowData[column.key].getTime())
            : new Date(rowData[column.key])
      }
      // Пропускаем формулы, так как они вычисляются
      if (column.type === 'formula') {
        delete rowData[column.key]
      }
    })

    return rowData
  })

  // Добавляем скопированные строки как новые
  selectedData.forEach(rowData => {
    const newIndex = props.data.length + newRows.value.length
    editedData.value[newIndex] = rowData
    newRows.value.push(newIndex)
  })

  // Снимаем выделение со всех строк
  Object.keys(selectedRows.value).forEach(key => {
    selectedRows.value[key] = false
  })
  selectAll.value = false
}

// Удаление выбранных строк
const deleteSelected = () => {
  const selectedIndices = getSelectedIndices()
  selectedIndices.sort((a, b) => b - a)

  // Разделяем индексы на новые и существующие строки
  const newRowIndices: number[] = []
  const existingRowIndices: number[] = []

  selectedIndices.forEach(index => {
    if (isNewRow(index)) {
      newRowIndices.push(index)
    } else {
      existingRowIndices.push(index)
    }
  })

  // Удаляем новые строки
  newRowIndices.forEach(index => {
    const newRowIndex = newRows.value.indexOf(index)
    if (newRowIndex > -1) {
      newRows.value.splice(newRowIndex, 1)
      delete editedData.value[index]
      delete selectedRows.value[index]
    }
  })

  // Отправляем на удаление только существующие строки
  if (existingRowIndices.length > 0) {
    emit('delete', existingRowIndices)
  }
  selectAll.value = false
}

// Переключение выделения всех строк
const toggleSelectAll = () => {
  const newValue = selectAll.value
  props.data.forEach((_, index) => {
    selectedRows.value[index] = newValue
  })
  newRows.value.forEach(index => {
    selectedRows.value[index] = newValue
  })
}

// Обработка изменения страницы
const onPageChange = (page: number) => {
  currentPage.value = page
  emit('update:page', page)
}

// Обработка изменения количества элементов на странице
const onItemsPerPageChange = () => {
  emit('update:itemsPerPage', itemsPerPage.value)
}

// Обработка сортировки
const handleSort = (columnKey: string) => {
  if (props.sorted?.key === columnKey) {
    emit('sort', {
      key: columnKey,
      direction: props.sorted.direction === 'asc' ? 'desc' : 'asc'
    })
  } else {
    emit('sort', {
      key: columnKey,
      direction: 'asc'
    })
  }
}

// Вычисляемые данные для отображения
const computedTotalPages = computed(() => {
  if (!props.pagination) return 1
  return Math.ceil(
    props.pagination.totalItems / props.pagination.itemsPerPage
  )
})

const gridTemplateColumns = computed(() => ({
  'grid-template-columns': isEditMode.value
    ? `50px repeat(${props.meta.columns.length}, minmax(150px, 1fr))`
    : `repeat(${props.meta.columns.length}, minmax(150px, 1fr))`
}))

// Обновляем функцию getValidationPattern
const getValidationPattern = (
  validation?: ValidationMeta
): RegExp | string | null => {
  if (!validation) return ''

  // Если указан тип валидации, используем его
  if (validation.type && validation.type !== 'custom') {
    switch (validation.type) {
      case 'email':
        return '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
      case 'numbersOnly':
        return '^\\d+$'
      case 'lettersOnly':
        return '^[a-zA-Zа-яА-Я\\s]+$'
      case 'url':
        return "^https?:\\/\\/[\\w\\d\\-._~:/?#[\\]@!$&'()*+,;=]+$"
      case 'phone':
        return '^\\+?[\\d\\s-()]+$'
      default:
        return ''
    }
  }

  // Если указан кастомный паттерн, используем его
  if (validation.pattern) {
    if (typeof validation.pattern === 'string') {
      return validation.pattern
    }
    return validation.pattern.toString()
  }

  return ''
}

// Update toolbarTexts without translations
const toolbarTexts = computed(() => ({
  rowsPerPage: 'Строк на странице',
  editMode: 'Редактировать',
  actions: {
    delete: 'Удалить',
    copy: 'Копировать',
    cancel: 'Отмена',
    save: 'Сохранить'
  }
}))

// Update validation messages without translations
const getValidationMessage = (type: string, params?: any) => {
  const messages: { [key: string]: string } = {
    required: 'Обязательное поле',
    minLength: 'Минимальная длина: ${min} символов',
    maxLength: 'Максимальная длина: ${max} символов',
    min: 'Минимальное значение: ${min}',
    max: 'Максимальное значение: ${max}',
    email: 'Некорректный email',
    url: 'Некорректный URL',
    phone: 'Некорректный номер телефона',
    numbersOnly: 'Только цифры',
    lettersOnly: 'Только буквы',
    pattern: 'Некорректное значение',
    date: 'Некорректная дата'
  }
  return messages[type] || 'Ошибка валидации'
}

// Update sort titles without translations
const getSortTitle = (columnKey: string) => {
  if (props.sorted?.key === columnKey) {
    return props.sorted.direction === 'asc'
      ? 'Сортировать по убыванию'
      : 'Сортировать по возрастанию'
  }
  return 'Сортировать по возрастанию'
}

// Update pagination text without translations
const paginationText = computed(() => {
  if (!props.pagination) return ''

  const start =
    (props.pagination.currentPage - 1) * props.pagination.itemsPerPage + 1
  const end = Math.min(
    start + props.pagination.itemsPerPage - 1,
    props.pagination.totalItems
  )

  return `Показано ${start} - ${end} из ${props.pagination.totalItems} записей`
})

// Add loading and error states
const loading = ref(false)
const error = ref(false)
</script>

<style scoped>
.table-wrapper {
  width: 100%;
}

.table-container {
  border: 1px solid var(--border-color);
  border-radius: 0.375rem;
  overflow: auto;
  position: relative;
}

.table-grid {
  display: grid;
}

.table-header-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  user-select: none;
}

.table-cell {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Определяем переменные для всех тем */
:root {
  --border-color: #e5e5e5;
  --surface-color: #f8fafc;
  --text-primary: #171717;
  --text-secondary: #404040;
  --text-tertiary: #737373;
  --primary-color: #000080;
  --primary-hover: #00007a;
  --primary-light: rgba(0, 0, 128, 0.1);
}

.dark {
  --border-color: #404040;
  --surface-color: #171717;
  --text-primary: #f8fafc;
  --text-secondary: #e5e5e5;
  --text-tertiary: #a3a3a3;
  --primary-color: #3333ff;
  --primary-hover: #6666ff;
  --primary-light: rgba(51, 51, 255, 0.1);
}

.high-contrast {
  --border-color: #000000;
  --surface-color: #ffffff;
  --text-primary: #000000;
  --text-secondary: #000000;
  --text-tertiary: #000000;
  --primary-color: #000000;
  --primary-hover: #000000;
  --primary-light: rgba(0, 0, 0, 0.1);
}

.dark.high-contrast {
  --border-color: #ffffff;
  --surface-color: #000000;
  --text-primary: #ffffff;
  --text-secondary: #ffffff;
  --text-tertiary: #ffffff;
  --primary-color: #ffffff;
  --primary-hover: #ffffff;
  --primary-light: rgba(255, 255, 255, 0.1);
}

/* Применяем переменные к компонентам */
.table-container {
  background-color: var(--surface-color);
  border-color: var(--border-color);
}

.table-header-cell {
  background-color: var(--primary-color);
  color: var(--surface-color);
}

.table-cell {
  border-color: var(--border-color);
}

.table-cell:nth-child(even) {
  background-color: var(--surface-color);
}

.table-cell:nth-child(odd) {
  background-color: var(--primary-light);
}

/* Стили для кнопок */
button {
  transition: all 0.2s ease-in-out;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Стили для селекта */
select {
  background-color: var(--surface-color);
  color: var(--text-primary);
  border-color: var(--border-color);
}

select:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px var(--primary-light);
}

/* Стили для опций в селекте */
option {
  background-color: var(--surface-color);
  color: var(--text-primary);
}

/* Стили для состояния загрузки и ошибок */
.loading-state,
.error-state,
.no-data-state {
  color: var(--text-secondary);
}

.error-state {
  color: #ef4444;
}

/* Add new styles for datepicker container */
:deep(.datepicker-container) {
  position: static;
}

:deep(.datepicker-container > div[class*='absolute']) {
  position: fixed;
  z-index: 1000;
}
</style>
