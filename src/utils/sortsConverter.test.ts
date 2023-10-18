import { fromUrl, toUrl } from './sortsConverter'

describe('sortsConverter', () => {
  describe('toUrl', () => {
    it('exists', () => {
      expect(toUrl).toBeTruthy()
    })
    it('handles empty inputs', () => {
      expect(toUrl()).toEqual([])
      expect(toUrl(undefined)).toEqual([])
      expect(toUrl([])).toEqual([])
    })
    it('works for ascending', () => {
      expect(toUrl([{ id: 'foo', direction: 'ASCENDING' }])).toEqual(['foo'])
      expect(toUrl([{ id: 'foo', direction: 'ASCENDING' }, { id: 'foo1', direction: 'ASCENDING' }])).toEqual(['foo', 'foo1'])
    })
    it('works for desending', () => {
      expect(toUrl([{ id: 'foo', direction: 'DESCENDING' }])).toEqual(['~foo'])
      expect(toUrl([{ id: 'foo', direction: 'DESCENDING' }, { id: 'foo1', direction: 'DESCENDING' }])).toEqual(['~foo', '~foo1'])
    })
    it('works for mixed sorting', () => {
      expect(toUrl([{ id: 'foo', direction: 'ASCENDING' }, { id: 'foo1', direction: 'DESCENDING' }])).toEqual(['foo', '~foo1'])
    })
  })
  describe('fromUrl', () => {
    it('fromUrl', () => {
      expect(fromUrl).toBeTruthy()
    })
    it('handles empty inputs', () => {
      expect(fromUrl()).toEqual([])
      expect(fromUrl(undefined)).toEqual([])
      expect(fromUrl([])).toEqual([])
    })
    it('works with a single string', () => {
      expect(fromUrl('foo')).toEqual([{ id: 'foo', direction: 'ASCENDING' }])
      expect(fromUrl('~foo')).toEqual([{ id: 'foo', direction: 'DESCENDING' }])
    })
    it('works for ascending', () => {
      expect(fromUrl(['foo'])).toEqual([{ id: 'foo', direction: 'ASCENDING' }])
      expect(fromUrl(['foo', 'foo1'])).toEqual([{ id: 'foo', direction: 'ASCENDING' }, { id: 'foo1', direction: 'ASCENDING' }])
    })
    it('works for desending', () => {
      expect(fromUrl(['~foo'])).toEqual([{ id: 'foo', direction: 'DESCENDING' }])
      expect(fromUrl(['~foo', '~foo1'])).toEqual([{ id: 'foo', direction: 'DESCENDING' }, { id: 'foo1', direction: 'DESCENDING' }])
    })
  })
})
