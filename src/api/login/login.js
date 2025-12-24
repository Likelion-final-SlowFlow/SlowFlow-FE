import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError'
import { tokenStorage } from './tokenStorage'

export async function login({ username, password }) {
  try {
    const res = await client.post('/auth/login', { username, password })
    const tokens = res.data?.data // { accessToken, refreshToken }

    tokenStorage.setTokens(tokens) // 로그인 성공 저장
    return tokens
  } catch (error) {
    throw handleApiError(error)
  }
}
