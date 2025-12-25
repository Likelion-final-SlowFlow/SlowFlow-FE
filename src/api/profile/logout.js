import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'
import { tokenStorage } from '../login/tokenStorage'

// 로그아웃
export async function logout() {
  try {
    const accessToken = tokenStorage.getAccess()

    const res = await client.post(
      '/auth/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )

    return res.data
  } catch (error) {
    throw handleApiError(error)
  }
}
