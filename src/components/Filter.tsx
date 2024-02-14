import React, { FC, ReactNode, useCallback, useEffect, useRef } from 'react'
import { AmiableForm, useForm, useSubmit } from 'amiable-forms'
import { useManifest } from 'use-manifest'

import { fromUrl as sortsFromUrl } from '../utils/sortsConverter'
import useUrlParamState from '../hooks/useUrlParamState'

const NOPE = (): boolean => false

interface UpdaterProps {
  urlState: {
    [key: string]: any
  }
  defaultValues?: {
    [key: string]: any
  }
  defaultTableState: {
    [key: string]: any
  }
}

interface UpdaterFilter {
  [key: string]: any
}

const Updater = ({ urlState, defaultValues, defaultTableState }: UpdaterProps): null => {
  const { updateState: updateManifestState } = useManifest()
  const { setValues: updateForm } = useForm({ shouldUpdate: NOPE })
  const filterRef = useRef<UpdaterFilter>()

  useEffect(() => {
    const updatedFilter = {
      ...(defaultValues ?? {}),
      ...(defaultTableState ?? {}),
      ...urlState
    }

    const page = +updatedFilter.page
    const pageSize = +updatedFilter.pageSize
    const sorts = sortsFromUrl(updatedFilter.sort)

    delete updatedFilter.page
    delete updatedFilter.pageSize
    delete updatedFilter.sort

    if (JSON.stringify(updatedFilter) !== JSON.stringify(filterRef.current)) {
      filterRef.current = updatedFilter
    }

    updateForm(filterRef.current)
    updateManifestState({ filter: filterRef.current, page, pageSize, sorts })
  }, [updateForm, updateManifestState, filterRef.current, defaultValues, urlState])

  return null
}

const SubmitOnEnter: FC<{ children: ReactNode }> = ({ children }) => {
  const { submit } = useSubmit()
  const handler = (ev: any): void => {
    if (ev.which === 13) submit()
  }
  return <div onKeyDown={handler}>{children}</div>
}

/**
* An additional parameters "cb" (cache-buster) is saved to allow resubmission of save values.
*/

export interface FilterProps {
  children: ReactNode
  defaultValues?: {
    [key: string]: any
  }
  defaultTableState: {
    [key: string]: any
  }
  transform: AmiableFormProps['transform']
  loadingClassName?: string
}

const LoadingMessage: FC<{ className?: string }> = ({ className = 'd-flex' }) =>
  <div className={className}>
    <h3 className='m-auto'>
      Loading ...
    </h3>
  </div>

let counter = 0

const Filter: FC<FilterProps> = ({ children, defaultValues, defaultTableState, transform, loadingClassName }) => {
  const [urlState, updateUrl] = useUrlParamState()
  const { loadingCount, loadingRows } = useManifest()

  const process = useCallback((values: Record<string, any>) => {
    updateUrl({ ...values, pageSize: urlState.pageSize, sort: urlState.sort, cb: counter++ })
  }, [urlState, updateUrl])

  return (
    <AmiableForm process={process} transform={transform}>
      <Updater urlState={urlState} defaultValues={defaultValues} defaultTableState={defaultTableState} />
      <SubmitOnEnter>
        {!loadingCount && !loadingRows ? children : <LoadingMessage className={loadingClassName} />}
      </SubmitOnEnter>
    </AmiableForm>
  )
}

export default Filter
