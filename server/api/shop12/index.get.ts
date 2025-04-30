import { PrismaClient } from '@prisma/client'
import { shop12Config } from '~/composable/shop12'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)
    const dateFilter = query.date as string
    const invoiceFilter = query.invoice as string

    // Строим условия фильтрации
    const where: any = {}

    if (dateFilter) {
      const [month, year] = dateFilter.split('-')
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1)
      const endDate = new Date(parseInt(year), parseInt(month), 0)

      where.InvoiceDate = {
        gte: startDate,
        lte: endDate
      }
    }

    if (invoiceFilter) {
      where.InvoiceNumber = {
        contains: invoiceFilter,
        mode: 'insensitive'
      }
    }

    // Получаем данные из базы
    const items = await prisma.shop12.findMany({
      where,
      orderBy: {
        InvoiceDate: 'desc'
      }
    })

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

    return {
      items,
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
