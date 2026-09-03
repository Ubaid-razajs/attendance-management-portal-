import { Router } from 'express'
import { protect, authorize } from '../middleware/auth.js'
import { listAttendance, markAttendance, bulkMarkAttendance, studentAttendance, summary } from '../controllers/attendanceController.js'

const router = Router()
router.use(protect)
router.get('/', listAttendance)
router.get('/summary', summary)
router.get('/student/:studentId', studentAttendance)
router.post('/mark', authorize('admin', 'teacher'), markAttendance)
router.post('/bulk', authorize('admin', 'teacher'), bulkMarkAttendance)
export default router
