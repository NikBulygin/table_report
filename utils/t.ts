export const t = (key: ULocaleKey, extra?: AnyObject) => {
  const { $i18n } = useNuxtApp()
  return $i18n.t(key, { ...extra })
}
