import React, { useCallback } from 'react'
import propTypes from 'prop-types'
import { useManifest } from 'use-manifest'

import useUrlParamState from '../hooks/useUrlParamState'

const DEFAULT_PAGE_SIZES = [10, 20, 50, 100]

const DEFAULT_TEXT_GENERATOR = size => `Show ${size} entries`

const numbersAscending = (a, b) => a - b

const PageSizer = ({ pageSizes = DEFAULT_PAGE_SIZES, pageSizeLabelGenerator = DEFAULT_TEXT_GENERATOR }) => {
  const [urlState, updateUrl] = useUrlParamState()
  const { pageSize } = useManifest()

  const handlePageSizeChange = useCallback(ev => {
    const updatedPageSize = +ev.target.value
    updateUrl({ ...urlState, pageSize: updatedPageSize, page: 0 })
  }, [updateUrl, urlState])

  if (!pageSizes.includes(pageSize)) pageSizes.push(pageSize)

  const sizesClone = [...pageSizes]
  sizesClone.sort(numbersAscending)

  return (
    <select className='form-control' value={pageSize} onChange={handlePageSizeChange}>
      {sizesClone.map(size => <option key={size} value={size}>{pageSizeLabelGenerator(size)}</option>)}
    </select>
  )
}

PageSizer.propTypes = {
  pageSizes: propTypes.arrayOf(propTypes.number),
  pageSizeLabelGenerator: propTypes.func,
  className: propTypes.string
}

export default PageSizer
