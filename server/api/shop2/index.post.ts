import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)
    const { items, itemsDelete } = body

    // Удаляем записи
    if (itemsDelete && itemsDelete.length > 0) {
      for (const item of itemsDelete) {
        await prisma.shop2GTD.delete({
          where: { GtdNumber: item.GtdNumber }
        })
      }
    }

    // Создаем или обновляем записи
    if (items && items.length > 0) {
      for (const item of items) {
        // Проверяем, что есть хотя бы один инвойс с данными
        const hasValidInvoice = item.Invoices?.some(invoice => {
          return (
            invoice.InvoiceNumber &&
            invoice.InvoiceDate &&
            invoice.Items?.some(
              item =>
                item.numberVagonOrTank &&
                item.weight > 0 &&
                item.perMetVklCert >= 0 &&
                item.perTioCert >= 0 &&
                item.perH2oCert >= 0
            )
          )
        })

        if (!hasValidInvoice) {
          throw createError({
            statusCode: 400,
            message: `ГТД ${item.GtdNumber} не содержит валидных инвойсов`
          })
        }

        // Обновляем или создаем ГТД
        await prisma.shop2GTD.upsert({
          where: { GtdNumber: item.GtdNumber },
          update: {
            GtdDate: new Date(item.GtdDate),
            Invoices: {
              deleteMany: {}, // Удаляем все существующие инвойсы
              create: item.Invoices.map(invoice => ({
                InvoiceNumber: invoice.InvoiceNumber,
                InvoiceDate: new Date(invoice.InvoiceDate),
                MiroDocument: invoice.MiroDocument,
                Items: {
                  create: invoice.Items.map(item => ({
                    numberVagonOrTank: item.numberVagonOrTank,
                    weight: item.weight,
                    perMetVklCert: item.perMetVklCert,
                    perTioCert: item.perTioCert,
                    perH2oCert: item.perH2oCert
                  }))
                }
              }))
            }
          },
          create: {
            GtdNumber: item.GtdNumber,
            GtdDate: new Date(item.GtdDate),
            Invoices: {
              create: item.Invoices.map(invoice => ({
                InvoiceNumber: invoice.InvoiceNumber,
                InvoiceDate: new Date(invoice.InvoiceDate),
                MiroDocument: invoice.MiroDocument,
                Items: {
                  create: invoice.Items.map(item => ({
                    numberVagonOrTank: item.numberVagonOrTank,
                    weight: item.weight,
                    perMetVklCert: item.perMetVklCert,
                    perTioCert: item.perTioCert,
                    perH2oCert: item.perH2oCert
                  }))
                }
              }))
            }
          }
        })
      }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Error in shop2 POST:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error processing shop2 data'
    })
  }
})
