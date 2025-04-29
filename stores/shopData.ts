import { defineStore } from 'pinia'
import { Shop2Filter, Shop2GTD } from '~/composables/shop2'
import { Shop12Filter, Shop12GTD } from '~/composables/shop12'

export const useShopDataStore = defineStore('shopData', {
  state: () => ({
    items: [] as any[],
    itemsDelete: [] as any[],
    itemsEdit: [] as any[],
    pagination: {
      total: 0,
      currentPage: 1,
      pageSize: 10,
      totalPages: 0
    },
    loading: false,
    error: null as string | null,
    filter: {
      month: '',
      pagination: {
        pageSize: 10,
        currentPage: 1
      }
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
            this.filter.pagination
          )
          result = await Shop2GTD.findWithFilter(filter)
        } else {
          const filter = new Shop12Filter(
            startDate,
            endDate,
            this.filter.pagination
          )
          result = await Shop12GTD.findWithFilter(filter)
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
      if (editedItems.length > 0) {
        this.items = editedItems
      }
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
      this.clearSelection()
    },
    reset() {
      this.items = []
      this.itemsDelete = []
      this.itemsEdit = []
      this.pagination = {
        total: 0,
        currentPage: 1,
        pageSize: 10,
        totalPages: 0
      }
      this.loading = false
      this.error = null
      this.filter = {
        month: '',
        pagination: {
          pageSize: 10,
          currentPage: 1
        }
      }
      this.isEditMode = false
      this.selectedIds = []
      this.editBuffer = {}
    }
  }
})
