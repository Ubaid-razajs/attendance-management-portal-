import axios from 'axios'

const TOKEN_KEY = 'attendance_portal_token'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: { 'Content-Type': 'application/json' }
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem(TOKEN_KEY)
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem(TOKEN_KEY)
      localStorage.removeItem('attendance_portal_session')
    }
    return Promise.reject(error)
  }
)

export const getApiError = (error) => error?.response?.data?.message || error?.message || 'Something went wrong'
export { TOKEN_KEY }
export default api
