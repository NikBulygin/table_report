import { PrismaClient } from '@prisma/client'
import { shop12Config } from '~/composable/shop12'

const prisma = new PrismaClient()

const normalizeDate = (date: string | Date | number) => {
  if (typeof date === 'number') {
    return new Date(date)
  }
  if (typeof date === 'string') {
    // Handle YYYY-MM-DD format
    if (date.includes('-')) {
      return new Date(date)
    }
    // Handle DD.MM.YYYY format
    if (date.includes('.')) {
      const [day, month, year] = date.split('.')
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    }
  }
  return new Date(date)
}

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)
    const dateFilter = query.date as string
    const invoiceFilter = query.invoice as string

    // Строим условия фильтрации
    const where: any = {}

    if (dateFilter) {
      const [month, year] = dateFilter.split('-')
      // Первый день месяца
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1)
      // Последний день месяца
      const endDate = new Date(
        parseInt(year),
        parseInt(month),
        0,
        23,
        59,
        59,
        999
      )

      where.InvoiceDate = {
        gte: startDate.toISOString(),
        lte: endDate.toISOString()
      }
    }

    if (invoiceFilter) {
      where.InvoiceNumber = {
        contains: invoiceFilter
      }
    }

    // Получаем данные из базы
    const items = await prisma.shop12.findMany({
      where,
      orderBy: {
        InvoiceDate: 'desc'
      }
    })

    // Нормализуем даты в результатах
    const normalizedItems = items.map(item => ({
      ...item,
      InvoiceDate: normalizeDate(item.InvoiceDate).toISOString(),
      GtdDate: normalizeDate(item.GtdDate).toISOString()
    }))

    // Вычисляем итоги через агрегацию
    const summary = await prisma.shop12.aggregate({
      where,
      _sum: {
        weight: true,
        tio2Analysis: true,
        h2oAnalysis: true,
        recalculatedWeight: true
      }
    })

    console.log(normalizedItems)
    return {
      items: normalizedItems,
      summary: {
        weight: summary._sum?.weight || 0,
        tio2Analysis: summary._sum?.tio2Analysis || 0,
        h2oAnalysis: summary._sum?.h2oAnalysis || 0,
        recalculatedWeight: summary._sum?.recalculatedWeight || 0
      }
    }
  } catch (error) {
    console.error('Error fetching shop12 data:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching shop12 data'
    })
  }
})
