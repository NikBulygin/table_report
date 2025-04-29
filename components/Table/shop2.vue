<template>
  <div class="w-[90%] mx-auto overflow-x-auto">
    <!-- Заголовки таблицы -->
    <div
      class="grid grid-cols-[40px,repeat(15,140px)] font-bold border-b pb-2 mb-2"
    >
      <div class="p-2"></div>
      <div v-for="col in columns" :key="col.key" class="p-2">
        {{ col.label }}
      </div>
    </div>

    <!-- Сообщение при отсутствии данных -->
    <div v-if="items.length === 0" class="p-4 text-gray-400">
      Нет данных
    </div>

    <!-- Строки таблицы -->
    <div class="grid grid-cols-[40px,repeat(15,140px)]" v-else>
      <div
        v-for="row in items"
        :key="row.uniqueId || row.id"
        class="contents group"
      >
        <!-- Чекбокс -->
        <div class="p-2 border-b group-hover:bg-gray-50 flex items-center">
          <input
            type="checkbox"
            :checked="store.selectedIds.includes(row.id)"
            @change="toggleSelect(row.id, $event)"
          />
        </div>

        <!-- Ячейки данных -->
        <div
          v-for="col in columns"
          :key="col.key"
          class="p-2 border-b group-hover:bg-gray-50"
        >
          <template
            v-if="store.isEditMode && editableFields.includes(col.key)"
          >
            <input
              :value="getEditValue(row.id, col.key)"
              @input="setEditValue(row.id, col.key, $event.target.value)"
              :type="col.type"
              class="border rounded px-1 py-0.5 w-full"
            />
          </template>
          <template v-else>
            <span v-if="col.type === 'date'">
              {{
                getNestedValue(row, col.key)
                  ? new Date(
                      getNestedValue(row, col.key)
                    ).toLocaleDateString()
                  : ''
              }}
            </span>
            <span v-else>
              {{ getNestedValue(row, col.key) }}
            </span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useShopDataStore } from '~/stores/shopData'

const props = defineProps<{ items: any[] }>()
const store = useShopDataStore()

// Только эти поля можно редактировать руками (см. @shop2.ts)
const editableFields = [
  'numberVagonOrTank',
  'weight',
  'perMetVklCert',
  'perTioCert',
  'perH2oCert',
  'MiroDocument',
  'InvoiceNumber',
  'InvoiceDate',
  'GtdNumber',
  'GtdDate'
]

// Жёстко задаём нужные колонки и порядок (вычисляемые и исходные)
const columns = [
  {
    key: 'items.0.numberVagonOrTank',
    label: 'Номер вагона/танка',
    type: 'text'
  },
  { key: 'items.0.weight', label: 'Вес', type: 'number' },
  {
    key: 'items.0.perMetVklCert',
    label: 'Металл по сертификату (%)',
    type: 'number'
  },
  {
    key: 'items.0.perTioCert',
    label: 'TiO2 по сертификату (%)',
    type: 'number'
  },
  {
    key: 'items.0.perH2oCert',
    label: 'H2O по сертификату (%)',
    type: 'number'
  },
  { key: 'items.0.H2OWeight', label: 'Влажность (тонн)', type: 'number' },
  { key: 'items.0.DryWeight', label: 'Сухой вес', type: 'number' },
  { key: 'items.0.MetalTon', label: 'Металл (тонн)', type: 'number' },
  { key: 'items.0.MinusMetal', label: 'Вес минус металл', type: 'number' },
  {
    key: 'items.0.standart80Tio2',
    label: 'Стандарт 80 TiO2',
    type: 'number'
  },
  { key: 'MiroDocument', label: 'Номер миро', type: 'text' },
  { key: 'InvoiceNumber', label: 'Номер инвойса', type: 'text' },
  { key: 'InvoiceDate', label: 'Дата инвойса', type: 'date' },
  { key: 'GtdNumber', label: 'Номер ГТД', type: 'text' },
  { key: 'GtdDate', label: 'Дата ГТД', type: 'date' }
]

const editBuffer = ref<{ [id: string]: any }>({})

watch(
  () => store.isEditMode,
  val => {
    if (val) {
      editBuffer.value = {}
      for (const row of props.items) {
        editBuffer.value[row.id] = { ...row }
      }
    } else {
      // При выходе из режима редактирования — обновить данные с сервера
      store.fetchData()
      editBuffer.value = {}
    }
  },
  { immediate: true }
)

function getNestedValue(obj: any, path: string) {
  const keys = path.split('.')
  let value = obj
  for (const key of keys) {
    if (value === undefined || value === null) return ''
    value = value[key]
  }
  return value
}

function getEditValue(id: string | number, key: string) {
  const row = editBuffer.value[id]
  if (!row) return ''
  return getNestedValue(row, key)
}

function setEditValue(id: string | number, key: string, value: any) {
  if (!editBuffer.value[id]) editBuffer.value[id] = {}
  const keys = key.split('.')
  let current = editBuffer.value[id]

  for (let i = 0; i < keys.length - 1; i++) {
    if (!current[keys[i]]) current[keys[i]] = {}
    current = current[keys[i]]
  }

  current[keys[keys.length - 1]] = value
}

function toggleSelect(id, e) {
  if (e.target.checked) store.selectRow(id)
  else store.deselectRow(id)
}
</script>
