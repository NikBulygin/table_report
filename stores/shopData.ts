import { defineStore } from 'pinia'
import { Shop2Filter, Shop2GTD } from '~/composables/shop2'
import { Shop12Filter, Shop12GTD } from '~/composables/shop12'

export const useShopDataStore = defineStore('shopData', {
  state: () => ({
    items: [] as any[],
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
    shopType: 'shop2' as 'shop2' | 'shop12'
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
    }
  }
})
