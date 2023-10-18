import { useNavigate } from 'react-router'
import queryString from 'query-string'
import useUrlParams, { UrlParams } from './useUrlParams'

/**
 * A hook with an API similar to useState that stores its state in the URL search parameters.
 */
export default (): [UrlParams, ((newState: Record<string, any>) => void)] => {
  const state = useUrlParams()
  const navigate = useNavigate()

  return [
    state,
    newState => navigate({ search: '?' + queryString.stringify({ ...newState }) })
  ]
}
