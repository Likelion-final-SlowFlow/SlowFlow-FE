import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'
import { tokenStorage } from '../login/tokenStorage'

export async function getDashboard() {
  try {
    const accessToken = tokenStorage.getAccess()
    const res = await client.get('/home/dashboard', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
