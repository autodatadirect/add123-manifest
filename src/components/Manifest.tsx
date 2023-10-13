import React, { ElementType, FC, ReactNode } from 'react'
import {
  CountFetcher,
  Debug, DefArray,
  DefaultControlsStatus,
  DefaultTable, Definition, Manifest,
  PageSizerProps, RowFetcher, RowType,
  StatusProps, TableRowProps
} from 'use-manifest'
import Pager from './Pager.js'
import PageSizer from './PageSizer.js'
import UrlHeader from './UrlHeader.js'
import NoResultsHandler from './NoResultsHandler.js'

type PageSizeLabelGenerator = PageSizerProps['pageSizeLabelGenerator']
type StatusMessageGenerator = StatusProps['statusMessageGenerator']

interface ManifestNavigationProps {
  pageSizes?: number[]
  pageSizeLabelGenerator?: PageSizeLabelGenerator
  statusMessageGenerator?: StatusMessageGenerator
}

const ManifestNavigation: FC<ManifestNavigationProps> = ({ pageSizes, pageSizeLabelGenerator, statusMessageGenerator }): ReactNode => {
  return (
    <div className='row align-items-center mx-0'>
      <div className='col-xs-12 col-md-3 pl-md-4 my-2 my-md-0 text-sm-center text-md-left'>
        {/* className='row-limit form form-control' TODO: Not currently recognized by PageSizer! */}
        <PageSizer
          pageSizes={pageSizes}
          pageSizeLabelGenerator={pageSizeLabelGenerator}
        />
      </div>
      <div className='col-xs-12 col-md text-center my-2 my-md-0'>
        <DefaultControlsStatus statusMessageGenerator={statusMessageGenerator} />
      </div>
      <div className='col-xs-12 col-md-auto pr-md-4 my-2 my-md-0 d-flex d-md-block'>
        <Pager />
      </div>
    </div>
  )
}

export interface StandardManifestProps<Def extends DefArray, Filter> {
  fetchCount: CountFetcher<Filter>
  fetchRows: RowFetcher<Filter, Def>
  definition: Def
  tdPropsHandler: TableRowProps<RowType<Def>>['tdPropsHandler']
  Filter: ElementType

  pageSizes?: number[]
  pageSizeLabelGenerator?: PageSizeLabelGenerator
  statusMessageGenerator?: StatusMessageGenerator
  NoResultsComponent?: ElementType
  trPropsHandler?: TableRowProps<RowType<Def>>['trPropsHandler']
  debug?: boolean
}

const StandardManifest = function <Def extends DefArray, TFilter>(props: StandardManifestProps<Def, TFilter>): ReactNode {
  const {
    fetchCount,
    fetchRows,
    definition,
    pageSizes,
    pageSizeLabelGenerator,
    statusMessageGenerator,
    NoResultsComponent = NoResultsHandler,
    trPropsHandler,
    tdPropsHandler,
    Filter,
    debug = false
  } = props

  definition.forEach((def: Definition) => {
    def.headerComponent ??= UrlHeader
  })

  return (
    <Manifest fetchRows={fetchRows} fetchCount={fetchCount} definition={definition}>
      {Filter == null ? null : <Filter />}
      <div className='table-responsive mb-4'>
        <DefaultTable className='table' trPropsHandler={trPropsHandler} tdPropsHandler={tdPropsHandler} />
        <NoResultsComponent />
      </div>
      <ManifestNavigation
        pageSizes={pageSizes} pageSizeLabelGenerator={pageSizeLabelGenerator}
        statusMessageGenerator={statusMessageGenerator}
      />
      {debug && <Debug />}
    </Manifest>
  )
}

export default StandardManifest
