import api from './api'

export const settingsService = {
  get: async () => (await api.get('/settings')).data,
  update: async (payload) => (await api.patch('/settings', payload)).data
}
export default settingsService
