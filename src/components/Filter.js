import React, { useEffect, useCallback, useRef } from 'react'
import { AmiableForm, useForm, useSubmit } from 'amiable-forms'
import { useManifest } from 'use-manifest'

import { fromUrl as sortsFromUrl } from '../utils/sortsConverter'
import useUrlParamState from '../hooks/useUrlParamState'

const NOPE = () => false

const Updater = ({ urlState, defaultValues }) => {
  const { updateState: updateManifestState } = useManifest()
  const { setValues: updateForm } = useForm({ shouldUpdate: NOPE })
  const filter = useRef()

  useEffect(() => {
    const updatedFilter = { ...(defaultValues || {}), ...urlState }

    const page = +updatedFilter.page
    const pageSize = +updatedFilter.pageSize
    const sorts = sortsFromUrl(updatedFilter.sort)

    delete updatedFilter.page
    delete updatedFilter.pageSize
    delete updatedFilter.sort

    if (JSON.stringify(updatedFilter) !== JSON.stringify(filter.current)) {
      filter.current = updatedFilter
    }

    updateForm(filter.current)
    updateManifestState({ filter: filter.current, page, pageSize, sorts })
  }, [updateForm, updateManifestState, filter.current, defaultValues, urlState])

  return null
}

const SubmitOnEnter = ({ children }) => {
  const { submit } = useSubmit()
  const handler = ev => {
    if (ev.which === 13) submit()
  }
  return <div onKeyDown={handler}>{children}</div>
}

/**
* An additional parameters "cb" (cache-buster) is saved to allow resubmission of save values.
*/

let counter = 0

export default ({ children, defaultValues, transform }) => {
  const [urlState, updateUrl] = useUrlParamState()

  const process = useCallback(values => {
    updateUrl({ ...values, pageSize: urlState.pageSize, sort: urlState.sort, cb: counter++ })
  }, [urlState, updateUrl])

  return (
    <AmiableForm process={process} transform={transform}>
      <Updater urlState={urlState} defaultValues={defaultValues} />
      <SubmitOnEnter>
        {children}
      </SubmitOnEnter>
    </AmiableForm>
  )
}
