import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'

export async function getDailyreport({ date }) {
  try {
    const res = await client.get('/reports/daily', {
      params: {
        date: date,
      },
    })
    console.log(res.data.data)
    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
