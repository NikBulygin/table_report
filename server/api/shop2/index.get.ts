import { PrismaClient } from '@prisma/client'
import { shop2Config } from '~/composable/shop2'

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
    const gtdFilter = query.gtd as string

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

    if (gtdFilter) {
      where.GtdNumber = {
        contains: gtdFilter
      }
    }

    // Получаем данные из базы
    const items = await prisma.shop2.findMany({
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
    const summary = await prisma.shop2.aggregate({
      where,
      _sum: {
        weight: true,
        perMetVklCert: true,
        perTioCert: true,
        perH2oCert: true,
        H2OWeight: true,
        DryWeight: true,
        MetalTon: true,
        MinusMetal: true,
        standart80Tio2: true
      }
    })

    return {
      items: normalizedItems,
      summary: {
        weight: summary._sum?.weight || 0,
        perMetVklCert: summary._sum?.perMetVklCert || 0,
        perTioCert: summary._sum?.perTioCert || 0,
        perH2oCert: summary._sum?.perH2oCert || 0,
        H2OWeight: summary._sum?.H2OWeight || 0,
        DryWeight: summary._sum?.DryWeight || 0,
        MetalTon: summary._sum?.MetalTon || 0,
        MinusMetal: summary._sum?.MinusMetal || 0,
        standart80Tio2: summary._sum?.standart80Tio2 || 0
      }
    }
  } catch (error) {
    console.error('Error fetching shop2 data:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching shop2 data'
    })
  }
})
