export default defineEventHandler(async event => {
  const body = await readBody(event)
  const { edited, new: newRows } = body

  // В реальном приложении здесь будет логика сохранения в БД
  console.log('Edited rows:', edited)
  console.log('New rows:', newRows)

  return {
    success: true,
    message: 'Data saved successfully'
  }
})
