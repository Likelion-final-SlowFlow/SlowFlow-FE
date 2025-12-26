import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'

export async function getBottomsheet() {
  try {
    const res = await client.get('/fill-actions/bottom-sheet', {})
    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function selectBottomsheet(id) {
  try {
    const res = await client.post(`/fill-actions/${id}/select`, {})
    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
