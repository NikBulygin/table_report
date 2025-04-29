import { faker } from '@faker-js/faker'
import { prisma } from '~/server/utils/prisma'
import { Shop2GTD, Shop2Invoice, Shop2Item } from '~/composables/shop2'
import { Shop12GTD, Shop12Invoice, Shop12Item } from '~/composables/shop12'

// Helper function to generate random date within last year
const getRandomDate = () => {
  const start = new Date()
  start.setFullYear(start.getFullYear() - 1)
  return faker.date.between({ from: start, to: new Date() })
}

// Generate mock data for Shop2
const generateShop2Data = (count: number) => {
  const gtds: Shop2GTD[] = []

  for (let i = 0; i < count; i++) {
    const gtd = new Shop2GTD(
      faker.string.numeric(8), // GTD number
      getRandomDate() // GTD date
    )

    // Generate 1-3 invoices per GTD
    const invoiceCount = faker.number.int({ min: 1, max: 3 })
    for (let j = 0; j < invoiceCount; j++) {
      const invoice = new Shop2Invoice(
        faker.string.numeric(8), // Invoice number
        getRandomDate(), // Invoice date
        faker.string.alphanumeric(10) // Miro document
      )

      // Generate 2-5 items per invoice
      const itemCount = faker.number.int({ min: 2, max: 5 })
      for (let k = 0; k < itemCount; k++) {
        const item = new Shop2Item(
          faker.string.numeric(8), // Vagon number
          faker.number.float({ min: 50, max: 100, fractionDigits: 2 }), // Weight
          faker.number.float({ min: 40, max: 60, fractionDigits: 2 }), // perMetVklCert
          faker.number.float({ min: 50, max: 70, fractionDigits: 2 }), // perTioCert
          faker.number.float({ min: 5, max: 15, fractionDigits: 2 }) // perH2oCert
        )
        invoice.addItem(item)
      }

      gtd.addInvoice(invoice)
    }

    gtds.push(gtd)
  }

  return gtds
}

// Generate mock data for Shop12
const generateShop12Data = (count: number) => {
  const gtds: Shop12GTD[] = []

  for (let i = 0; i < count; i++) {
    const gtd = new Shop12GTD(
      faker.string.numeric(8), // GTD number
      getRandomDate() // GTD date
    )

    // Generate 1-3 invoices per GTD
    const invoiceCount = faker.number.int({ min: 1, max: 3 })
    for (let j = 0; j < invoiceCount; j++) {
      const invoice = new Shop12Invoice(
        faker.string.numeric(8), // Invoice number
        getRandomDate() // Invoice date
      )

      // Generate 2-5 items per invoice
      const itemCount = faker.number.int({ min: 2, max: 5 })
      for (let k = 0; k < itemCount; k++) {
        const item = new Shop12Item(
          faker.string.numeric(8), // Vagon number
          faker.number.float({ min: 50, max: 100, fractionDigits: 2 }), // Weight
          faker.number.float({ min: 50, max: 70, fractionDigits: 2 }), // tio2Analysis
          faker.number.float({ min: 5, max: 15, fractionDigits: 2 }) // h2oAnalysis
        )
        invoice.addItem(item)
      }

      gtd.addInvoice(invoice)
    }

    gtds.push(gtd)
  }

  return gtds
}

// Save mock data to database
export default defineEventHandler(async () => {
  try {
    // Generate 50 records for each shop
    const shop2Data = generateShop2Data(5000)
    const shop12Data = generateShop12Data(5000)

    // Save Shop2 data
    for (const gtd of shop2Data) {
      const gtdRecord = await prisma.shop2GTD.create({
        data: {
          GtdNumber: gtd.GtdNumber,
          GtdDate: gtd.GtdDate,
          Invoices: {
            create: gtd.invoices.map(invoice => ({
              InvoiceNumber: invoice.invoiceNumber,
              InvoiceDate: invoice.InvoiceDate,
              MiroDocument: invoice.MiroDocument,
              TotalWeight: invoice.TotalWeight,
              Items: {
                create: invoice.items.map(item => ({
                  numberVagonOrTank: item.numberVagonOrTank,
                  weight: item.weight,
                  perMetVklCert: item.perMetVklCert,
                  perTioCert: item.perTioCert,
                  perH2oCert: item.perH2oCert,
                  H2OWeight: item.H2OWeight,
                  DryWeight: item.DryWeight,
                  MetalTon: item.MetalTon,
                  MinusMetal: item.MinusMetal,
                  standart80Tio2: item.standart80Tio2
                }))
              }
            }))
          }
        }
      })
    }

    // Save Shop12 data
    for (const gtd of shop12Data) {
      const gtdRecord = await prisma.shop12GTD.create({
        data: {
          GtdNumber: gtd.GtdNumber,
          GtdDate: gtd.GtdDate,
          Invoices: {
            create: gtd.invoices.map(invoice => ({
              InvoiceNumber: invoice.InvoiceNumber,
              InvoiceDate: invoice.InvoiceDate,
              TotalWeight: invoice.TotalWeight,
              Items: {
                create: invoice.items.map(item => ({
                  vagonNumber: item.vagonNumber,
                  weight: item.weight,
                  tio2Analysis: item.tio2Analysis,
                  h2oAnalysis: item.h2oAnalysis,
                  recalculatedWeight: item.recalculatedWeight
                }))
              }
            }))
          }
        }
      })
    }

    return {
      success: true,
      message: 'Mock data generated successfully',
      shop2Count: shop2Data.length,
      shop12Count: shop12Data.length
    }
  } catch (error) {
    console.error('Error generating mock data:', error)
    throw createError({
      statusCode: 500,
      message: 'Error generating mock data'
    })
  }
})
