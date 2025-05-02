import { defineEventHandler } from 'h3'
import { H3Event } from 'h3'

export default defineEventHandler(event => {
  const config = useRuntimeConfig()
  const whitelist = config.ipWhitelist || []

  // Получаем IP адрес из заголовков или из соединения
  const ip =
    event.node.req.headers['x-forwarded-for'] ||
    event.node.req.headers['x-real-ip'] ||
    event.node.req.socket.remoteAddress

  // Если IP не в белом списке, возвращаем ошибку
  if (!whitelist.includes(ip)) {
    throw createError({
      statusCode: 403,
      message: 'Access denied. Your IP is not in the whitelist.'
    })
  }
})
