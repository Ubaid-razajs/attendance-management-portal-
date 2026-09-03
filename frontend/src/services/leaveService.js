import api from './api'

export const leaveService = {
  list: async (params = {}) => (await api.get('/leaves', { params })).data,
  get: async (id) => (await api.get(`/leaves/${id}`)).data,
  create: async (payload) => (await api.post('/leaves', payload)).data,
  updateStatus: async (id, payload) => (await api.patch(`/leaves/${id}/status`, payload)).data
}
export default leaveService
