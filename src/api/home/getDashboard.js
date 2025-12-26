import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'

export async function getDashboard() {
  try {
    const res = await client.get('/home/dashboard', {})
    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
