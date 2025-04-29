import { defineStore } from 'pinia'
import { Shop2Filter, Shop2GTD } from '~/composables/shop2'
import { Shop12Filter, Shop12GTD } from '~/composables/shop12'

function validateNewRow(row: any): string | null {
  // Описание полей с их человекочитаемыми названиями и правилами валидации
  interface FieldDefinition {
    key: string
    label: string
    required: boolean
    type: 'text' | 'number' | 'date'
    min?: number
    max?: number
    minLength?: number
    validate?: (value: any) => string | null
  }

  const fields: FieldDefinition[] = [
    {
      key: 'Invoices.0.Items.0.numberVagonOrTank',
      label: 'Номер вагона/танка',
      required: true,
      type: 'text',
      minLength: 1,
      validate: (value: string) =>
        value.trim().length > 0 ? null : 'не может быть пустым'
    },
    {
      key: 'Invoices.0.Items.0.weight',
      label: 'Вес',
      required: true,
      type: 'number',
      min: 0.001,
      validate: (value: number) =>
        value > 0 ? null : 'должен быть больше 0'
    },
    {
      key: 'Invoices.0.Items.0.perMetVklCert',
      label: 'Металл по сертификату (%)',
      required: true,
      type: 'number',
      min: 0,
      max: 100,
      validate: (value: number) =>
        value >= 0 && value <= 100 ? null : 'должен быть от 0 до 100'
    },
    {
      key: 'Invoices.0.Items.0.perTioCert',
      label: 'TiO2 по сертификату (%)',
      required: true,
      type: 'number',
      min: 0,
      max: 100,
      validate: (value: number) =>
        value >= 0 && value <= 100 ? null : 'должен быть от 0 до 100'
    },
    {
      key: 'Invoices.0.Items.0.perH2oCert',
      label: 'H2O по сертификату (%)',
      required: true,
      type: 'number',
      min: 0,
      max: 100,
      validate: (value: number) =>
        value >= 0 && value <= 100 ? null : 'должен быть от 0 до 100'
    },
    {
      key: 'Invoices.0.MiroDocument',
      label: 'Номер миро',
      required: false,
      type: 'text'
    },
    {
      key: 'Invoices.0.InvoiceNumber',
      label: 'Номер инвойса',
      required: true,
      type: 'text',
      validate: (value: string) =>
        value.trim().length > 0 ? null : 'не может быть пустым'
    },
    {
      key: 'Invoices.0.InvoiceDate',
      label: 'Дата инвойса',
      required: true,
      type: 'date',
      validate: (value: string) => {
        const date = new Date(value)
        return !isNaN(date.getTime())
          ? null
          : 'должна быть указана корректно'
      }
    },
    {
      key: 'GtdNumber',
      label: 'Номер ГТД',
      required: true,
      type: 'text',
      validate: (value: string) =>
        value.trim().length > 0 ? null : 'не может быть пустым'
    },
    {
      key: 'GtdDate',
      label: 'Дата ГТД',
      required: true,
      type: 'date',
      validate: (value: string) => {
        const date = new Date(value)
        return !isNaN(date.getTime())
          ? null
          : 'должна быть указана корректно'
      }
    }
  ]

  function getNestedValue(obj: any, path: string) {
    const keys = path.split('.')
    let value = obj

    for (const key of keys) {
      if (!value) return ''
      if (Array.isArray(value) && !isNaN(Number(key))) {
        value = value[Number(key)]
      } else {
        value = value[key]
      }
    }
    return value ?? ''
  }

  // Проверяем все поля
  for (const field of fields) {
    const rawValue = getNestedValue(row, field.key)

    // Проверка на обязательность
    if (field.required) {
      if (field.type === 'number') {
        if (
          rawValue === '' ||
          rawValue === null ||
          rawValue === undefined ||
          isNaN(Number(rawValue))
        ) {
          return `Поле "${field.label}" обязательно для заполнения и должно быть числом`
        }
      } else if (!rawValue && rawValue !== 0) {
        return `Поле "${field.label}" обязательно для заполнения`
      }
    }

    // Если значение есть (даже если поле не обязательное), проверяем его корректность
    if (rawValue !== '' && rawValue !== null && rawValue !== undefined) {
      // Проверка типа и преобразование
      let validValue: string | number | Date = rawValue
      if (field.type === 'number') {
        const numValue = Number(rawValue)
        if (isNaN(numValue)) {
          return `Поле "${field.label}" должно быть числом`
        }
        validValue = numValue
      }

      // Дополнительная валидация если есть
      if (field.validate) {
        const error = field.validate(validValue)
        if (error) {
          return `Поле "${field.label}" ${error}`
        }
      }
    }
  }

  return null
}

