import api from './api'

export const studentService = {
  list: async (params = {}) => (await api.get('/students', { params })).data,
  get: async (id) => (await api.get(`/students/${id}`)).data,
  create: async (payload) => (await api.post('/students', payload)).data,
  update: async (id, payload) => (await api.patch(`/students/${id}`, payload)).data,
  remove: async (id) => (await api.delete(`/students/${id}`)).data,
  restore: async (id) => (await api.post(`/students/${id}/restore`)).data,
  permanentDelete: async (id) => (await api.delete(`/students/${id}/permanent`)).data,
  idCard: async (id) => (await api.get(`/students/${id}/id-card`)).data
}
export default studentService
