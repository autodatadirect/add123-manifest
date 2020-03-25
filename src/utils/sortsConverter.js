import { ASCENDING, DESCENDING } from 'use-manifest/dist/constants/sortDirections'

const mapSortToUrl = sort => sort.direction === DESCENDING ? '~' + sort.id : sort.id

const mapSortToManifest = sort => ({
  id: sort.replace(/^~/, ''),
  direction: sort.startsWith('~') ? DESCENDING : ASCENDING
})

export const toUrl = manifestSorts => (manifestSorts || []).map(mapSortToUrl)

export const fromUrl = urlSorts => {
  if (typeof urlSorts === 'string') return [mapSortToManifest(urlSorts)]
  return (urlSorts || []).map(mapSortToManifest)
}
