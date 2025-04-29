import metadata from './meta.json'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async event => {
  const query = getQuery(event)
  const {
    page = 1,
    pageSize = 10,
    sortField = 'createdAt',
    sortOrder = 'desc',
    dateFrom,
    dateTo,
    codeNumber,
    meta = false
  } = query

  // Return metadata if requested
  if (meta) {
    return metadata
  }

  try {
    // Build where clause
    const where: any = {}

    if (dateFrom || dateTo) {
      where.Invoice = {
        InvoiceDate: {}
      }
      if (dateFrom)
        where.Invoice.InvoiceDate.gte = new Date(dateFrom as string)
      if (dateTo)
        where.Invoice.InvoiceDate.lte = new Date(dateTo as string)
    }

    if (codeNumber) {
      where.Invoice = {
        ...where.Invoice,
        InvoiceNumber: {
          contains: codeNumber as string
        }
      }
    }

    // Get total count
    const total = await prisma.shop2.count({ where })

    // Build orderBy clause
    let orderBy: any = {}

    switch (sortField) {
      case 'createdAt':
        orderBy = { createdAt: sortOrder }
        break
      case 'InvoiceDate':
        orderBy = { Invoice: { InvoiceDate: sortOrder } }
        break
      case 'GtdDate':
        orderBy = { Invoice: { GTD: { GtdDate: sortOrder } } }
        break
      default:
        orderBy = { [sortField]: sortOrder }
    }

    // Fetch data with pagination
    const data = await prisma.shop2.findMany({
      where,
      orderBy,
      skip: (Number(page) - 1) * Number(pageSize),
      take: Number(pageSize),
      include: {
        Invoice: {
          include: {
            GTD: true
          }
        }
      }
    })

    return {
      data,
      total,
      page: Number(page),
      pageSize: Number(pageSize)
    }
  } catch (error) {
    console.error('Error fetching shop2 data:', error)
    throw createError({
      statusCode: 500,
      message: 'Error fetching data'
    })
  }
})
