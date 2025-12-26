import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'

export async function actions({ category, text }) {
  try {
    const res = await client.post('/actions', { category: category, text: text })
    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
