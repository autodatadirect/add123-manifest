import React, { FC, ReactNode, useCallback } from 'react'
import { usePager } from 'use-manifest'
import useUrlParamState from '../hooks/useUrlParamState'

interface PagerProps {
  className?: string
}

const Pager: FC<PagerProps> = ({ className = '' }) => {
  const { page, pages, count, pageSize, loading, showFirst, showPrevious, showNext, showLast } = usePager({ numberOfPages: 5 })
  const lastPage = Math.ceil(count ?? 0 / pageSize) - 1

  if (count != null && count < 1) return null
  return (
    <div className={`manifest-pager btn-group mx-auto ml-md-auto ${className}`} role='group' aria-label='pager'>
      {showFirst ? <PagerButton page={0} loading={loading}>First</PagerButton> : null}
      {showPrevious ? <PagerButton page={page - 1} loading={loading}>{'<'}</PagerButton> : null}
      {pages.map(i => <PagerButton key={i} page={i} isCurrentPage={page === i} loading={loading}>{i + 1}</PagerButton>)}
      {showNext ? <PagerButton page={page + 1} loading={loading}>{'>'}</PagerButton> : null}
      {showLast ? <PagerButton page={lastPage} loading={loading}>Last</PagerButton> : null}
    </div>
  )
}

interface PagerButtonProps {
  loading: boolean
  page: number
  children: ReactNode
  isCurrentPage?: boolean
}

const PagerButton: FC<PagerButtonProps> = ({ page, loading, isCurrentPage = false, children }) => {
  const [urlState, updateUrl] = useUrlParamState()
  const handleClick = useCallback(() => updateUrl({ ...urlState, page }), [page, urlState])

  let buttonStyle = 'btn rounded page-button'
  if (isCurrentPage) buttonStyle += ' current-page'
  const color = isCurrentPage ? 'primary' : 'default'
  return (
    <button data-page={page} color={color} className={buttonStyle} onClick={handleClick} disabled={loading}>
      {children}
    </button>
  )
}

export default Pager
