import React from 'react'
import propTypes from 'prop-types'

const NoRowsMessage = ({ message }) => {
  return (
    <div className='no-results my-4'>
      <h2 className='gray-500 m-auto'>{message}</h2>
    </div>
  )
}

NoRowsMessage.propTypes = {
  className: propTypes.string
}

export default NoRowsMessage
