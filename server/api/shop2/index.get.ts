import metadata from './meta.json'
import { prisma } from '~/server/utils/prisma'

// Field mapping from meta.json to Prisma schema
const fieldMapping = {
  numberVagonOrTank: 'numberVagonOrTank',
  weight: 'weight',
  perMetVklCert: 'perMetVklCert',
  perTioCert: 'perTioCert',
  perH2oCert: 'perH2oCert',
  DryWeight: 'DryWeight',
  MetalTon: 'MetalTon',
  standart80Tio2: 'standart80Tio2',
  dockumentNumberMiro: { path: ['Invoice', 'MiroDocument'] },
  invoiceDate: { path: ['Invoice', 'InvoiceDate'] },
  invoiceNumber: { path: ['Invoice', 'InvoiceNumber'] },
  gtdDate: { path: ['Invoice', 'GTD', 'GtdDate'] },
  gtdNumber: { path: ['Invoice', 'GTD', 'GtdNumber'] }
}

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
    meta = false,
    filters = {}
  } = query

  // Return metadata if requested
  if (meta) {
    return metadata
  }

  try {
    // Build where clause
    const where: any = {}

    // Handle date range filtering
    if (dateFrom || dateTo) {
      where.Invoice = {
        InvoiceDate: {}
      }
      if (dateFrom)
        where.Invoice.InvoiceDate.gte = new Date(dateFrom as string)
      if (dateTo)
        where.Invoice.InvoiceDate.lte = new Date(dateTo as string)
    }

    // Handle code number filtering
    if (codeNumber) {
      where.Invoice = {
        ...where.Invoice,
        InvoiceNumber: {
          contains: codeNumber as string
        }
      }
    }

    // Handle additional filters
    if (filters && typeof filters === 'object') {
      Object.entries(filters).forEach(([key, value]) => {
        const mapping = fieldMapping[key]
        if (mapping) {
          if (typeof mapping === 'string') {
            // Direct field mapping
            where[mapping] = value
          } else if (mapping.path) {
            // Nested field mapping
            let current = where
            mapping.path.forEach((path, index) => {
              if (index === mapping.path.length - 1) {
                current[path] = value
              } else {
                current[path] = current[path] || {}
                current = current[path]
              }
            })
          }
        }
      })
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
