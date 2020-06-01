import { useManifest } from 'use-manifest'

export const MODE_HIDDEN = 0
export const MODE_LOADING = 1
export const MODE_NO_RESULTS = 2
export const MODE_ERROR = 3

const useNoRowsMessage = () => {
  const state = useManifest()
  const { count, loadingCount, rows, loadingRows, error } = state
  if (rows.length) return MODE_HIDDEN
  if (loadingCount || loadingRows) return MODE_LOADING
  if (error) return MODE_ERROR
  return count ? MODE_HIDDEN : MODE_NO_RESULTS
}

export default useNoRowsMessage
