import { useManifest } from 'use-manifest'

export const MODE_HIDDEN = 0
export const MODE_LOADING = 1
export const MODE_NO_RESULTS = 2
export const MODE_ERROR = 3

const useNoRowsMessage = (): typeof MODE_HIDDEN | typeof MODE_LOADING | typeof MODE_NO_RESULTS | typeof MODE_ERROR => {
  const state = useManifest()
  const { count, loadingCount, rows, loadingRows, error } = state
  if (rows.length > 0) return MODE_HIDDEN
  if (loadingCount || loadingRows) return MODE_LOADING
  if (error != null && error !== '' && error !== 0) return MODE_ERROR
  return count == null || count > 0 ? MODE_HIDDEN : MODE_NO_RESULTS
}

export default useNoRowsMessage
