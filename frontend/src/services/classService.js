import api from './api'

export const classService = {
  list: async () => (await api.get('/classes')).data,
  get: async (id) => (await api.get(`/classes/${id}`)).data,
  create: async (payload) => (await api.post('/classes', payload)).data,
  update: async (id, payload) => (await api.patch(`/classes/${id}`, payload)).data,
  remove: async (id) => (await api.delete(`/classes/${id}`)).data
}
export default classService
