import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'
import { tokenStorage } from '../login/tokenStorage'

// 월간 히스토리 조회
export async function getMonthlyHistory({ baseDate }) {
  try {
    const accessToken = tokenStorage.getAccess()

    const res = await client.get('/history/monthly', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        baseDate: baseDate,
      },
    })

    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
