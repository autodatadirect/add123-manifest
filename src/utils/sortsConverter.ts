import { ASCENDING, DESCENDING } from 'use-manifest/dist/constants/sortDirections'
import { Sort } from 'use-manifest'

const mapSortToUrl = (sort: Sort): string[] => {
  if (sort.id === undefined) {
    return []
  }
  return [sort.direction === DESCENDING ? `~${sort.id}` : sort.id]
}

const mapSortToManifest = (sort: string): Sort => ({
  id: sort.replace(/^~/, ''),
  direction: sort.startsWith('~') ? DESCENDING : ASCENDING
})

export const toUrl = (manifestSorts?: Sort[]): string[] => (manifestSorts ?? []).flatMap(mapSortToUrl)

export const fromUrl = (urlSorts?: string | string[]): Sort[] => {
  if (typeof urlSorts === 'string') urlSorts = [urlSorts]
  return (urlSorts ?? []).map(mapSortToManifest)
}
