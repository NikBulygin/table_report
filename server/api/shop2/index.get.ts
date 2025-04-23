import metadata from './meta.json'
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

  return {
    data: [],
    total: 1
  }
})
