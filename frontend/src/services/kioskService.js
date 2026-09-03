import api from './api'

export const kioskService = {
  scan: async (studentId, status = 'present') => (await api.post('/kiosk/scan', { studentId, status })).data
}
export default kioskService
