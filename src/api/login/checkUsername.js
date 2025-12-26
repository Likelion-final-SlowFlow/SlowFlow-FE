import client from '../shared/client'
import { handleApiError } from '../shared/handleApiError.js'

// 아이디 중복 확인
export async function checkUsername(username) {
  try {
    const res = await client.get('/auth/check-username', {
      params: { username },
    })
    return res.data.data === true // 사용 가능하면 true, 아니면 false 반환
  } catch (error) {
    throw handleApiError(error)
  }
}
