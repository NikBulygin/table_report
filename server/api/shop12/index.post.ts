import { defineEventHandler, readBody } from 'h3'
import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)
    console.log('body', body)

    // Validate required fields
    const requiredFields = [
      'GtdNumber',
      'GtdDate',
      'MiroDocument',
      'InvoiceNumber',
      'InvoiceDate',
      'TotalWeight'
    ]
    const missingFields = requiredFields.filter(field => !body[field])

    if (missingFields.length > 0) {
      return {
        status: 400,
        message: `Missing required fields: ${missingFields.join(', ')}`
      }
    }

    // Validate data types
    if (isNaN(Number(body.TotalWeight))) {
      return {
        status: 400,
        message: 'TotalWeight must be a number'
      }
    }

    if (
      isNaN(Date.parse(body.GtdDate)) ||
      isNaN(Date.parse(body.InvoiceDate))
    ) {
      return {
        status: 400,
        message: 'Invalid date format for GtdDate or InvoiceDate'
      }
    }

    const result = await prisma.$transaction(async tx => {
      try {
        // First ensure the GTD exists
        const gtd = await tx.shop2GTD.upsert({
          where: {
            GtdNumber: body.GtdNumber
          },
          create: {
            GtdNumber: body.GtdNumber,
            GtdDate: new Date(body.GtdDate)
          },
          update: {
            GtdDate: new Date(body.GtdDate)
          }
        })

        // Then create/update the invoice
        const invoice = await tx.shop2Invoice.upsert({
          where: {
            InvoiceNumber: body.InvoiceNumber
          },
          create: {
            MiroDocument: body.MiroDocument,
            InvoiceNumber: body.InvoiceNumber,
            InvoiceDate: new Date(body.InvoiceDate),
            TotalWeight: Number(body.TotalWeight),
            GtdNumber: gtd.GtdNumber
          },
          update: {
            MiroDocument: body.MiroDocument,
            InvoiceDate: new Date(body.InvoiceDate),
            TotalWeight: Number(body.TotalWeight),
            GtdNumber: gtd.GtdNumber
          }
        })

        return invoice
      } catch (error) {
        console.error('Transaction error:', error)
        throw error
      }
    })

    return {
      status: 200,
      data: result
    }
  } catch (error) {
    console.error('API error:', error)
    return {
      status: 500,
      message: 'Internal server error',
      error: error.message
    }
  }
})
