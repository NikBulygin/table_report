export {}

declare global {
  interface NavItem {
    Title: string
    url: string
    label: string
  }

  interface Shop12Item {
    id: number
    vagonNumber: string
    weight: number
    tio2Analysis: number
    h2oAnalysis: number
    recalculatedWeight: number
    InvoiceDate: Date
    InvoiceNumber: string
    GtdDate: Date
    GtdNumber: string
    createdAt: Date
    updatedAt: Date
  }

  interface Shop2Item {
    id: number
    numberVagonOrTank: string
    weight: number
    perMetVklCert: number
    perTioCert: number
    perH2oCert: number
    H2OWeight: number
    DryWeight: number
    MetalTon: number
    MinusMetal: number
    standart80Tio2: number
    InvoiceDate: Date
    InvoiceNumber: string
    GtdDate: Date
    GtdNumber: string
    MiroDocument: string
    createdAt: Date
    updatedAt: Date
  }

  interface Shop12Summary {
    weight: number
    tio2Analysis: number
    h2oAnalysis: number
    recalculatedWeight: number
  }

  interface Shop2Summary {
    weight: number
    perMetVklCert: number
    perTioCert: number
    perH2oCert: number
    H2OWeight: number
    DryWeight: number
    MetalTon: number
    MinusMetal: number
    standart80Tio2: number
  }

  interface Shop12Response {
    items: Shop12Item[]
    summary: Shop12Summary
  }

  interface Shop2Response {
    items: Shop2Item[]
    summary: Shop2Summary
  }
}
