import api from './api'

export const teacherService = {
  list: async () => (await api.get('/teachers')).data,
  get: async (id) => (await api.get(`/teachers/${id}`)).data,
  create: async (payload) => (await api.post('/teachers', payload)).data,
  update: async (id, payload) => (await api.patch(`/teachers/${id}`, payload)).data,
  remove: async (id) => (await api.delete(`/teachers/${id}`)).data
}
export default teacherService
