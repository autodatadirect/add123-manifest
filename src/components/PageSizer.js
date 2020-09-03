import React, { useCallback } from 'react'
import propTypes from 'prop-types'
import useUrlParamState from '../hooks/useUrlParamState'

const DEFAULT_PAGE_SIZES = [10, 20, 50, 100, 200]

const DEFAULT_TEXT_GENERATOR = size => `Show ${size} entries`

const PageSizer = ({ pageSizes = DEFAULT_PAGE_SIZES, pageSizeLabelGenerator = DEFAULT_TEXT_GENERATOR }) => {
  const [urlState, updateUrl] = useUrlParamState()
  const { pageSize } = urlState

  const handlePageSizeChange = useCallback(ev => {
    const pageSize = +ev.target.value
    updateUrl({ ...urlState, pageSize, page: 0 })
  }, [updateUrl, urlState])

  return (
    <select className='form-control' value={pageSize} onChange={handlePageSizeChange}>
      {pageSizes.map(size => <option key={size} value={size}>{pageSizeLabelGenerator(size)}</option>)}
    </select>
  )
}

PageSizer.propTypes = {
  pageSizes: propTypes.arrayOf(propTypes.number),
  pageSizeLabelGenerator: propTypes.func,
  className: propTypes.string
}

export default PageSizer
