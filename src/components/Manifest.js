import React from 'react'
import PropTypes from 'prop-types'
import { Manifest, DefaultTable, DefaultControlsStatus, Debug } from 'use-manifest'
import Pager from './Pager'
import PageSizer from './PageSizer'
import UrlHeader from './UrlHeader'
import NoResultsHandler from './NoResultsHandler'

const DEFAULT_PAGE_SIZES = [10, 20, 50, 100]

const ManifestNavigation = ({ pageSizes, pageSizeLabelGenerator, statusMessageGenerator }) =>
  <div className='row align-items-center mx-0'>
    <div className='col-xs-12 col-md-3 pl-md-4 my-2 my-md-0 text-sm-center text-md-left'>
      <PageSizer className='row-limit form form-control' pageSizes={pageSizes} pageSizeLabelGenerator={pageSizeLabelGenerator} />
    </div>
    <div className='col-xs-12 col-md text-center my-2 my-md-0'>
      <DefaultControlsStatus statusMessageGenerator={statusMessageGenerator} />
    </div>
    <div className='col-xs-12 col-md-auto pr-md-4 my-2 my-md-0 d-flex d-md-block'>
      <Pager />
    </div>
  </div>

const StandardManifest = props => {
  const {
    fetchCount,
    fetchRows,
    definition,
    pageSizes = DEFAULT_PAGE_SIZES,
    pageSizeLabelGenerator,
    statusMessageGenerator,
    NoResultsComponent = NoResultsHandler,
    trPropsHandler,
    tdPropsHandler,
    Filter,
    debug = false
  } = props

  const adjustedDefinition = definition.map(def => ({ ...def, headerComponent: def.headerComponent || UrlHeader }))
  return (
    <Manifest fetchRows={fetchRows} fetchCount={fetchCount} definition={adjustedDefinition}>
      {Filter ? <Filter /> : null}
      <div className='table-responsive mb-4'>
        <DefaultTable className='table' trPropsHandler={trPropsHandler} tdPropsHandler={tdPropsHandler} />
        <NoResultsComponent />
      </div>
      <ManifestNavigation pageSizes={pageSizes} pageSizeLabelGenerator={pageSizeLabelGenerator} statusMessageGenerator={statusMessageGenerator} />
      {debug ? <Debug /> : null}
    </Manifest>
  )
}

StandardManifest.propTypes = {
  fetchCount: PropTypes.func,
  fetchRows: PropTypes.func.isRequired,
  definition: PropTypes.array.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number),
  pageSizeLabelGenerator: PropTypes.func,
  statusMessageGenerator: PropTypes.func,
  trPropsHandler: PropTypes.func,
  tdPropsHandler: PropTypes.func,
  Filter: PropTypes.func,
  debug: PropTypes.bool
}

export default StandardManifest
