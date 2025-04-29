export class Shop12Item {
  constructor(
    public vagonNumber: string,
    public weight: number,
    public tio2Analysis: number,
    public h2oAnalysis: number
  ) {}

  // ВЕС ПЕРЕРАСЧЕТ = ВЕС *(100-H2O) * TIO2 / 4200
  get recalculatedWeight(): number {
    return Number(
      (
        (this.weight * (100 - this.h2oAnalysis) * this.tio2Analysis) /
        4200
      ).toFixed(3)
    )
  }
}

export class Shop12Invoice {
  constructor(
    public InvoiceNumber: string,
    public InvoiceDate: Date,
    public items: Shop12Item[] = []
  ) {}

  // ТОТАЛ СУММА ВСЕХ ВЕС ПЕРЕРАСЧЕТ
  get TotalWeight(): number {
    return Number(
      this.items
        .reduce((sum, item) => sum + item.recalculatedWeight, 0)
        .toFixed(3)
    )
  }

  addItem(item: Shop12Item): void {
    this.items.push(item)
  }
}

export class Shop12Filter {
  constructor(
    public startDate?: Date,
    public endDate?: Date,
    public pagination: {
      pageSize: number
      currentPage: number
    } = { pageSize: 10, currentPage: 1 },
    public orderBy?: {
      field: 'GtdDate' | 'InvoiceDate' | 'weight' | 'recalculatedWeight'
      direction: 'asc' | 'desc'
    }
  ) {}
}

export class Shop12GTD {
  constructor(
    public GtdNumber: string,
    public GtdDate: Date,
    public invoices: Shop12Invoice[] = []
  ) {}

  addInvoice(invoice: Shop12Invoice): void {
    this.invoices.push(invoice)
  }

  static async findWithFilter(filter: Shop12Filter) {
    const query = new URLSearchParams()

    if (filter.startDate)
      query.append('startDate', filter.startDate.toISOString())
    if (filter.endDate)
      query.append('endDate', filter.endDate.toISOString())
    query.append('pageSize', filter.pagination.pageSize.toString())
    query.append('currentPage', filter.pagination.currentPage.toString())
    if (filter.orderBy) {
      query.append('orderBy', filter.orderBy.field)
      query.append('direction', filter.orderBy.direction)
    }

    const response = await fetch(`/api/shop12?${query.toString()}`)
    if (!response.ok) {
      throw new Error('Failed to fetch Shop12 data')
    }

    return response.json()
  }
}

// Example usage:
/*
const gtd = new Shop12GTD('GTD-001', new Date())

const invoice = new Shop12Invoice('INV-001', new Date())
const item = new Shop12Item('123456', 100, 60, 10)

invoice.addItem(item)
gtd.addInvoice(invoice)

console.log(item.recalculatedWeight) // Calculated value
console.log(invoice.TotalWeight) // Sum of all items' recalculatedWeight
*/
