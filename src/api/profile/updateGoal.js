import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'
import { tokenStorage } from '../login/tokenStorage'

// 목표 점수 설정
export async function updateGoal(goalScore) {
  try {
    const accessToken = tokenStorage.getAccess()

    const res = await client.patch(
      '/profile/goal',
      { goalScore },
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
