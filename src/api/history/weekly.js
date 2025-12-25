import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'

// 주간 히스토리 조회
export async function getWeeklyHistory({ baseDate }) {
  try {
    const res = await client.get('/history/weekly', {
      params: {
        baseDate: baseDate,
      },
    })

    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
