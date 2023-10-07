import React, { FC, useCallback } from 'react'
import { Sort, useHeaderCell } from 'use-manifest'
import { ASCENDING, DESCENDING } from 'use-manifest/dist/constants/sortDirections'
import useUrlParamState from '../hooks/useUrlParamState'

const UrlHeader: FC<{ columnIndex: number }> = ({ columnIndex }) => {
  const [urlState, updateUrl] = useUrlParamState()
  const header = useHeaderCell(columnIndex)
  const { id, label, sortDirection, sortable } = header

  const handleSort = useCallback(() => {
    if (sortable === undefined || !sortable) return
    updateUrl({
      ...urlState,
      page: 0,
      sort: sortDirection !== ASCENDING ? id : '~' + id
    })
  }, [sortable, sortDirection, id, urlState])

  return (
    <div className={sortClass({ sortable, sortDirection })} onClick={handleSort}>
      {label}
    </div>
  )
}

const sortClass = ({ sortable = false, sortDirection }: { sortable?: boolean, sortDirection: Sort['direction'] }): string => {
  const classes: string[] = []

  if (sortable) {
    classes.push('sortable')
  }

  if (sortDirection === ASCENDING) {
    classes.push('sorted')
    classes.push('sorted-asc')
  } else if (sortDirection === DESCENDING) {
    classes.push('sorted')
    classes.push('sorted-desc')
  }

  return classes.join(' ')
}

export default UrlHeader
