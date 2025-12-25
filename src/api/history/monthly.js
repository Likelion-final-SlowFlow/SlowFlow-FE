import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'

// 월간 히스토리 조회
export async function getMonthlyHistory({ baseDate }) {
  try {
    const res = await client.get('/history/monthly', {
      params: {
        baseDate: baseDate,
      },
    })

    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
