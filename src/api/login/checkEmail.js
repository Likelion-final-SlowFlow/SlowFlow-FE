import client from '../shared/client.js'
import { handleApiError } from '../shared/handleApiError.js'

export async function checkEmail(email) {
  try {
    const res = await client.get('/auth/check-email', {
      params: { email },
    })
    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
