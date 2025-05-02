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
    const groupedData = await prisma.shop2.groupBy({
      by: ['GtdNumber', 'InvoiceNumber'],
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

    // Преобразуем данные в нужный формат
    const summary = groupedData.reduce((acc, curr) => {
      const gtd = curr.GtdNumber || 'Без ГТД'
      const invoice = curr.InvoiceNumber || 'Без инвойса'

      if (!acc[gtd]) {
        acc[gtd] = {}
      }

      acc[gtd][invoice] = {
        weight: curr._sum.weight || 0,
        perMetVklCert: curr._sum.perMetVklCert || 0,
        perTioCert: curr._sum.perTioCert || 0,
        perH2oCert: curr._sum.perH2oCert || 0,
        H2OWeight: curr._sum.H2OWeight || 0,
        DryWeight: curr._sum.DryWeight || 0,
        MetalTon: curr._sum.MetalTon || 0,
        MinusMetal: curr._sum.MinusMetal || 0,
        standart80Tio2: curr._sum.standart80Tio2 || 0
      }

      return acc
    }, {} as Record<string, Record<string, any>>)

    // Получаем общие итоги
    const totals = await prisma.shop2.aggregate({
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
      groupedData: summary,
      totals: {
        weight: totals._sum.weight || 0,
        perMetVklCert: totals._sum.perMetVklCert || 0,
        perTioCert: totals._sum.perTioCert || 0,
        perH2oCert: totals._sum.perH2oCert || 0,
        H2OWeight: totals._sum.H2OWeight || 0,
        DryWeight: totals._sum.DryWeight || 0,
        MetalTon: totals._sum.MetalTon || 0,
        MinusMetal: totals._sum.MinusMetal || 0,
        standart80Tio2: totals._sum.standart80Tio2 || 0
      }
    }
  } catch (error) {
    console.error('Error fetching shop2 summary:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching shop2 summary'
    })
  }
})

export default handler
