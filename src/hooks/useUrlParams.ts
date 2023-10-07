import { useRef } from 'react'
import { Location, useLocation } from 'react-router-dom'

export interface UrlParams {
  [key: string]: string | string[]
}

interface LocationRef {
  location: Location | null
  values: UrlParams | null
}

export default (): UrlParams => {
  const location = useLocation()
  const ref = useRef<LocationRef>({ location: null, values: null })
  if (ref.current.location === location) return ref.current.values ?? {}
  const params = new window.URLSearchParams(location.search)

  const values: UrlParams = {}
  for (const [key, value] of params.entries()) {
    const allValues = params.getAll(key)
    values[key] = allValues.length > 1 ? allValues : value
  }

  ref.current = { location, values }
  return values
}
