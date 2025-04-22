export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { id } = body

  // В реальном приложении здесь будет логика удаления из БД
  console.log('Deleted row id:', id)

  return {
    success: true,
    message: 'Row deleted successfully'
  }
})
