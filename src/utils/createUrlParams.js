import { isEmpty } from 'lodash'
import queryString from 'query-string'

export default filter => {
  if (!filter || isEmpty(filter)) return ''
  return queryString.stringify(formatSorts(filter))
}

const formatSorts = filter => {
  const formatted = { ...filter }
  if (formatted.sorts && formatted.sorts.length > 0) {
    formatted.sorts_id_0 = formatted.sorts[0].id
    formatted.sorts_asc_0 = formatted.sorts[0].isAsc
  }
  delete formatted.sorts
  return formatted
}
