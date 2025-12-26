import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'
import { tokenStorage } from '../login/tokenStorage'

// 로그아웃
export async function logout() {
  try {
    const res = await client.post('/auth/logout')
    return res.data
  } catch (error) {
    throw handleApiError(error)
  }
}
