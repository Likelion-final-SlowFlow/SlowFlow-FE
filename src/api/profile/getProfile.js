import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'
import { tokenStorage } from '../login/tokenStorage'

// 프로필 조회
export async function getProfile() {
  try {
    const res = await client.get('/profile')
    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
