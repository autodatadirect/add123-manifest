import React, { ReactNode } from 'react'
import useNoRowsMessage, { MODE_NO_RESULTS, MODE_HIDDEN, MODE_ERROR } from '../hooks/useNoRowsMessage'
import NoRowsMessage from './NoResultsMessage'

const NoResultsHandler = ({ noResultsMesg = 'No Results', loadingMesg = 'Loading ...', errorMesg = 'Error' }): ReactNode => {
  const mode = useNoRowsMessage()
  if (mode === MODE_HIDDEN) return null
  let message = loadingMesg
  if (mode === MODE_ERROR) message = errorMesg
  if (mode === MODE_NO_RESULTS) message = noResultsMesg
  return <NoRowsMessage message={message} />
}

export default NoResultsHandler
