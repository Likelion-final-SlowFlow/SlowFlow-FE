import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'
import { tokenStorage } from '../login/tokenStorage'

export async function getBottomsheet() {
  try {
    const accessToken = tokenStorage.getAccess()
    const res = await client.get('/fill-actions/bottom-sheet', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    console.log(res.data.data)
    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}

export async function selectBottomsheet(id) {
  try {
    const accessToken = tokenStorage.getAccess()
    const res = await client.post(
      `/fill-actions/${id}/select`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    console.log(res.data.data)
    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
