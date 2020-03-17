import { useRef } from 'react'
import { useLocation } from 'react-router-dom'

export default () => {
  const location = useLocation()
  const ref = useRef({ location: null, values: null })
  if (ref.current.location === location) return ref.current.values
  const params = new window.URLSearchParams(location.search)

  const values = {}
  for (const [key, value] of params.entries()) {
    const allValues = params.getAll(key)
    values[key] = allValues.length > 1 ? allValues : value
  }

  ref.current = { location, values }
  return values
}
