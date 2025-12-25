import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'

// 회원가입
export async function signup({ username, email, password }) {
  try {
    const res = await client.post('/auth/signup', {
      username,
      email,
      password,
    })

    return res.data.data
  } catch (error) {
    throw handleApiError(error)
  }
}
