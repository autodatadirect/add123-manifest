import React from 'react'
import PropTypes from 'prop-types'
import { Manifest, DefaultTable, DefaultControlsStatus, Debug, useManifest } from 'use-manifest'
import { Row, Col } from 'reactstrap'
import Pager from './Pager'
import PageSizer from './PageSizer'
import UrlHeader from './UrlHeader'
import NoResultsHandler from './NoResultsHandler'

const DEFAULT_PAGE_SIZES = [10, 20, 50, 100]

const DEFAULT_PAGESIZE_LABEL_GENERATOR = size => `Show ${size}`

const DEFAULT_STATUS_MESSAGE_GENERATOR = ({ count, lastOnPage, firstOnPage, loading }) => {
  if (loading) return 'Loading...'
  return count < 1 ? 'No Results' : `Showing ${firstOnPage} to ${lastOnPage} of ${count}`
}

const ManifestNavigation = ({ pageSizes, pageSizeLabelGenerator, statusMessageGenerator }) => {
  const { count } = useManifest()
  if (!count) return null
  return (
    <Row className='align-items-center'>
      <Col xs={12} md={3} className='pl-md-4 my-2 my-md-0 text-sm-center text-md-left'>
        <PageSizer className='row-limit form form-control' pageSizes={pageSizes} pageSizeLabelGenerator={pageSizeLabelGenerator} />
      </Col>
      <Col xs={12} md className='text-center my-2 my-md-0'>
        <DefaultControlsStatus statusMessageGenerator={statusMessageGenerator} />
      </Col>
      <Col xs={12} md='auto' className='pr-md-4 my-2 my-md-0 d-flex d-md-block'>
        <Pager />
      </Col>
    </Row>
  )
}

const StandardManifest = props => {
  const {
    fetchCount,
    fetchRows,
    definition,
    pageSizes = DEFAULT_PAGE_SIZES,
    pageSizeLabelGenerator = DEFAULT_PAGESIZE_LABEL_GENERATOR,
    statusMessageGenerator = DEFAULT_STATUS_MESSAGE_GENERATOR,
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
  fetchCount: PropTypes.func.isRequired,
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
