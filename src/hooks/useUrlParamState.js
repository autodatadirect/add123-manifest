import { useHistory, useNavigate } from 'react-router'
import queryString from 'query-string'
import useUrlParams from './useUrlParams'

/**
 * A hook with an API similar to useState that stores its state in the URL search parameters.
 */
export default () => {
  const state = useUrlParams()

  let navigateFunction
  if (useNavigate) {
    navigateFunction = useNavigate()
  } else {
    const history = useHistory()
    navigateFunction = history.push
  }

  return [
    state,
    newState => navigateFunction({ search: '?' + queryString.stringify({ ...newState }) })
  ]
}
