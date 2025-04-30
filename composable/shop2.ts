interface Column {
  key: string
  label: string
  isCalculated: boolean
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
    {
      key: 'numberVagonOrTank',
      label: 'номер вагона/танка',
      isCalculated: false
    },
    { key: 'weight', label: 'Вес', isCalculated: false },
    {
      key: 'perMetVklCert',
      label: 'металл включений',
      isCalculated: false
    },
    { key: 'perTioCert', label: 'TIO2', isCalculated: false },
    { key: 'perH2oCert', label: 'H2O', isCalculated: false },
    { key: 'H2OWeight', label: 'ВЕС H2O', isCalculated: true },
    { key: 'DryWeight', label: 'СУХОЙ ВЕС', isCalculated: true },
    { key: 'MetalTon', label: 'МЕТАЛЛ ТОНН', isCalculated: true },
    { key: 'MinusMetal', label: 'МИНУС МЕТАЛЛ', isCalculated: true },
    {
      key: 'standart80Tio2',
      label: 'СТАНДАРТ 80 TIO2',
      isCalculated: true
    },
    { key: 'MiroDocument', label: 'МИРО документ', isCalculated: false },
    { key: 'InvoiceDate', label: 'Дата', isCalculated: false },
    { key: 'InvoiceNumber', label: 'Номер инвойса', isCalculated: false },
    { key: 'GtdDate', label: 'ГТД дата', isCalculated: false },
    { key: 'GtdNumber', label: 'ГТД номер', isCalculated: false },
    { key: 'tio2Analysis', label: 'TiO2', isCalculated: false },
    { key: 'h2oAnalysis', label: 'H2O', isCalculated: false },
    {
      key: 'recalculatedWeight',
      label: 'Пересчитанный вес',
      isCalculated: true
    }
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
