import { useHistory } from 'react-router'
import queryString from 'query-string'
import useUrlParams from './useUrlParams'

let counter = 0

/**
 * A hook with an API similar to useState that stores its state in the URL search parameters.
 *
 * An additional parameters "cb" (cache-buster) is saved to allow resubmission of save values.
 */
export default () => {
  const state = useUrlParams()
  const history = useHistory()
  return [
    state,
    newState => history.push({ search: '?' + queryString.stringify({ ...newState, cb: counter++ }) })
  ]
}
