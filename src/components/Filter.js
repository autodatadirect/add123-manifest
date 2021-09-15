import React, { useEffect, useCallback, useRef } from 'react'
import { AmiableForm, useForm, useSubmit } from 'amiable-forms'
import { useManifest } from 'use-manifest'

import { fromUrl as sortsFromUrl } from '../utils/sortsConverter'
import useUrlParamState from '../hooks/useUrlParamState'

const NOPE = () => false

const equals = (a, b) => {
  console.log('a', a, 'b', b)
  // try {
  console.log('#equal?#', JSON.stringify(a) === JSON.stringify(b))
  return JSON.stringify(a) === JSON.stringify(b)
  // } catch (err) {
  //   console.log('err', err)
  // }
}

const Updater = ({ urlState, defaultValues }) => {
  const { updateState: updateManifestState, count } = useManifest()
  const { setValues: updateForm } = useForm({ shouldUpdate: NOPE })

  const filterRef = useRef()
  useEffect(() => {
    const filter = { ...(defaultValues || {}), ...urlState }

    const page = +filter.page
    const pageSize = +filter.pageSize
    const sorts = sortsFromUrl(filter.sort)

    delete filter.page
    delete filter.pageSize
    delete filter.sort

    if (!equals(filterRef.current, filter)) {
      console.log('******filter has changed', { count })
      filterRef.current = filter
      updateForm(filter)
    }

    updateManifestState({ filter: filterRef.current, page, pageSize, sorts, count })
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

let counter = 0

export default ({ children, defaultValues, transform }) => {
  const [urlState, updateUrl] = useUrlParamState()

  const process = useCallback(values => {
    // newState => history.push({ search: '?' + queryString.stringify({ ...newState, cb: counter++ }) })

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
