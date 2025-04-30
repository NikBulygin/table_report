import { prisma } from '~/server/utils/prisma'

export default defineEventHandler(async event => {
  try {
    const { gtdNumbers } = await readBody(event)

    if (
      !gtdNumbers ||
      !Array.isArray(gtdNumbers) ||
      gtdNumbers.length === 0
    ) {
      throw createError({
        statusCode: 400,
        message: 'No GTD numbers provided for deletion'
      })
    }

    // Удаляем все указанные ГТД
    await prisma.shop2GTD.deleteMany({
      where: {
        GtdNumber: {
          in: gtdNumbers
        }
      }
    })

    return { success: true }
  } catch (error: any) {
    console.error('Error in shop2 DELETE:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Error deleting shop2 data'
    })
  }
})
