import { defineStore } from 'pinia'

interface ShopItem {
  id?: number
  [key: string]: any
}

interface ShopState {
  items: ShopItem[]
  shopName: string
  filters: {
    date: string
    invoice: string
  }
  summary: Shop12Summary | Shop2Summary
}

export const useShopStore = defineStore('shop', {
  state: (): ShopState => {
    // Получаем текущую дату в формате месяц-год
    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const year = today.getFullYear()
    const defaultDate = `${month}-${year}`

    return {
      items: [],
      shopName: '',
      filters: {
        date: defaultDate,
        invoice: ''
      },
      summary: {
        weight: 0,
        tio2Analysis: 0,
        h2oAnalysis: 0,
        recalculatedWeight: 0
      }
    }
  },

  getters: {
    filteredItems: state => {
      return state.items.filter(item => {
        // Фильтр по дате (месяц-год)
        if (state.filters.date) {
          const itemDate = new Date(item.InvoiceDate)
          const [month, year] = state.filters.date.split('-')
          const filterDate = new Date(parseInt(year), parseInt(month) - 1)

          if (
            itemDate.getMonth() !== filterDate.getMonth() ||
            itemDate.getFullYear() !== filterDate.getFullYear()
          ) {
            return false
          }
        }

        // Фильтр по номеру инвойса
        if (
          state.filters.invoice &&
          !item.InvoiceNumber.toLowerCase().includes(
            state.filters.invoice.toLowerCase()
          )
        ) {
          return false
        }

        return true
      })
    }
  },

  actions: {
    setShopName(name: string) {
      this.shopName = name
    },

    setItems(items: ShopItem[]) {
      this.items = items
    },

    setSummary(summary: Shop12Summary | Shop2Summary) {
      this.summary = summary
    },

    setFilters(filters: Partial<{ date: string; invoice: string }>) {
      this.filters = { ...this.filters, ...filters }
    },

    createItem(item: ShopItem) {
      const newItem = { ...item, id: Date.now() }
      this.items.push(newItem)
      console.log('Creating item:', newItem)
      // TODO: Implement API call
      return newItem
    },

    updateItem(id: number, updates: Partial<ShopItem>) {
      const index = this.items.findIndex(item => item.id === id)
      if (index !== -1) {
        this.items[index] = { ...this.items[index], ...updates }
        console.log('Updating item:', this.items[index])
        // TODO: Implement API call
        return this.items[index]
      }
      return null
    },

    deleteItem(id: number) {
      const index = this.items.findIndex(item => item.id === id)
      if (index !== -1) {
        const deletedItem = this.items[index]
        this.items.splice(index, 1)
        console.log('Deleting item:', deletedItem)
        // TODO: Implement API call
        return deletedItem
      }
      return null
    },

    async fetchItems() {
      try {
        const response = await $fetch<Shop12Response | Shop2Response>(
          `/api/${this.shopName}`,
          {
            query: {
              date: this.filters.date,
              invoice: this.filters.invoice
            }
          }
        )
        this.items = response.items
        this.summary = response.summary
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }
  }
})
