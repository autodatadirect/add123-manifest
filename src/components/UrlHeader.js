import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { useHeaderCell } from 'use-manifest'
import { ASCENDING, DESCENDING } from 'use-manifest/dist/constants/sortDirections'
import useUrlParamState from '../hooks/useUrlParamState'

const UrlHeader = ({ columnIndex }) => {
  const [urlState, updateUrl] = useUrlParamState()
  const header = useHeaderCell(columnIndex)
  const { id, label, sortDirection, sortable } = header

  const handleSort = useCallback(() => {
    if (!sortable) return
    console.log('-----url header---------')
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

UrlHeader.propTypes = {
  columnIndex: PropTypes.number.isRequired
}

const sortClass = ({ sortable, sortDirection }) => {
  const classes = []

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
