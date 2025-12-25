import axios from 'axios'
import { tokenStorage } from '../login/tokenStorage'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

client.interceptors.request.use((config) => {
  const access = tokenStorage.getAccess()
  if (access) config.headers['access-token'] = access
  return config
})

let isRefreshing = false
let refreshPromise = null

client.interceptors.response.use(
  (res) => res,
  async (error) => {
    const original = error.config
    const status = error.response?.status

    if (status !== 401 || original._retry) throw error
    original._retry = true

    const refresh = tokenStorage.getRefresh()
    if (!refresh) {
      tokenStorage.clear()
      throw error
    }

    if (isRefreshing && refreshPromise) {
      await refreshPromise
      const newAccess = tokenStorage.getAccess()
      if (newAccess) original.headers['access-token'] = newAccess
      return client(original)
    }

    isRefreshing = true
    refreshPromise = (async () => {
      const reissueRes = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/reissue`,
        null,
        { headers: { 'refresh-token': refresh } },
      )
      const { accessToken, refreshToken } = reissueRes.data?.data || {}
      tokenStorage.setTokens({ accessToken, refreshToken })
    })()

    try {
      await refreshPromise

      const newAccess = tokenStorage.getAccess()
      if (newAccess) original.headers['access-token'] = newAccess
      delete original.headers.Authorization

      return client(original)
    } catch (reissueErr) {
      tokenStorage.clear()
      throw reissueErr
    } finally {
      isRefreshing = false
      refreshPromise = null
    }
  },
)

export default client
