import { toDisplayString } from 'vue'

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

export const shop12Config = {
  label: 'Ильменит',
  columns: [
    { key: 'vagonNumber', label: 'номер вагона' },
    { key: 'weight', label: 'вес' },
    { key: 'tio2Analysis', label: 'анализ TIO2' },
    { key: 'h2oAnalysis', label: 'анализ H2O' },
    { key: 'recalculatedWeight', label: 'ВЕС ПЕРЕРАСЧЕТ' },
    { key: 'InvoiceDate', label: 'Инвойс дата' },
    { key: 'InvoiceNumber', label: 'Инвойс номер' },
    { key: 'GtdDate', label: 'ГТД дата' },
    { key: 'GtdNumber', label: 'ГТД номер' }
  ] as Column[],

  calc: {
    recalculatedWeight: (row: any) =>
      (row.weight * (100 - row.h2oAnalysis) * row.tio2Analysis) / 4200
  } as Calculation,

  summary: {
    fields: ['recalculatedWeight', 'weight']
  } as Summary,

  filter: {
    fields: ['InvoiceDate', 'InvoiceNumber']
  } as Filter
}
