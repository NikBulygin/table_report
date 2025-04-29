export class Shop12Item {
  constructor(
    public vagonNumber: string,
    public weight: number,
    public tio2Analysis: number,
    public h2oAnalysis: number
  ) {}

  // ВЕС ПЕРЕРАСЧЕТ = ВЕС *(100-H2O) * TIO2 / 4200
  get recalculatedWeight(): number {
    return (
      (this.weight * (100 - this.h2oAnalysis) * this.tio2Analysis) / 4200
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
    return this.items.reduce(
      (sum, item) => sum + item.recalculatedWeight,
      0
    )
  }

  addItem(item: Shop12Item): void {
    this.items.push(item)
  }
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
