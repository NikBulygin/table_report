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

    const where = {
      AND: [
        filter.startDate ? { GtdDate: { gte: filter.startDate } } : {},
        filter.endDate ? { GtdDate: { lte: filter.endDate } } : {},
        {
          Invoices: {
            some: {
              AND: [
                filter.startDate
                  ? { InvoiceDate: { gte: filter.startDate } }
                  : {},
                filter.endDate
                  ? { InvoiceDate: { lte: filter.endDate } }
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

    const [total, items] = await Promise.all([
      prisma.shop12GTD.count({ where }),
      prisma.shop12GTD.findMany({
        where,
        orderBy,
        skip,
        take,
        include: {
          Invoices: {
            include: {
              Items: true
            }
          }
        }
      })
    ])

    return {
      items,
      pagination: {
        total,
        currentPage: filter.pagination.currentPage,
        pageSize: filter.pagination.pageSize,
        totalPages: Math.ceil(total / filter.pagination.pageSize)
      }
    }
  } catch (error) {
    console.error('Error fetching Shop12 data:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching Shop12 data'
    })
  }
})
