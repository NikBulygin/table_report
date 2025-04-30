import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async event => {
  try {
    const { id } = await readBody(event)

    if (!id) {
      throw createError({
        statusCode: 400,
        message: 'Item ID is required'
      })
    }

    await prisma.shop12.delete({
      where: { id }
    })

    return {
      success: true,
      message: 'Item deleted successfully'
    }
  } catch (error) {
    console.error('Error deleting item:', error)
    throw createError({
      statusCode: 500,
      message: 'Failed to delete item'
    })
  }
})
