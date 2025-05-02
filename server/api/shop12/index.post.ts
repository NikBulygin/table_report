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
    const newIds: number[] = []

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

    // Обрабатываем редактирование существующих записей
    if (edited && edited.length > 0) {
      await Promise.all(
        edited.map((item: Shop12Item) => {
          const preparedItem = prepareItem(item)
          return prisma.shop12.update({
            where: { id: item.id },
            data: {
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
        })
      )
    }

    // Обрабатываем добавление новых записей
    if (added && added.length > 0) {
      const createdItems = await Promise.all(
        added.map((item: Shop12Item) => {
          const preparedItem = prepareItem(item)
          return prisma.shop12.create({
            data: {
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
        })
      )

      newIds.push(...createdItems.map(item => item.id))
    }

    return {
      success: true,
      message: 'Changes saved successfully',
      newIds
    }
  } catch (error) {
    console.error('Error saving changes:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to save changes'
    })
  }
})
