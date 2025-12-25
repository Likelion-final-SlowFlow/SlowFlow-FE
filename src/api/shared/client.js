import axios from 'axios'
import { tokenStorage } from '../login/tokenStorage'

let isRefreshing = false
let refreshPromise = null

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

// 모든 요청 헤더에 Access Token 추가
client.interceptors.request.use(
  (config) => {
    const accessToken = tokenStorage.getAccess()
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 401 에러(토큰 만료) 처리
client.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    const status = error.response?.status

    // 401 에러가 아니거나, 이미 재시도했던 요청이면 에러 반환 (무한 루프 방지)
    if (status !== 401 || original._retry) {
      return Promise.reject(error)
    }

    original._retry = true

    const refresh = tokenStorage.getRefresh()
    if (!refresh) {
      tokenStorage.clear()
      return Promise.reject(error)
    }

    // 중복 요청 방지
    if (isRefreshing && refreshPromise) {
      await refreshPromise
      const newAccess = tokenStorage.getAccess()

      if (newAccess) {
        original.headers.Authorization = `Bearer ${newAccess}`
      }
      return client(original)
    }

    // 토큰 재발급
    isRefreshing = true
    refreshPromise = (async () => {
      try {
        const reissueRes = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/reissue`,
          null,
          {
            headers: { 'refresh-token': refresh },
          },
        )
        const { accessToken, refreshToken } = reissueRes.data?.data || {}

        // 새 토큰 저장
        tokenStorage.setTokens({ accessToken, refreshToken })
      } catch (e) {
        tokenStorage.clear()
        throw e
      }
    })()

    try {
      await refreshPromise

      const newAccess = tokenStorage.getAccess()

      if (newAccess) {
        original.headers.Authorization = `Bearer ${newAccess}`
      }

      return client(original)
    } catch (reissueErr) {
      // 재발급 실패 시 에러 반환
      return Promise.reject(reissueErr)
    } finally {
      // 상태 초기화
      isRefreshing = false
      refreshPromise = null
    }
  },
)

export default client
