import ipWhitelist from './ipWhitelist'

export default defineEventHandler(event => {
  // Применяем IP whitelist middleware только к API маршрутам
  if (event.path.startsWith('/api')) {
    return ipWhitelist(event)
  }
})
