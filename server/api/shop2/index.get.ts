import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async event => {
  try {
    const query = getQuery(event)

    const filter = {
      startDate: query.startDate
        ? new Date(query.startDate as string)
        : undefined,
      endDate: query.endDate
        ? new Date(query.endDate as string)
        : undefined,
      pagination: {
        pageSize: Number(query.pageSize) || 10,
        currentPage: Number(query.currentPage) || 1
      },
      orderBy: query.orderBy
        ? {
            field: query.orderBy as string,
            direction: query.direction as 'asc' | 'desc'
          }
        : undefined
    }

    const invoiceNumbers = Array.isArray(query.invoiceNumbers)
      ? query.invoiceNumbers
      : query.invoiceNumbers
      ? [query.invoiceNumbers]
      : []
    const gtdNumbers = Array.isArray(query.gtdNumbers)
      ? query.gtdNumbers
      : query.gtdNumbers
      ? [query.gtdNumbers]
      : []

    const where = {
      AND: [
        filter.startDate ? { GtdDate: { gte: filter.startDate } } : {},
        filter.endDate ? { GtdDate: { lte: filter.endDate } } : {},
        gtdNumbers.length > 0 ? { GtdNumber: { in: gtdNumbers } } : {},
        {
          Invoices: {
            some: {
              AND: [
                filter.startDate
                  ? { InvoiceDate: { gte: filter.startDate } }
                  : {},
                filter.endDate
                  ? { InvoiceDate: { lte: filter.endDate } }
                  : {},
                invoiceNumbers.length > 0
                  ? { InvoiceNumber: { in: invoiceNumbers } }
                  : {}
              ]
            }
          }
        }
      ]
    }

    const orderBy = filter.orderBy
      ? {
          [filter.orderBy.field]:
            filter.orderBy.direction === 'asc' ? 'asc' : 'desc'
        }
      : { GtdDate: 'desc' as const }

    const skip =
      (filter.pagination.currentPage - 1) * filter.pagination.pageSize
    const take = filter.pagination.pageSize

    const result = await prisma.shop2GTD.findMany({
      where,
      include: {
        Invoices: {
          include: {
            Items: true
          }
        }
      },
      skip:
        (filter.pagination.currentPage - 1) * filter.pagination.pageSize,
      take: filter.pagination.pageSize,
      orderBy: orderBy
    })

    const total = await prisma.shop2GTD.count({ where })
    const totalPages = Math.ceil(total / filter.pagination.pageSize)

    // Получаем все записи для расчета суммы standart80Tio2
    const allRecords = await prisma.shop2GTD.findMany({
      where,
      include: {
        Invoices: {
          include: {
            Items: true
          }
        }
      }
    })

    // Calculate total standart80Tio2 по всем записям
    let totalStandart80Tio2 = 0
    allRecords.forEach(gtd => {
      gtd.Invoices.forEach(invoice => {
        invoice.Items.forEach(item => {
          totalStandart80Tio2 += item.standart80Tio2
        })
      })
    })

    return {
      items: result,
      pagination: {
        total,
        currentPage: filter.pagination.currentPage,
        totalPages
      },
      totalStandart80Tio2
    }
  } catch (error) {
    console.error('Error fetching Shop2 data:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching Shop2 data'
    })
  }
})
