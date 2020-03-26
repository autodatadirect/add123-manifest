import React from 'react'
import PropTypes from 'prop-types'
import { Manifest, DefaultTable, DefaultControlsStatus, Debug } from 'use-manifest'
import { Row, Col } from 'reactstrap'
import Pager from './Pager'
import PageSizer from './PageSizer'
import UrlHeader from './UrlHeader'

const DEFAULT_PAGE_SIZES = [10, 20, 50, 100]

const DEFAULT_PAGESIZE_LABEL_GENERATOR = size => `Show ${size}`

const DEFAULT_STATUS_MESSAGE_GENERATOR = ({ count, lastOnPage, firstOnPage, loading }) => {
  if (loading) return 'Loading'
  return count < 1 ? 'No Results' : `Showing ${firstOnPage} to ${lastOnPage} of ${count}`
}

const StandardManifest = props => {
  const {
    fetchCount,
    fetchRows,
    definition,
    pageSizes = DEFAULT_PAGE_SIZES,
    pageSizeLabelGenerator = DEFAULT_PAGESIZE_LABEL_GENERATOR,
    statusMessageGenerator = DEFAULT_STATUS_MESSAGE_GENERATOR,
    trPropsHandler,
    tdPropsHandler,
    Filter,
    debug = false
  } = props

  const adjustedDefinition = definition.map(def => ({ ...def, headerComponent: def.headerComponent || UrlHeader }))

  return (
    <Manifest fetchRows={fetchRows} fetchCount={fetchCount} definition={adjustedDefinition}>
      {Filter ? <Filter /> : null}
      <DefaultTable className='table' trPropsHandler={trPropsHandler} tdPropsHandler={tdPropsHandler} />
      <Row>
        <Col className='pl-4'>
          <PageSizer className='row-limit form form-control' pageSizes={pageSizes} pageSizeLabelGenerator={pageSizeLabelGenerator} />
        </Col>
        <Col className='text-center'>
          <DefaultControlsStatus statusMessageGenerator={statusMessageGenerator} />
        </Col>
        <Col className='pr-4'>
          <Pager />
        </Col>
      </Row>
      {debug ? <Debug /> : null}
    </Manifest>
  )
}

StandardManifest.propTypes = {
  fetchCount: PropTypes.func.isRequired,
  fetchRows: PropTypes.func.isRequired,
  definition: PropTypes.array.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number),
  pageSizeLableGenerator: PropTypes.func,
  statusMessageGenerator: PropTypes.func,
  trPropsHandler: PropTypes.func,
  tdPropsHandler: PropTypes.func,
  Filter: PropTypes.func,
  debug: PropTypes.bool
}

export default StandardManifest
