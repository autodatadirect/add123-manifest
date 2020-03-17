import isFunction from 'lodash/isFunction'

import createFilterQueryString from './createUrlParams'

const baseFilter = {
  page: 0,
  pageSize: 10,
  sorts: [{
    id: 'userName',
    isAsc: true
  }],
  active: true,
  limit: 10,
  offset: 0
}

describe('createFilterQueryString', () => {
  it('is a function', () => {
    expect(isFunction(createFilterQueryString)).toBeTruthy()
  })
  it('returns an empty string if filter is undefined', () => {
    expect(createFilterQueryString()).toEqual('')
  })
  it('returns an empty string if filter is null', () => {
    expect(createFilterQueryString(null)).toEqual('')
  })
  it('returns an empty string if filter is empty', () => {
    expect(createFilterQueryString({})).toEqual('')
  })
  it('returns a valid query string when passed a filter', () => {
    const queryString = 'active=true&limit=10&offset=0&page=0&pageSize=10&sorts_asc_0=true&sorts_id_0=userName'
    expect(createFilterQueryString(baseFilter)).toEqual(queryString)
  })
  it('handles multiple searches', () => {
    const filter = { ...baseFilter }
    filter.search = 'jon doe'
    const queryString = 'active=true&limit=10&offset=0&page=0&pageSize=10&search=jon%20doe&sorts_asc_0=true&sorts_id_0=userName'
    expect(createFilterQueryString(filter)).toEqual(queryString)
  })
  it('handles when filter does not have sorts', () => {
    const filter = { ...baseFilter }
    delete filter.sorts
    const queryString = 'active=true&limit=10&offset=0&page=0&pageSize=10'
    expect(createFilterQueryString(filter)).toEqual(queryString)
  })
})
