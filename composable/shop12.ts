import { toDisplayString } from 'vue'

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

export const shop12Config = {
  label: 'Ильменит',
  columns: [
    { key: 'weight', label: 'Вес', isCalculated: false },
    { key: 'tio2Analysis', label: 'TiO2', isCalculated: false },
    { key: 'h2oAnalysis', label: 'H2O', isCalculated: false },
    {
      key: 'recalculatedWeight',
      label: 'Пересчитанный вес',
      isCalculated: true
    },
    { key: 'vagonNumber', label: 'номер вагона' },

    { key: 'InvoiceDate', label: 'Дата Инвойса', isCalculated: false },
    { key: 'InvoiceNumber', label: 'Номер инвойса', isCalculated: false },
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
