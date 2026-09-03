import api from './api'

export const reportService = {
  overview: async () => (await api.get('/reports/overview')).data,
  attendance: async (params = {}) => (await api.get('/reports/attendance', { params })).data,
  exportAttendance: async (params = {}) => (await api.get('/reports/attendance/export', { params, responseType: 'blob' })).data
}
export default reportService
