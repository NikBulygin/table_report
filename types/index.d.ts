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
