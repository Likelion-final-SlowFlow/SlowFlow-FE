import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'
import { tokenStorage } from '../login/tokenStorage'

export async function actions({ category, text }) {
  try {
    const accessToken = tokenStorage.getAccess()
    const res = await client.post(
      '/actions',
      { category: category, text: text },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    )
    console.log(res.data.data)
    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
