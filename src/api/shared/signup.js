import client from './client'
import { handleApiError } from './handleApiError'

// 회원가입 API
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