export const useShopDataStore = defineStore('shopData', {
  state: () => ({
    items: [] as (Shop2GTD | Shop12GTD)[],
    itemsDelete: [] as any[],
    itemsEdit: [] as any[],
    pagination: {
      total: 0,
      currentPage: 1,
      totalPages: 0
    },
    loading: false,
    error: null as string | null,
    totalStandart80Tio2: 0,
    filter: {
      month: '',
      pagination: {
        pageSize: 10,
        currentPage: 1
      },
      invoiceNumbers: [] as string[],
      gtdNumbers: [] as string[]
    },
    shopType: 'shop2' as 'shop2' | 'shop12',
    isEditMode: false,
    selectedIds: [] as (number | string)[],
    editBuffer: {} as Record<string, any>
  }),
  actions: {
    setShopType(type: 'shop2' | 'shop12') {
      this.shopType = type
    },
    setMonth(month: string) {
      this.filter.month = month
    },
    setPage(page: number) {
      this.filter.pagination.currentPage = page
    },
    setPageSize(size: number) {
      this.filter.pagination.pageSize = size
    },
    deleteItem(itemId: number | string) {
      if (typeof itemId === 'string' && itemId.startsWith('new_')) {
        delete this.editBuffer[itemId]
        return
      }
      const idx = this.items.findIndex(item => item.id === itemId)
      if (idx !== -1) {
        const [removed] = this.items.splice(idx, 1)
        this.itemsDelete.push(removed)
      }
    },
    editItem(editedItem: any) {
      const idx = this.items.findIndex(item => item.id === editedItem.id)
      if (idx !== -1) {
        const [removed] = this.items.splice(idx, 1)
        const editIdx = this.itemsEdit.findIndex(
          item => item.id === editedItem.id
        )
        if (editIdx !== -1) {
          this.itemsEdit[editIdx] = editedItem
        } else {
          this.itemsEdit.push(editedItem)
        }
      }
    },
    async fetchData() {
      this.loading = true
      this.error = null
      try {
        const month = this.filter.month
        if (!month) return
        const startDate = new Date(month)
        const endDate = new Date(
          startDate.getFullYear(),
          startDate.getMonth() + 1,
          0
        )
        let result
        if (this.shopType === 'shop2') {
          const filter = new Shop2Filter(
            startDate,
            endDate,
            this.filter.pagination,
            undefined,
            this.filter.invoiceNumbers,
            this.filter.gtdNumbers
          )
          result = await Shop2GTD.findWithFilter(filter)
          this.totalStandart80Tio2 = result.totalStandart80Tio2 || 0
        } else {
          const filter = new Shop12Filter(
            startDate,
            endDate,
            this.filter.pagination
          )
          result = await Shop12GTD.findWithFilter(filter)
          this.totalStandart80Tio2 = 0
        }
        this.items = result.items
        this.pagination = result.pagination
      } catch (e: any) {
        this.error = e?.message || 'Ошибка загрузки данных'
      } finally {
        this.loading = false
      }
    },
    toggleEditMode() {
      this.isEditMode = !this.isEditMode
      if (!this.isEditMode) {
        this.editBuffer = {}
      } else {
        this.editBuffer = { ...this.items }
      }
    },
    cancelEdit() {
      this.isEditMode = false
      this.editBuffer = {}
      this.fetchData()
    },
    applyEdit() {
      const editedItems = Object.values(this.editBuffer)
      console.log(editedItems)
      // Проверяем все новые записи на валидность
      const newItems = editedItems.filter(
        item => typeof item.id === 'string' && item.id.startsWith('new_')
      )
      console.log('Новые записи для валидации:', newItems)

      for (const item of newItems) {
        const error = validateNewRow(item)
        if (error) {
          alert(`Ошибка в новой строке: ${error}`)
          return
        }
      }

      if (editedItems.length > 0) {
        this.items = [
          ...this.items.filter(
            item => !editedItems.some(e => e.id === item.id)
          ),
          ...editedItems
        ]
      }
      console.log('editedData', editedItems)
      this.isEditMode = false
      this.editBuffer = {}
    },
    selectRow(id: number | string) {
      if (!this.selectedIds.includes(id)) {
        this.selectedIds.push(id)
      }
    },
    deselectRow(id: number | string) {
      this.selectedIds = this.selectedIds.filter(x => x !== id)
    },
    clearSelection() {
      this.selectedIds = []
    },
    deleteSelected() {
      this.selectedIds.forEach(id => this.deleteItem(id))
      console.log('deleted data', this.selectedIds)
      this.clearSelection()
    },
    reset() {
      this.items = []
      this.itemsDelete = []
      this.itemsEdit = []
      this.pagination = {
        total: 0,
        currentPage: 1,
        totalPages: 0
      }
      this.loading = false
      this.error = null
      this.totalStandart80Tio2 = 0
      this.filter = {
        month: '',
        pagination: {
          pageSize: 10,
          currentPage: 1
        },
        invoiceNumbers: [],
        gtdNumbers: []
      }
      this.isEditMode = false
      this.selectedIds = []
      this.editBuffer = {}
    }
  }
})
