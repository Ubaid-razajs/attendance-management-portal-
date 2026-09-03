import api from './api'

export const authService = {
  login: async (credentials) => (await api.post('/auth/login', credentials)).data,
  me: async () => (await api.get('/auth/me')).data,
  forgotPassword: async (email) => (await api.post('/auth/forgot-password', { email })).data,
  resetPassword: async (token, password) => (await api.post('/auth/reset-password', { token, password })).data
}

export default authService
