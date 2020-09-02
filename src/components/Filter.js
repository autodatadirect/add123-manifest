import React, { useEffect, useCallback } from 'react'
import { AmiableForm, useForm, useSubmit } from 'amiable-forms'
import { useManifest } from 'use-manifest'

import { fromUrl as sortsFromUrl } from '../utils/sortsConverter'
import useUrlParamState from '../hooks/useUrlParamState'

const NOPE = () => false

const Updater = ({ urlState, defaultValues, pageSize, sorts }) => {
  const { updateState: updateManifestState } = useManifest()
  const { setValues: updateForm } = useForm({ shouldUpdate: NOPE })

  useEffect(() => {
    const filter = { ...(defaultValues || {}), ...urlState }

    const page = +filter.page
    const pageSize = +filter.pageSize
    const sorts = sortsFromUrl(filter.sort)

    delete filter.page
    delete filter.pageSize
    delete filter.sort

    updateForm(filter)
    updateManifestState({ filter, page, pageSize, sorts })
  }, [updateForm, updateManifestState, urlState, defaultValues])

  return null
}

const SubmitOnEnter = ({ children }) => {
  const { submit } = useSubmit()
  const handler = ev => {
    if (ev.which === 13) submit()
  }
  return <div onKeyDown={handler}>{children}</div>
}

export default ({ children, defaultValues, pageSize, sorts, transform }) => {
  const [urlState, updateUrl] = useUrlParamState()
  const process = useCallback(values => updateUrl({ ...values, pageSize: urlState.pageSize, sort: urlState.sort }), [urlState, updateUrl])
  return (
    <AmiableForm process={process} transform={transform}>
      <Updater urlState={urlState} defaultValues={defaultValues} pageSize={pageSize} sorts={sorts} />
      <SubmitOnEnter>
        {children}
      </SubmitOnEnter>
    </AmiableForm>
  )
}
