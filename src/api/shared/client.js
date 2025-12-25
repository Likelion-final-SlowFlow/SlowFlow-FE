import axios from 'axios'
import { tokenStorage } from '../login/tokenStorage'

let isRefreshing = false
let refreshPromise = null

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

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

client.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    const status = error.response?.status

    if ((status !== 401 && status !== 403) || original._retry) {
      return Promise.reject(error)
    }

    original._retry = true

    const refresh = tokenStorage.getRefresh()
    if (!refresh) {
      tokenStorage.clear()
      return Promise.reject(error)
    }

    if (isRefreshing && refreshPromise) {
      await refreshPromise
      const newAccess = tokenStorage.getAccess()
      if (newAccess) {
        original.headers.Authorization = `Bearer ${newAccess}`
      }
      return client(original)
    }

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
      return Promise.reject(reissueErr)
    } finally {
      isRefreshing = false
      refreshPromise = null
    }
  },
)

export default client
