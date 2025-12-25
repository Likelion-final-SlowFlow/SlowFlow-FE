import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'
import { tokenStorage } from '../login/tokenStorage'

export async function getDailyreport({ date }) {
  console.log(date)
  try {
    const accessToken = tokenStorage.getAccess()
    const res = await client.get('/reports/daily', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
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
