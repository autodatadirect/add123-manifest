import React, { useCallback } from 'react'
import propTypes from 'prop-types'

const DEFAULT_PAGE_SIZES = [10, 20, 50, 100, 200]

const DEFAULT_TEXT_GENERATOR = size => `Show ${size} entries`

const PageSizer = ({ pageSizes = DEFAULT_PAGE_SIZES, pageSizeLabelGenerator = DEFAULT_TEXT_GENERATOR }) => {
  //const { pageSize, setPageSize } = useManifest()
  const [urlState, updateUrl] = useUrlParamState()

  const { pageSize } = urlState

  console.log('PageSizer', {urlState})


  const handlePageSizeChange = useCallback(ev => {
    const pageSize = +ev.target.value
    updateUrl({...urlState, pageSize })
  }, [updateUrl, urlState])

  return (
    <select className='form-control' value={pageSize} onChange={handlePageSizeChange}>
      {pageSizes.map(size => <option key={size} value={size}>{pageSizeLabelGenerator(size)}</option>)}
    </select>
  )
}

PageSizer.propTypes = {
  pageSizes: propTypes.arrayOf(propTypes.number),
  pageSizeLableGenerator: propTypes.func,
  className: propTypes.string
}

export default PageSizer
