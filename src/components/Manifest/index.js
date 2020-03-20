import React from 'react'
import PropTypes from 'prop-types'
import { Manifest, DefaultTable, DefaultControlsPageSizer, DefaultControlsStatus } from 'use-manifest'
import { Row, Col } from 'reactstrap'
import Pager from '../Pager'

const DEFAULT_PAGE_SIZES = [10, 20, 50, 100]

const DEFAULT_PAGESIZE_LABEL_GENERATOR = size => `Show ${size}`

const DEFAULT_STATUS_MESSAGE_GENERATOR = ({ count, lastOnPage, firstOnPage }) =>
  count < 1 ? 'No Results' : `Showing ${firstOnPage} to ${lastOnPage} of ${count}`

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
    Filter
  } = props

  return (
    <Manifest fetchRows={fetchRows} fetchCount={fetchCount} definition={definition}>
      {Filter ? <Filter /> : null}
      <DefaultTable className='table' trPropsHandler={trPropsHandler} tdPropsHandler={tdPropsHandler} />
      <Row>
        <Col>
          <DefaultControlsPageSizer className='row-limit form form-control' pageSizes={pageSizes} pageSizeLabelGenerator={pageSizeLabelGenerator} />
        </Col>
        <Col className='text-center'>
          <DefaultControlsStatus statusMessageGenerator={statusMessageGenerator} />
        </Col>
        <Col>
          <Pager />
        </Col>
      </Row>
    </Manifest>
  )
}

StandardManifest.propTypes = {
  fetchCount: PropTypes.func.isRequired,
  fetchRows: PropTypes.func.isRequired,
  definition: PropTypes.object.isRequired,
  pageSizes: PropTypes.arrayOf(PropTypes.number),
  pageSizeLableGenerator: PropTypes.func,
  statusMessageGenerator: PropTypes.func,
  trPropsHandler: PropTypes.func,
  tdPropsHandler: PropTypes.func,
  Filter: PropTypes.func
}

export default StandardManifest
