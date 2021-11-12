import { useHistory } from 'react-router'
import queryString from 'query-string'
import useUrlParams from './useUrlParams'

/**
 * A hook with an API similar to useState that stores its state in the URL search parameters.
 */
export default () => {
  const state = useUrlParams()
  const history = useHistory()
  return [
    state,
    newState => history.push({ search: '?' + queryString.stringify({ ...newState }) })
  ]
}
