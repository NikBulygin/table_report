export class Shop2Item {
  constructor(
    public numberVagonOrTank: string,
    public weight: number,
    public perMetVklCert: number,
    public perTioCert: number,
    public perH2oCert: number
  ) {}

  // ВЛАГА ТОНН = ОТГРУЖ НАТУРА * H2O ПО СЕРИТФ / 100
  get H2OWeight(): number {
    return (this.weight * this.perH2oCert) / 100
  }

  // СУХОЙ ВЕС НАТУРА = ОТГРУЖ НАТУРА - ВЛАГА ТОНН
  get DryWeight(): number {
    return this.weight - this.H2OWeight
  }

  // МЕТАЛЛ ТОНН = МЕТ ВКЛ ПО СКРТИФ * СУХОЙ ВС НАУТРА / 100
  get MetalTon(): number {
    return (this.DryWeight * this.perMetVklCert) / 100
  }

  // ЗА МИНУС МЕТАЛЛ = СУХОЙ ВЕС - МЕТАЛЛ ТОНН
  get MinusMetal(): number {
    return this.DryWeight - this.MetalTon
  }

  // СТАНДАРТ 80 TIO = TIO по СЕРТИФ * ЗА МИНУС МЕТАЛЛ / 80
  get standart80Tio2(): number {
    return (this.perTioCert * this.MinusMetal) / 80
  }
}

export class Shop2Invoice {
  constructor(
    public invoiceNumber: string,
    public InvoiceDate: Date,
    public MiroDocument: string,
    public items: Shop2Item[] = []
  ) {}

  // total = СУММА ВСЕХ СТАНДАРТ 80 TIO
  get TotalWeight(): number {
    return this.items.reduce((sum, item) => sum + item.standart80Tio2, 0)
  }

  addItem(item: Shop2Item): void {
    this.items.push(item)
  }
}

export class Shop2Filter {
  constructor(
    public startDate?: Date,
    public endDate?: Date,
    public pagination: {
      pageSize: number
      currentPage: number
    } = { pageSize: 10, currentPage: 1 },
    public orderBy?: {
      field: 'GtdDate' | 'InvoiceDate' | 'weight' | 'standart80Tio2'
      direction: 'asc' | 'desc'
    }
  ) {}
}

export class Shop2GTD {
  constructor(
    public GtdNumber: string,
    public GtdDate: Date,
    public invoices: Shop2Invoice[] = []
  ) {}

  addInvoice(invoice: Shop2Invoice): void {
    this.invoices.push(invoice)
  }

  static async findWithFilter(filter: Shop2Filter) {
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

    const response = await fetch(`/api/shop2?${query.toString()}`)
    if (!response.ok) {
      throw new Error('Failed to fetch Shop2 data')
    }

    return response.json()
  }
}
