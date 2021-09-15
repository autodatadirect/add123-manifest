import { useRef } from 'react'
import { useHistory } from 'react-router'
import queryString from 'query-string'
import useUrlParams from './useUrlParams'

/**
 * A hook with an API similar to useState that stores its state in the URL search parameters.
 *
 * An additional parameters "cb" (cache-buster) is saved to allow resubmission of save values.
 */

const equals = (a, b) => {
  console.log('urla', a, 'urlb', b)
  // try {
  console.log('#url param equal?#', JSON.stringify(a) === JSON.stringify(b))
  return JSON.stringify(a) === JSON.stringify(b)
  // } catch (err) {
  //   console.log('err', err)
  // }
}

export default () => {
  const stateRef = useRef()
  const state = useUrlParams()
  const history = useHistory()
  stateRef.current = { search: '?' + queryString.stringify({ ...state }) }
  return [
    state,
    newState => {
      console.log('&*&*&*@&@&@&@*& UPDATE URL')
      const newStateRef = { search: '?' + queryString.stringify({ ...newState }) }
      if (!equals(stateRef.current, newStateRef)) {
        console.log('==========> THIS')
        stateRef.current = newStateRef
        history.push(newStateRef)
      }
    }
  ]
}
