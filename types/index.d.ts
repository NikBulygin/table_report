import ru from '@/locales/ru.ts'
export {}

declare global {
  type AnyObject = { [key: string]: any }
  type ULocaleKey = NestedKeyOf<typeof ru>
}

export interface NavigationItem {
  title: string
  url: string
  children?: NavigationItem[]
}

export type NavigationMenu = NavigationItem[]

type DateFormat =
  | 'dd.MM.yyyy' // полная дата с точкой
  | 'MM.yyyy' // месяц и год с точкой
  | 'yyyy' // только год
  | 'dd-MM-yyyy' // полная дата с дефисом
  | 'MM-yyyy' // месяц и год с дефисом
  | 'dd/MM/yyyy' // полная дата со слешем
  | 'MM/yyyy' // месяц и год со слешем
