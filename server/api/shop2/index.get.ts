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
      skip,
      take,
      orderBy
    })

    const total = await prisma.shop2GTD.count({ where })
    const totalPages = Math.ceil(total / filter.pagination.pageSize)

    // Получаем доступные номера ГТД и инвойсов
    const availableGtdNumbers = await prisma.shop2GTD
      .findMany({
        where: {
          AND: [
            filter.startDate ? { GtdDate: { gte: filter.startDate } } : {},
            filter.endDate ? { GtdDate: { lte: filter.endDate } } : {},
            invoiceNumbers.length > 0
              ? {
                  Invoices: {
                    some: {
                      InvoiceNumber: { in: invoiceNumbers }
                    }
                  }
                }
              : {}
          ]
        },
        select: {
          GtdNumber: true
        },
        distinct: ['GtdNumber']
      })
      .then(gtds => gtds.map(gtd => gtd.GtdNumber))

    const availableInvoiceNumbers = await prisma.shop2GTD
      .findMany({
        where: {
          AND: [
            filter.startDate ? { GtdDate: { gte: filter.startDate } } : {},
            filter.endDate ? { GtdDate: { lte: filter.endDate } } : {},
            gtdNumbers.length > 0 ? { GtdNumber: { in: gtdNumbers } } : {}
          ]
        },
        select: {
          Invoices: {
            select: {
              InvoiceNumber: true
            }
          }
        }
      })
      .then(gtds => {
        const invoiceNumbers = new Set<string>()
        gtds.forEach(gtd => {
          gtd.Invoices.forEach(invoice => {
            invoiceNumbers.add(invoice.InvoiceNumber)
          })
        })
        return Array.from(invoiceNumbers)
      })

    // Получаем те же данные что и в result, но без пагинации
    const allRecords = await prisma.shop2GTD.findMany({
      where,
      include: {
        Invoices: {
          include: {
            Items: true
          }
        }
      },
      orderBy
    })

    // Calculate totals
    let totalStandart80Tio2 = 0
    let totalWeight = 0
    let totalDryWeight = 0
    console.log(invoiceNumbers)
    console.log(gtdNumbers)
    allRecords.forEach(gtd => {
      // Фильтруем по ГТД
      if (gtdNumbers.length > 0 && !gtdNumbers.includes(gtd.GtdNumber)) {
        return
      }

      gtd.Invoices.forEach(invoice => {
        // Фильтруем по инвойсам
        if (
          invoiceNumbers.length > 0 &&
          !invoiceNumbers.includes(invoice.InvoiceNumber)
        ) {
          return
        }
        console.log(invoice.InvoiceNumber)
        invoice.Items.forEach(item => {
          console.log(item)
          totalStandart80Tio2 += item.standart80Tio2
          totalWeight += item.weight
          totalDryWeight += item.DryWeight
        })
      })
    })

    // Округляем итоговые значения до 2 знаков после запятой
    totalStandart80Tio2 = Number(totalStandart80Tio2.toFixed(2))
    totalWeight = Number(totalWeight.toFixed(2))
    totalDryWeight = Number(totalDryWeight.toFixed(2))

    return {
      items: result,
      pagination: {
        total,
        currentPage: filter.pagination.currentPage,
        totalPages
      },
      totalStandart80Tio2,
      totalWeight,
      totalDryWeight,
      availableGtdNumbers,
      availableInvoiceNumbers
    }
  } catch (error) {
    console.error('Error fetching Shop2 data:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching Shop2 data'
    })
  }
})
