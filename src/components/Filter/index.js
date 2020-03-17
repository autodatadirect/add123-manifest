import React, { useEffect, useRef } from 'react'
import { AmiableForm, useForm, useSubmit } from 'amiable-forms'
import { useManifest } from 'use-manifest'

import useUrlParamState from '../../hooks/useUrlParamState'

const NOPE = () => false

const useIsFirstLoad = () => {
  const ref = useRef()
  if (!ref.current) {
    ref.current = true
    return true
  }
  return false
}

const parseSorts = urlSort => {
  if (!urlSort) return []
  const sortArray = (typeof urlSort === 'string') ? [urlSort] : urlSort
  return sortArray.map(sort => ({
    id: sort.replace(/^!/, ''),
    direction: sort.startsWith('!') ? 'DESCENDING' : 'ASCENDING'
  }))
}

const Updater = ({ urlState, initialValues, pageSize, sorts }) => {
  const isFirstLoad = useIsFirstLoad()
  const { updateState: updateManifestState } = useManifest()
  const { setValues: updateForm } = useForm({ shouldUpdate: NOPE })

  useEffect(() => {
    const filter = isFirstLoad ? { ...initialValues, ...urlState } : { ...urlState }

    const page = +filter.page
    const pageSize = +filter.pageSize
    const sorts = parseSorts(filter.sort)

    delete filter.page
    delete filter.pageSize
    delete filter.sort

    updateManifestState({ filter, page, pageSize, sorts })
  }, [updateForm, updateManifestState, urlState, initialValues])

  return null
}

const SubmitOnEnter = ({ children }) => {
  const { submit } = useSubmit()
  const handler = ev => {
    if (ev.which === 13) submit()
  }
  return <div onKeyDown={handler}>{children}</div>
}

export default ({ children, initialValues, pageSize, sorts }) => {
  const [urlState, updateUrl] = useUrlParamState()
  return (
    <AmiableForm process={updateUrl}>
      <Updater urlState={urlState} initialValues={initialValues} pageSize={pageSize} sorts={sorts} />
      <SubmitOnEnter>
        {children}
      </SubmitOnEnter>
    </AmiableForm>
  )
}
