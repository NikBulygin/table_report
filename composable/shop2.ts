interface Column {
  key: string
  label: string
}

interface Calculation {
  [key: string]: (row: any) => number
}

interface Summary {
  fields: string[]
}

interface Filter {
  fields: string[]
}

export const shop2Config = {
  label: 'Шлак',
  columns: [
    { key: 'numberVagonOrTank', label: 'номер вагона/танка' },
    { key: 'weight', label: 'вес' },
    { key: 'perMetVklCert', label: 'металл включений' },
    { key: 'perTioCert', label: 'TIO2' },
    { key: 'perH2oCert', label: 'H2O' },
    { key: 'H2OWeight', label: 'ВЕС H2O' },
    { key: 'DryWeight', label: 'СУХОЙ ВЕС' },
    { key: 'MetalTon', label: 'МЕТАЛЛ ТОНН' },
    { key: 'MinusMetal', label: 'МИНУС МЕТАЛЛ' },
    { key: 'standart80Tio2', label: 'СТАНДАРТ 80 TIO2' },
    { key: 'MiroDocument', label: 'МИРО документ' },
    { key: 'InvoiceDate', label: 'Инвойс дата' },
    { key: 'InvoiceNumber', label: 'Инвойс номер' },
    { key: 'GtdDate', label: 'ГТД дата' },
    { key: 'GtdNumber', label: 'ГТД номер' }
  ] as Column[],

  calc: {
    H2OWeight: (row: any) => (row.weight * row.perH2oCert) / 100,
    DryWeight: (row: any) => row.weight - row.H2OWeight,
    MetalTon: (row: any) => (row.DryWeight * row.perMetVklCert) / 100,
    MinusMetal: (row: any) => row.DryWeight - row.MetalTon,
    standart80Tio2: (row: any) => (row.MinusMetal * row.perTioCert) / 80
  } as Calculation,

  summary: {
    fields: ['standart80Tio2', 'weight']
  } as Summary,

  filter: {
    fields: ['InvoiceDate', 'InvoiceNumber']
  } as Filter
}
