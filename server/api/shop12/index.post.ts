import { PrismaClient } from '@prisma/client'
import { shop12Config } from '~/composable/shop12'

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

interface Shop12Item {
  id?: number
  weight: number
  tio2Analysis: number
  h2oAnalysis: number
  vagonNumber: string
  InvoiceDate: Date | string
  InvoiceNumber: string
  GtdDate: Date | string
  GtdNumber: string
}

const prepareItem = (item: Shop12Item) => {
  const recalculatedWeight = shop12Config.calc.recalculatedWeight(item)
  return {
    ...item,
    weight: Number(item.weight),
    tio2Analysis: Number(item.tio2Analysis),
    h2oAnalysis: Number(item.h2oAnalysis),
    recalculatedWeight,
    InvoiceDate: normalizeDate(item.InvoiceDate),
    GtdDate: normalizeDate(item.GtdDate)
  }
}

export default defineEventHandler(async event => {
  try {
    const body = await readBody(event)
    const { deleted, edited, added } = body

    // Обрабатываем удаление
    if (deleted && deleted.length > 0) {
      await prisma.shop12.deleteMany({
        where: {
          id: {
            in: deleted
          }
        }
      })
    }

    // Обрабатываем редактирование
    if (edited && edited.length > 0) {
      for (const item of edited) {
        await prisma.shop12.update({
          where: { id: item.id },
          data: prepareItem(item)
        })
      }
    }

    // Обрабатываем добавление
    if (added && added.length > 0) {
      for (const item of added) {
        const preparedItem = prepareItem(item)
        await prisma.shop12.upsert({
          where: {
            id: preparedItem.id || -1 // Use -1 for new items
          },
          create: {
            weight: preparedItem.weight,
            tio2Analysis: preparedItem.tio2Analysis,
            h2oAnalysis: preparedItem.h2oAnalysis,
            vagonNumber: preparedItem.vagonNumber,
            InvoiceDate: preparedItem.InvoiceDate,
            InvoiceNumber: preparedItem.InvoiceNumber,
            GtdDate: preparedItem.GtdDate,
            GtdNumber: preparedItem.GtdNumber,
            recalculatedWeight: preparedItem.recalculatedWeight
          },
          update: {
            weight: preparedItem.weight,
            tio2Analysis: preparedItem.tio2Analysis,
            h2oAnalysis: preparedItem.h2oAnalysis,
            vagonNumber: preparedItem.vagonNumber,
            InvoiceDate: preparedItem.InvoiceDate,
            InvoiceNumber: preparedItem.InvoiceNumber,
            GtdDate: preparedItem.GtdDate,
            GtdNumber: preparedItem.GtdNumber,
            recalculatedWeight: preparedItem.recalculatedWeight
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
