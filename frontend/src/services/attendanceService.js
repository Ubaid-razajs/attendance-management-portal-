import api from './api'

export const attendanceService = {
  list: async (params = {}) => (await api.get('/attendance', { params })).data,
  summary: async (params = {}) => (await api.get('/attendance/summary', { params })).data,
  mark: async (payload) => (await api.post('/attendance/mark', payload)).data,
  bulk: async (payload) => (await api.post('/attendance/bulk', payload)).data,
  studentHistory: async (studentId) => (await api.get(`/attendance/student/${studentId}`)).data,
  report: async (params = {}) => (await api.get('/reports/attendance', { params })).data,
  exportUrl: (params = {}) => {
    const query = new URLSearchParams(params).toString()
    return `${api.defaults.baseURL}/reports/attendance/export${query ? `?${query}` : ''}`
  }
}
export default attendanceService
