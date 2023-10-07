import React, { FC, useCallback } from 'react'
import { useManifest } from 'use-manifest'

import useUrlParamState from '../hooks/useUrlParamState'

const DEFAULT_PAGE_SIZES = [10, 20, 50, 100]

const DEFAULT_TEXT_GENERATOR = (size: number): string => `Show ${size} entries`

const numbersAscending = (a: number, b: number): number => a - b

export interface PageSizerProps {
  pageSizes?: number[]
  pageSizeLabelGenerator?: (size: number) => string
}

const PageSizer: FC<PageSizerProps> = ({ pageSizes = DEFAULT_PAGE_SIZES, pageSizeLabelGenerator = DEFAULT_TEXT_GENERATOR }) => {
  const [urlState, updateUrl] = useUrlParamState()
  const { pageSize } = useManifest()

  const handlePageSizeChange = useCallback((ev: any) => {
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

export default PageSizer
