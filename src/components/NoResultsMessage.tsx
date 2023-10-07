import React, { FC, ReactNode } from 'react'

const NoRowsMessage: FC<{ message: ReactNode }> = ({ message }) =>
  <div className='no-results my-4'>
    <h2 className='gray-500 m-auto'>
      {message}
    </h2>
  </div>

export default NoRowsMessage
