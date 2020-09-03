import propTypes from 'prop-types'

const NoResults = () => {
  return (
    <div className='no-results my-4'>
      <h2 className='gray-500 m-auto'>No Results Found</h2>
    </div>
  )
}

NoResults.propTypes = {
  className: propTypes.string
}

export default NoResults
