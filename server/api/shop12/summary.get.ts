import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const handler = defineEventHandler(async event => {
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

    // Получаем сгруппированные данные
    const groupedData = await prisma.shop12.groupBy({
      by: ['GtdNumber', 'InvoiceNumber'],
      where,
      _sum: {
        weight: true,
        tio2Analysis: true,
        h2oAnalysis: true,
        recalculatedWeight: true
      }
    })

    // Преобразуем данные в нужный формат
    const summary = groupedData.reduce((acc, curr) => {
      const gtd = curr.GtdNumber || 'Без ГТД'
      const invoice = curr.InvoiceNumber || 'Без инвойса'

      if (!acc[gtd]) {
        acc[gtd] = {}
      }

      acc[gtd][invoice] = {
        weight: curr._sum.weight || 0,
        tio2Analysis: curr._sum.tio2Analysis || 0,
        h2oAnalysis: curr._sum.h2oAnalysis || 0,
        recalculatedWeight: curr._sum.recalculatedWeight || 0
      }

      return acc
    }, {} as Record<string, Record<string, any>>)

    // Получаем общие итоги
    const totals = await prisma.shop12.aggregate({
      where,
      _sum: {
        weight: true,
        tio2Analysis: true,
        h2oAnalysis: true,
        recalculatedWeight: true
      }
    })

    return {
      groupedData: summary,
      totals: {
        weight: totals._sum.weight || 0,
        tio2Analysis: totals._sum.tio2Analysis || 0,
        h2oAnalysis: totals._sum.h2oAnalysis || 0,
        recalculatedWeight: totals._sum.recalculatedWeight || 0
      }
    }
  } catch (error) {
    console.error('Error fetching shop12 summary:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching shop12 summary'
    })
  }
})

export default handler
