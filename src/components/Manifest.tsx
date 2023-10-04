import React, { ElementType, ReactNode } from 'react'
import {
  CountFetcher,
  Debug,
  DefaultControlsStatus,
  DefaultTable, Definition,
  Manifest, ManifestContext, ManifestProps,
  PageSizerProps, RowFetcher,
  StatusProps, TableRowProps, useManifest
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

const ManifestNavigation = ({ pageSizes, pageSizeLabelGenerator, statusMessageGenerator }: ManifestNavigationProps): ReactNode =>
  <div className='row align-items-center mx-0'>
    <div className='col-xs-12 col-md-3 pl-md-4 my-2 my-md-0 text-sm-center text-md-left'>
      <PageSizer
        className='row-limit form form-control' pageSizes={pageSizes}
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

interface StandardManifestProps<Row, Filter> {
  fetchCount: CountFetcher<Filter>
  fetchRows: RowFetcher<Filter, Row>
  definition: Definition[]
  pageSizes?: number[]
  pageSizeLabelGenerator?: PageSizeLabelGenerator
  statusMessageGenerator?: StatusMessageGenerator
  NoResultsComponent?: ElementType
  trPropsHandler?: TableRowProps<Row>['trPropsHandler']
  tdPropsHandler: TableRowProps<Row>['tdPropsHandler']
  Filter: ElementType
  debug?: boolean
}

const StandardManifest = function <TFilter, Row>(props: StandardManifestProps<TFilter, Row>): React.JSX.Element {
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

  const adjustedDefinition = definition.map(def => ({ ...def, headerComponent: def.headerComponent ?? UrlHeader }))
  return (
    <Manifest fetchRows={fetchRows} fetchCount={fetchCount} definition={adjustedDefinition}>
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

export interface Manifesto<Filter, Row> {
  useManifest: () => ManifestContext<Filter, Row>
  Manifest: ({ children, fetchRows, fetchCount, definition, autoLoad }: ManifestProps<Filter, Row>) => React.JSX.Element
}

export function manifesto<Filter, Row> (): Manifesto<Filter, Row> {
  return {
    Manifest: Manifest<Filter, Row>,
    useManifest: useManifest<Filter, Row>
  } as any
}

export default StandardManifest
