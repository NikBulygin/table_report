<template>
  <div>
    <div class="flex flex-row font-bold border-b pb-2 mb-2">
      <div class="p-2 min-w-[40px]"></div>
      <div v-for="col in columns" :key="col.key" class="p-2 min-w-[140px]">
        {{ col.label }}
      </div>
    </div>
    <div class="flex flex-col">
      <div
        v-for="row in items"
        :key="row.uniqueId || row.id"
        class="flex flex-row items-center border-b hover:bg-gray-50"
      >
        <div class="p-2 min-w-[40px]">
          <input
            type="checkbox"
            :checked="store.selectedIds.includes(row.id)"
            @change="toggleSelect(row.id, $event)"
          />
        </div>
        <div
          v-for="col in columns"
          :key="col.key"
          class="p-2 min-w-[140px]"
        >
          <template v-if="store.isEditMode">
            <input
              :value="getEditValue(row.id, col.key)"
              @input="setEditValue(row.id, col.key, $event.target.value)"
              :type="col.type"
              class="border rounded px-1 py-0.5 w-full"
              @blur="saveEdit(row)"
            />
          </template>
          <template v-else>
            <span v-if="col.type === 'date'">
              {{
                row[col.key]
                  ? new Date(row[col.key]).toLocaleDateString()
                  : ''
              }}
            </span>
            <span v-else>
              {{ row[col.key] }}
            </span>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useShopDataStore } from '~/stores/shopData'

const props = defineProps<{ items: any[] }>()
const store = useShopDataStore()

// Жёстко задаём нужные колонки и порядок
const columns = [
  { key: 'standart80Tio2', label: 'Стандарт TIO общий', type: 'number' },
  { key: 'MiroDocument', label: 'Номер миро', type: 'text' },
  { key: 'InvoiceNumber', label: 'Номер инвойса', type: 'text' },
  { key: 'InvoiceDate', label: 'Дата инвойса', type: 'date' },
  { key: 'GtdNumber', label: 'Номер ГТД', type: 'text' },
  { key: 'GtdDate', label: 'Дата ГТД', type: 'date' }
]

const editBuffer = ref<{ [id: string]: any }>({})

// Сбросить editBuffer при выходе из режима редактирования
watch(
  () => store.isEditMode,
  val => {
    if (val) {
      // Войти в режим редактирования — скопировать все строки
      editBuffer.value = {}
      for (const row of props.items) {
        editBuffer.value[row.id] = { ...row }
      }
    } else {
      editBuffer.value = {}
    }
  },
  { immediate: true }
)

function getEditValue(id: string | number, key: string) {
  return editBuffer.value[id]?.[key] ?? ''
}
function setEditValue(id: string | number, key: string, value: any) {
  if (!editBuffer.value[id]) editBuffer.value[id] = {}
  editBuffer.value[id][key] = value
}
function saveEdit(row: any) {
  if (!store.isEditMode) return
  store.editItem({ ...editBuffer.value[row.id] })
}
function toggleSelect(id, e) {
  if (e.target.checked) store.selectRow(id)
  else store.deselectRow(id)
}
</script>
