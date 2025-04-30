import { PrismaClient } from '@prisma/client'
import { shop2Config } from '~/composable/shop2'

const prisma = new PrismaClient()

const normalizeDate = (date: string | Date) => {
  if (typeof date === 'string') {
    // Handle YYYY-MM-DD format
    if (date.includes('-')) {
      return new Date(date)
    }
    // Handle DD.MM.YYYY format
    if (date.includes('.')) {
      const [day, month, year] = date.split('.')
      return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
    }
  }
  return new Date(date)
}

interface Shop2Item {
  id?: number
  numberVagonOrTank: string
  weight: number
  perMetVklCert: number
  perTioCert: number
  perH2oCert: number
  H2OWeight: number
  DryWeight: number
  MetalTon: number
  MinusMetal: number
  standart80Tio2: number
  InvoiceDate: Date | string
  InvoiceNumber: string
  GtdDate: Date | string
  GtdNumber: string
  MiroDocument: string
}

const prepareItem = (item: Shop2Item) => {
  const H2OWeight = shop2Config.calc.H2OWeight(item)
  const DryWeight = shop2Config.calc.DryWeight({ ...item, H2OWeight })
  const MetalTon = shop2Config.calc.MetalTon({ ...item, DryWeight })
  const MinusMetal = shop2Config.calc.MinusMetal({
    ...item,
    DryWeight,
    MetalTon
  })
  const standart80Tio2 = shop2Config.calc.standart80Tio2({
    ...item,
    MinusMetal
  })

  return {
    ...item,
    weight: Number(item.weight),
    perMetVklCert: Number(item.perMetVklCert),
    perTioCert: Number(item.perTioCert),
    perH2oCert: Number(item.perH2oCert),
    H2OWeight,
    DryWeight,
    MetalTon,
    MinusMetal,
    standart80Tio2,
    InvoiceDate: normalizeDate(item.InvoiceDate),
    GtdDate: normalizeDate(item.GtdDate)
  }
}

export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)
    const { deleted, edited, added } = body

    // Handle deletions
    if (deleted && deleted.length > 0) {
      await prisma.shop2.deleteMany({
        where: {
          id: {
            in: deleted
          }
        }
      })
    }

    // Handle edits
    if (edited && edited.length > 0) {
      for (const item of edited) {
        await prisma.shop2.update({
          where: { id: item.id },
          data: prepareItem(item)
        })
      }
    }

    // Handle additions
    if (added && added.length > 0) {
      for (const item of added) {
        const preparedItem = prepareItem(item)
        await prisma.shop2.upsert({
          where: {
            id: preparedItem.id || -1 // Use -1 for new items
          },
          create: {
            numberVagonOrTank: preparedItem.numberVagonOrTank,
            weight: preparedItem.weight,
            perMetVklCert: preparedItem.perMetVklCert,
            perTioCert: preparedItem.perTioCert,
            perH2oCert: preparedItem.perH2oCert,
            H2OWeight: preparedItem.H2OWeight,
            DryWeight: preparedItem.DryWeight,
            MetalTon: preparedItem.MetalTon,
            MinusMetal: preparedItem.MinusMetal,
            standart80Tio2: preparedItem.standart80Tio2,
            InvoiceDate: preparedItem.InvoiceDate,
            InvoiceNumber: preparedItem.InvoiceNumber,
            GtdDate: preparedItem.GtdDate,
            GtdNumber: preparedItem.GtdNumber,
            MiroDocument: preparedItem.MiroDocument
          },
          update: {
            numberVagonOrTank: preparedItem.numberVagonOrTank,
            weight: preparedItem.weight,
            perMetVklCert: preparedItem.perMetVklCert,
            perTioCert: preparedItem.perTioCert,
            perH2oCert: preparedItem.perH2oCert,
            H2OWeight: preparedItem.H2OWeight,
            DryWeight: preparedItem.DryWeight,
            MetalTon: preparedItem.MetalTon,
            MinusMetal: preparedItem.MinusMetal,
            standart80Tio2: preparedItem.standart80Tio2,
            InvoiceDate: preparedItem.InvoiceDate,
            InvoiceNumber: preparedItem.InvoiceNumber,
            GtdDate: preparedItem.GtdDate,
            GtdNumber: preparedItem.GtdNumber,
            MiroDocument: preparedItem.MiroDocument
          }
        })
      }
    }

    return {
      success: true,
      message: 'Changes saved successfully'
    }
  } catch (error) {
    console.error('Error saving changes:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to save changes'
    })
  }
})
