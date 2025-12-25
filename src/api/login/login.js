import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'
import { tokenStorage } from './tokenStorage'

// 로그인
export async function login({ username, password }) {
  try {
    const res = await client.post('/auth/login', { username, password })
    const tokens = res.data?.data

    tokenStorage.setTokens(tokens)
    return tokens
  } catch (error) {
    throw handleApiError(error)
  }
}
