import metadata from './meta.JSON'
export default defineEventHandler(event => {
  const query = getQuery(event)
  const {
    page = 1,
    pageSize = 10,
    sortField = 'a',
    sortOrder = 'asc',
    dateFrom,
    dateTo,
    codeNumber,
    meta = false
  } = query

  // Return metadata if requested
  if (meta) {
    return metadata
  }

  // Generate realistic mock data
  const generateMockData = () => {
    const currentDate = new Date()
    const startOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      1
    )
    const endOfMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    )

    const mockData = []
    let currentDay = new Date(startOfMonth)

    const productCodes = [
      'АБ-123',
      'ВГ-456',
      'ДЕ-789',
      'ЖЗ-012',
      'ИК-345',
      'ЛМ-678',
      'НО-901',
      'ПР-234'
    ]

    while (currentDay <= endOfMonth) {
      // Generate data for each shift
      for (let shift = 1; shift <= 3; shift++) {
        for (const code of productCodes) {
          // Some random variation in data
          const quantity = Math.floor(Math.random() * 500) + 100 // 100-600
          const defects = Math.floor(Math.random() * (quantity * 0.1)) // 0-10% defects

          // Not every product is produced every shift
          if (Math.random() > 0.3) {
            // 70% chance of having data
            mockData.push({
              id: mockData.length + 1,
              code,
              quantity,
              defects,
              defectRate:
                quantity > 0
                  ? ((defects / quantity) * 100).toFixed(2) + '%'
                  : '0%',
              date: new Date(currentDay),
              shift: shift.toString()
            })
          }
        }
      }

      // Move to next day
      currentDay.setDate(currentDay.getDate() + 1)
    }

    return mockData
  }

  const mockData = generateMockData()

  // Filtering
  let filteredData = [...mockData]
  if (dateFrom && dateTo) {
    const start = new Date(dateFrom as string)
    const end = new Date(dateTo as string)
    filteredData = filteredData.filter(item => {
      const itemDate = new Date(item.date)
      return itemDate >= start && itemDate <= end
    })
  }
  if (codeNumber) {
    filteredData = filteredData.filter(item =>
      item.code
        .toLowerCase()
        .includes((codeNumber as string).toLowerCase())
    )
  }

  // Sorting
  filteredData.sort((a: any, b: any) => {
    const aValue = a[sortField as string]
    const bValue = b[sortField as string]

    // Special handling for dates
    if (sortField === 'date') {
      const dateA = new Date(aValue)
      const dateB = new Date(bValue)
      return sortOrder === 'asc'
        ? dateA.getTime() - dateB.getTime()
        : dateB.getTime() - dateA.getTime()
    }

    // Regular sorting for other fields
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1
    }
    return aValue < bValue ? 1 : -1
  })

  // Pagination
  const start = ((page as number) - 1) * (pageSize as number)
  const paginatedData = filteredData.slice(
    start,
    start + (pageSize as number)
  )

  return {
    data: paginatedData,
    total: filteredData.length
  }
})
